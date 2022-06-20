var _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, next) => (prev.likes > next.likes) ? prev : next)
}

const mostBlogs = (blogs) => {
  const byAuthors = _.groupBy(blogs, (blog) => blog.author)
  const mostBlogs = _.reduce(byAuthors, (author, nextAuthor) => {
    return (author.length > nextAuthor.length) ? author : nextAuthor
  })
  return {
    author: _.first(mostBlogs).author,
    blogs: _.size(mostBlogs)
  }
}

const mostLikes = (blogs) => {
  const byAuthors = _.groupBy(blogs, (blog) => blog.author)
  let byLikes = []
  _.forEach(byAuthors, (blogs, author) => {
    byLikes.push({
      author: author,
      likes: _.sumBy(blogs, (blog) => blog.likes)
    })
  })
  return _.last(_.sortBy(byLikes, (a) => a.likes))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
