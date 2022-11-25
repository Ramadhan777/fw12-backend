const errorHandler = (err, res) => {
  if(err) {
    console.log(err)

    if(err.message.includes('unique constraint "email"')){
      return res.status(400).json({
        success: false,
        message: "Email already used"
      })
    }

    if(err.message.includes('unique constraint "title"')){
      return res.status(400).json({
        success: false,
        message: "Title already exist"
      })
    }

    if(err.message.includes('unique constraint "name"')){
      return res.status(400).json({
        success: false,
        message: "Genre already exist"
      })
    }

    if(err.message.includes('unique constraint "castsName"')){
      return res.status(400).json({
        success: false,
        message: "Cast Name already exist"
      })
    }

    if(err.message.includes('unique constraint "cinemaName"')){
      return res.status(400).json({
        success: false,
        message: "Cinema Name already exist"
      })
    }

    if(err.message.includes('violates foreign key')){
      if(err.message.includes('fk_genreId')){
        return res.status(400).json({
          success: false,
          message: "Genre doesn't exist"
        })
      }
      if(err.message.includes('fk_movieId')){
        return res.status(400).json({
          success: false,
          message: "Movie doesn't exist"
        })
      }
      if(err.message.includes('fk_castId')){
        return res.status(400).json({
          success: false,
          message: "Cast doesn't exist"
        })
      }
      if(err.message.includes('insert or update on table "movieSchedulesTimes"')){
        return res.status(400).json({
          success: false,
          message: "Can't Update movieScheduleId"
        })
      }
    }

    if(err.message.includes('date/time field value out of range')){
      return res.status(400).json({
        success: false,
        message: "The Time value out of range"
      })
    }

    return res.status(500).json({
      success: false,
      message: "Something happened on our backend"
    })
  }
}

module.exports = errorHandler;
