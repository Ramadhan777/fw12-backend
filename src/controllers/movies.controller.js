const {
  selectAllMovies,
  selectMovie,
  selectMovieByNow,
  selectMovieByMonth,
  insertMovie,
  patchUser,
  deleteMovie,
  countAllMovies,
} = require("../models/movies.model");
const errorHandler = require("../helpers/errorHandler");
const filter = require("../helpers/filter.helper");

exports.readAllMovies = (req, res) => {
  const sortable = [
    "title",
    "releaseDate",
    "director",
    "duration",
    "createdAt",
    "updatedAt",
  ];

  filter(req.query, sortable, countAllMovies, res, (filter, pageInfo) => {
    selectAllMovies(filter, (err, result) => {
      if (err) {
        return errorHandler(err, res);
      }

      return res.status(200).json({
        success: true,
        message: "List of Movies",
        pageInfo,
        movies: result.rows,
      });
    });
  });
};

exports.readMovie = (req, res) => {
  selectMovie(req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      movie: data.rows,
    });
  });
};

exports.readMovieByNow = (req, res) => {
  const sortable = [
    "title",
    "releaseDate",
    "director",
    "duration",
    "createdAt",
    "updatedAt",
  ];

  req.query.page = parseInt(req.query.page) || 1;
  req.query.limit = parseInt(req.query.limit) || 5;
  req.query.search = req.query.search || "";
  req.query.sortBy =
    (sortable.includes(req.query.sortBy) && req.query.sortBy) || "id";
  req.query.sort = req.query.sort || "ASC";

  const filter = {
    limit: req.query.limit,
    offset: parseInt(req.query.page - 1) * req.query.limit,
    search: req.query.search,
    sort: req.query.sort,
    sortBy: req.query.sortBy,
  };

  const pageInfo = {
    page: req.query.page,
  };

  selectMovieByNow(filter, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie not found",
      });
    }

    pageInfo.totalData = parseInt(data.rows.length);
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / filter.limit);
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1 : null;
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1 : null;

    return res.status(200).json({
      success: true,
      pageInfo,
      movies: data.rows,
    });
  });
};

exports.readMovieByMonth = (req, res) => {
  const sortable = [
    "title",
    "releaseDate",
    "director",
    "duration",
    "createdAt",
    "updatedAt",
  ];

  req.query.page = parseInt(req.query.page) || 1;
  req.query.limit = parseInt(req.query.limit) || 5;
  req.query.search = req.query.search || "";
  req.query.sortBy =
    (sortable.includes(req.query.sortBy) && req.query.sortBy) || "title";
  req.query.sort = req.query.sort || "ASC";

  const filter = {
    limit: req.query.limit,
    offset: parseInt(req.query.page - 1) * req.query.limit,
    search: req.query.search,
    sort: req.query.sort,
    sortBy: req.query.sortBy,
  };

  const pageInfo = {
    page: req.query.page,
  };

  selectMovieByMonth(filter, req.query, (err, result) => {
    if (err) {
      return errorHandler(err, res);
    }

    pageInfo.totalData = parseInt(result.rows.length);
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / filter.limit);
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1 : null;
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1 : null;

    return res.status(200).json({
      success: true,
      message: "List of Movies",
      pageInfo,
      casts: result.rows,
    });
  });
};

exports.createMovie = (req, res) => {
  insertMovie(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    return res.status(200).json({
      success: true,
      message: "Movie Created",
      movie: data.rows[0],
    });
  });
};

exports.updateMovie = (req, res) => {
  patchUser(req.body, req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie Updated",
      movie: data.rows,
    });
  });
};

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    if (data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie doesn't exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie Deleted",
      movie: data.rows,
    });
  });
};
