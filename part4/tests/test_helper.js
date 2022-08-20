const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'Mojojojo',
        name: 'Michael Smith',
        password: 'health'

    },
    {
        username: 'powerpuffgirl',
        name: 'Mr. Grieves',
        password: 'health'
    }
]


const initialBlogs = [
    {
    title: 'From the nightophere',
    author: 'Your moms',
    url: 'www.bigbutts.com',
    likes: 8,
   
    },

    {
        title: 'The ehtical slut',
        author: 'Your dad',
        url: 'www.bigggerbutts.com',
        likes: 99,
    }


]

const blogsInDB = async () => {

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {

    const users = await User.find({})

    console.log(users)
    return users.map(user => user.toJSON())
}


module.exports = {

    initialBlogs, blogsInDB, usersInDB

}