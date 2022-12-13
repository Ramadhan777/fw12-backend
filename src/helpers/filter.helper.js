const filter = (data, sortable, countAllData, res, cb) => {
  data.page = parseInt(data.page) || 1
  data.limit = parseInt(data.limit) || 8
  data.search = data.search || ''
  data.sortBy = (sortable.includes(data.sortBy) && data.sortBy) || 'createdAt'
  data.sort = data.sort || 'ASC'

  const params = {
    limit: data.limit,
    offset: (parseInt(data.page - 1)) * data.limit,
    search: data.search,
    sort: data.sort,
    sortBy: data.sortBy
  }

  const pageInfo = {
    page: data.page,
  }

  countAllData(params, (err, result) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(result.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / data.limit)
    pageInfo.nextPage = data.page < pageInfo.totalPage ? data.page + 1: null
    pageInfo.prevPage = data.page > 1 ? data.page - 1: null
    cb(params, pageInfo)
  }
  )
}

module.exports = filter