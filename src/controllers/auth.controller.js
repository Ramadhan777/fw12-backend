const {
  selectUserByEmail,
  insertUser,
  patchUser,
} = require("../models/users.model");
const {
  insertResetPassword,
  selectResetPasswordByEmailAndCode,
  deleteResetPassword,
} = require("../models/resetPassword.model");
const jwt = require("jsonwebtoken");
const errorHandler = require("../helpers/errorHandler");
const argon = require("argon2");
const transporter = require("../helpers/nodemailer.helper");

exports.login = (req, res) => {
  selectUserByEmail(req.body, async (error, { rows }) => {
    if (rows.length) {
      const [user] = rows;
      if (await argon.verify(user.password, req.body.password)) {
        const token = jwt.sign({ id: user.id }, "backend-secret");
        return res.status(200).json({
          success: true,
          message: "login success",
          results: {
            token,
            role: user.role,
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Wrong Email or Password",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong Email or Password",
      });
    }
  });
};

exports.register = async (req, res) => {
  try {
    req.body.password = await argon.hash(req.body.password)
    insertUser(req.body, (error, data) => {
      if (error) {
        return errorHandler(error, res);
      }
      const { rows: users } = data;
      const [user] = users;
      const token = jwt.sign({ id: user.id }, "backend-secret");

      return res.status(200).json({
        success: true,
        message: "User created successfully",
        results: {
          token,
          role: user.role,
        },
      });
    });
  } catch (err) {
    return errorHandler(err, res);
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  selectUserByEmail(req.body, (err, { rows: users }) => {
    if (err) {
      return errorHandler(err, res);
    }
    if (users.length) {
      const [user] = users;
      const code = Math.ceil(Math.random() * 90000 + 10000);
      const data = {
        email,
        userId: user.id,
        code,
      };

      insertResetPassword(data, (err, { rows: results }) => {
        const sendCode = {
          from: "tikufazz@gmail.com",
          to: email,
          subject: "Code Reset Password",
          html: `<p>Your reset password code ${code}</p>`,
        };

        transporter.sendMail(sendCode, (err) => {
          if (err) {
            return errorHandler(err, res);
          }

          return res.status(200).json({
            success: true,
            message: "Reset password has been requested",
          });
        });

        // if(results.length){
        //   return res.status(200).json({
        //     success: true,
        //     message: "Reset password has been requested",
        //     results: results[0]
        //   })
        // }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Request Failed, email invalid",
      });
    }
  });
};

exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    selectResetPasswordByEmailAndCode(
      req.body,
      async (err, { rows: users }) => {
        if (err) {
          return errorHandler(err, res);
        }

        if (users.length) {
          const [request] = users;
          const data = {
            password: await argon.hash(password),
          };

          if (
            new Date().getTime() - new Date(request.createdAt).getTime() >
            1000 * 60 * 15
          ) {
            return res.status(400).json({
              success: false,
              message: "Code expired",
            });
          }

          patchUser(data, request.userId, (err, { rows: users }) => {
            if (err) {
              return errorHandler(err, res);
            }

            if (users.length) {
              deleteResetPassword(request.id, (err, { rows }) => {
                if (rows.length) {
                  return res.status(200).json({
                    success: true,
                    message: "Password updated, please relogin",
                  });
                }
              });
            }
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Reset password failed, request Invalid",
          });
        }
      }
    );
  } else {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password not match",
    });
  }
};
