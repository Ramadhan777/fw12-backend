const errorHandler = require("../helpers/errorHandler");
const {
  selectAllMovieCasts,
  selectMovieCast,
  insertMovieCast,
  patchMovieCast,
  deleteMovieCast,
} = require("../models/movieCasts.model");

exports.readAllMovieCasts = (req, res) => {
  selectAllMovieCasts((err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    return res.status(200).json({
      success: true,
      results: data.rows,
    });
  });
};

exports.readMovieCast = (req, res) => {
  selectMovieCast(req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie Cast not found",
      });
    }

    return res.status(200).json({
      success: true,
      results: data.rows[0],
    });
  });
};

exports.createMovieCast = (req, res) => {
  insertMovieCast(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    return res.status(200).json({
      success: true,
      message: "Movie Cast created successfully",
      results: data.rows[0],
    });
  });
};

exports.updateMovieCast = (req, res) => {
  patchMovieCast(req.body, req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie Cast doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie Cast Updated",
      results: data.rows,
    });
  });
};

exports.deleteMovieCast = (req, res) => {
  deleteMovieCast(req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie Cast doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie Cast Deleted",
      results: data.rows,
    });
  });
};
