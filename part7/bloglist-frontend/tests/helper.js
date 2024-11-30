const { test, describe, expect, beforeEach } = require('@playwright/test')


const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

  const createBlog = async (page, blog) => {
    console.log(blog, 'is my blog')
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(blog.title)
    await page.getByTestId('author').fill(blog.author)
    await page.getByTestId('url').fill(blog.url)
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText('has been added').waitFor()
    await page.getByText(blog.author).waitFor()
  }



const addLikesToBlog = async (page, authorName) => {
   
    const myAuthorToBeLiked = await page.getByText(authorName)
    await expect(myAuthorToBeLiked).toBeVisible()
    await myAuthorToBeLiked.getByRole('button', { name: 'view'}).click()
  
    await page.getByRole('button', { name: 'like' }).click()


    await page.getByRole('button', { name: 'hide'}).click()

}

  const helperBlogs = [
    {
      author: "Lamey McLamerson",
      title: "Coolest guy",
      url: "www.notthathawt.com",
      likes: 7
    },
    {
      author: "Smartest person",
      title: "Why We Love JavaScript",
      url: "www.jsisgreat.com",
      likes: 15
    },
    {
      author: "Tech Guru",
      title: "Future of AI",
      url: "www.aiinsights.com",
      likes: 42
    },
    {
      author: "Beginner Dev",
      title: "My First Year Coding",
      url: "www.firstyearcoding.com",
      likes: 3
    },
  ]
  

  export { loginWith, createBlog, helperBlogs, addLikesToBlog }