const {
  selectAllMovies,
  selectMovie,
  selectMovieByNow,
  selectMovieByMonth,
  insertMovie,
  patchMovie,
  deleteMovie,
  countAllMovies,
  selectAllMoviesByGenre,
  countAllMoviesByGenre,
  selectMovieByDateAndCIty,
} = require("../models/movies.model");
const errorHandler = require("../helpers/errorHandler");
const filter = require("../helpers/filter.helper");
const fs = require('fs')

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
        results: result.rows,
      });
    });
  });
};

exports.readAllMoviesByGenre = (req, res) => {
  const sortable = [
    "title",
    "releaseDate",
    "director",
    "duration",
    "genre",
    "createdAt",
    "updatedAt",
  ];

  req.query.page = parseInt(req.query.page) || 1;
  req.query.limit = parseInt(req.query.limit) || 8;
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

  selectAllMoviesByGenre(filter, (err, data) => {
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
      results: data.rows,
    });
  });
};

exports.readSchdeuleByDateAndCity = (req, res) => {
  selectMovieByDateAndCIty(req.query, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List schedules",
      results: data.rows
    })
  })
}

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
      results: data.rows[0],
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
  req.query.limit = parseInt(req.query.limit) || 8;
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
      results: data.rows,
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
      results: result.rows,
    });
  });
};

exports.createMovie = (req, res) => {
  if(req.file){
    req.body.picture = req.file.filename
  }

  insertMovie(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }

    return res.status(200).json({
      success: true,
      message: "Movie Created",
      results: data.rows[0],
    });
  });
};

exports.updateMovie = (req, res) => {
  selectMovie(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }
    if(data.rows.length){
      const [movie] = data.rows;
      if(movie.picture){
        fs.rm("uploads/movie/" + movie.picture, {force: true}, (err) => {
          if(err){
            return errorHandler(err, res)
          }
        })
      }
    }
  })

  if(req.file){
    req.body.picture = req.file.filename
  }

  patchMovie(req.body, req.params, (err, data) => {
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
      results: data.rows,
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
      results: data.rows,
    });
  });
};
