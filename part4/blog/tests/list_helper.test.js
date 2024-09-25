const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('./helperfiles/blogs')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})


describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs)
        assert.deepStrictEqual(result, 36)
    })
})

describe('most liked blog', () => {
    test('This will give me the most popular blog', () => {
        const mostLikedBlog = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(mostLikedBlog, {
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0 })
    })

})

describe('author with most blogs', () => {
    test('Give the most popular author', () => {
        const mostBloggedAuthor = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(mostBloggedAuthor, {
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('author with most likes', () => {
    test('Give the most popular author', () => {
        const mostLikedAuthor = listHelper.mostLikedAuthor(blogs)
        assert.deepStrictEqual(mostLikedAuthor, {
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})