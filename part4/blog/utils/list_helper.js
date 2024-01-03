const lodash = require('lodash')

const dummy = (blogs) => {

    return 1
}

const totalLikes = (blogs) => blogs
    .reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((mostLiked, currentBlog) => (
    currentBlog.likes > mostLiked.likes ? currentBlog : mostLiked
), blogs[0])

const mostBlogs = (blogs) => {

    const authorAndBlogCount = lodash.countBy(blogs, 'author')
    const result = lodash.map(authorAndBlogCount, (blogs, author) => ({ author, blogs }))
    const maxBlogs = lodash.maxBy(result, 'blogs')

    return maxBlogs

}

const mostLikedAuthor = (blogs) => {
    const groupByNames = lodash(blogs)
        .groupBy('author')
        .map((author, name) => ({
            author: name,
            likes: lodash.sumBy(author, 'likes')
        })).value()

    return lodash.maxBy(groupByNames, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostLikedAuthor,
    mostBlogs
}