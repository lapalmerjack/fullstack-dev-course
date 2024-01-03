const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helperfiles/test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


describe('all getter tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)


    }, 100000)

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })


})


test('id is defined', async () => {
    const response = await api.get('/api/blogs')

    const checkIfIdIsThere = response.body[0]

    expect(checkIfIdIsThere.id).toBeDefined()

})

describe('posting tests', () => {
    let loggedInUser
    let token
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
        const userNameAndPassword = {
            username: 'root',
            password: 'secret'
        }

        loggedInUser = await api
            .post('/api/login')
            .send(userNameAndPassword)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        token = `bearer ${loggedInUser.body.token}`


    })

    test('400 when new Blog does not include url', async () => {
        const userinDB = await helper.usersInDb()

        const newBlog = {
            title: 'The Bolton guy',
            author: 'Max Bolton',

        }

        const result = await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(400)
        console.log('made it here ', result.status)
    }, 100000)

    test('new blog is found and array increased', async () => {
        const newBlog = {
            title: 'The Bolton guy',
            author: 'Max Bolton',
            url: 'www.bolts.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogAdded = await helper.blogsInDb()

        expect(blogAdded).toHaveLength(helper.initialBlogs.length + 1)
        expect(blogAdded[blogAdded.length-1].likes).toBe(0)
    })

})

describe('tests for deleting blogs', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        console.log('doing this first')

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', user: 'Michael Doug', passwordHash })

        await user.save()

        const passwordHash2 = await bcrypt.hash('health', 10)
        const user2 = new User({ username: 'momojojo', user: 'Terry Allen', passwordHash: passwordHash2 })

        await user2.save()

        const usersInDB = await helper.usersInDb()

        console.log(usersInDB[0], 'ma usee')

        const blog = new Blog({  title: 'From the nightophere',
            author: 'Your mos',
            url: 'www.bigbutts.com',
            likes: 8, user: usersInDB[0].id })

        await blog.save()
    })

    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeDeleted = blogsAtStart[0]

        const usernameAndPassword = {
            username: 'root',
            password: 'sekret',
        }

        const user = await api
            .post('/api/login')
            .send(usernameAndPassword)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        console.log('made it here')

        const token = `bearer ${user.body.token}`

        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .set('Authorization', token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const titles = blogsAtEnd.map(t => t.title)

        expect(titles).not.toContain(blogToBeDeleted.title)
    })

    test('wrong user can not delete blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToBeDeleted = blogsAtStart[0]

        const usernameAndPassword = {
            username: 'momojojo',
            password: 'health',
        }

        const user = await api
            .post('/api/login')
            .send(usernameAndPassword)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        console.log(user.body, 'here is the body')

        const token = `bearer ${user.body.token}`

        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .set('Authorization', token)
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()

        const titles = blogsAtEnd.map(t => t.title)

        expect(titles).toContain(blogToBeDeleted.title)
    })

})



test('update a blogs likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeUpdated = blogsAtStart[0]
    console.log(blogToBeUpdated)

    const updateBlog = { ...blogToBeUpdated, likes: blogToBeUpdated.likes + 1 }

    await api
        .put(`/api/blogs/${updateBlog.id}`)
        .expect(200)

})

describe('when there is an initial user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'momoChan', passwordHash })

        await user.save()
    })

    test('create a user works', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'momoskinner',
            name: 'Maurice Jack',
            password: 'password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)


    })
    test('creation fails if user already exists', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'momoChan',
            name: 'Maurice Jack',
            password: 'password'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        console.log(result.body)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)


    })
    test('username longer than 3', async () => {

        const newUser = {
            username: 'Mo',
            name: 'Max Slater',
            password: 'yoooo',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Path `username` (`Mo`) is shorter than the minimum allowed length (3)')

    }, 100000)

    test('password longer than 3', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Moooo',
            name: 'Max Slater',
            password: 'yo',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters')


    }, 100000)

})




afterAll(async () => {
    await mongoose.connection.close()
})