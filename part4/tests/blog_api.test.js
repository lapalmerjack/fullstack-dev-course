const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require("../models/blog")
const User = require("../models/user")
const { update } = require('../models/blog')



beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    console.log('done')
})






describe('test GET statements', () => {


    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    }, 100000)
    
    

})



test('id is defined', async () => {
    const response = await api.get('/api/blogs')

    

    const checkIfIdIsThere = response.body[0]

    expect(checkIfIdIsThere.id).toBeDefined()
})

describe('working with POST', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        console.log('doing this first')

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('list increases by one', async () => {

        const userInDB = await helper.usersInDB()

        const usernameAndPassword = {
            username: 'root',
            password: 'sekret',
        }
        

        const user = await api
                            .post('/api/login')
                            .send(usernameAndPassword)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

        
        const token = `bearer ${user.body.token}` 

       

        const newBlog = {
            title: 'this is a new blog',
            author: 'Maurice Evans Skinner Jr',
            url: 'www.ejisawesome.com',
            likes: 8,
        }
    
        await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const newList = await helper.blogsInDB()
    
        expect(newList).toHaveLength(helper.initialBlogs.length + 1)
    
        const title = newList.map(blog => blog.title)
        expect(title).toContain('this is a new blog')
    
    })

    test('likes of 0 is added if likes undefined', async () => {

        const usernameAndPassword = {
            username: 'root',
            password: 'sekret',
        }
        

        const user = await api
                            .post('/api/login')
                            .send(usernameAndPassword)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

        
        const token = `bearer ${user.body.token}` 


        const newBlog = {
            title: 'this is a new blog',
            author: 'Maurice Evans Skinner Jr',
            url: 'www.ejisawesome.com', 
              
        }
    
        await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const newList = await helper.blogsInDB()
    
        expect(newList[2].likes).toBe(0)
        
    })

    test('if url or title are missing', async () => {

        const usernameAndPassword = {
            username: 'root',
            password: 'sekret',
        }
        

        const user = await api
                            .post('/api/login')
                            .send(usernameAndPassword)
                            .expect(200)
                            .expect('Content-Type', /application\/json/)

        
        const token = `bearer ${user.body.token}` 

        const newBlog = {
            author: 'Maurice Evans Skinner Jr',
            url: 'www.ejisawesome.com', 
              
        }
    
        await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(400)
    
        const newBlogAgain = {
            title: 'this is a new blog',
            author: 'Maurice Evans Skinner Jr',
              
        }
    
        await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(400)
    
    })

})

describe('tests for deleting blogs', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})

        console.log('doing this first')

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', user: 'Michael Doug', passwordHash})

        await user.save()

        const passwordHash2 = await bcrypt.hash('health', 10)
        const user2 = new User({ username: 'momojojo', user: 'Terry Allen', passwordHash2})

        await user2.save()

        const usersInDB = await helper.usersInDB()

        console.log(usersInDB[0].id)

        const blog = new Blog({  title: 'From the nightophere',
        author: 'Your mos',
        url: 'www.bigbutts.com',
        likes: 8, user: usersInDB[0].id})

        await blog.save()
    })
    test('blog is deleted from database', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const blogToBeDeleted = blogsAtStart[0]

       console.log(blogToBeDeleted, 'to be deleted')

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

        const blogsAtEnd = await helper.blogsInDB()

        const titles = blogsAtEnd.map(t => t.title)

        expect(titles).not.toContain(blogToBeDeleted.title)
    })

 
    
})

describe('updating the likes', () => {
test('update it bro', async () => {

    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    console.log('done')
   
        const logs = await helper.blogsInDB()
        const updateBlog = logs[0]

        console.log(updateBlog)
       
        
        await api
        .put(`/api/blogs/${updateBlog.id}`)
        .send(updateBlog)
        .expect(201)
    
        const newBlogs = await helper.blogsInDB()

        console.log(newBlogs)
        
        expect(newBlogs[0].likes).toBe(9)
        expect(newBlogs[1].likes).toBe(99)
})

}) 

describe('start with one users in database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        console.log('doing this first')

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('adding username fails with shit password', async () => {

        const usersAtStart = await helper.usersInDB()


        const newUser = {
            username: 'mako330',
            user: 'Maurice Skinner',
            password: 'hi',
        }

       const result = await api
             .post('/api/users')
             .send(newUser)
             .expect(400)
             .expect('Content-Type', /application\/json/)


             expect(result.body.error).toContain('password must be at least 3 characters')

             const currentUsers = await helper.usersInDB()

             expect(currentUsers).toEqual(usersAtStart)
    })

    test('test fails when adding existing user', async () => {
        

        const usersAtStart = await helper.usersInDB()

        const newUser = {
            username: 'root',
            user: 'Michael Douglas',
            password: 'bigbubblebutts',

        }

            const result = await api
                    .post('/api/users')
                    .send(newUser)
                    .expect(400)
                    .expect('Content-Type', /application\/json/)

                    expect(result.body.error).toContain('username must be unique')

                    const currentUsers = await helper.usersInDB()

                    expect(currentUsers).toEqual(usersAtStart)  
    })
})




afterAll(() => {
    mongoose.connection.close()
}) 







