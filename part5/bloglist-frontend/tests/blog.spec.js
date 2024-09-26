const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, helperBlogs, addLikesToBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
          data: {
            name: 'Maurice Skinner',
            username: 'roots',
            password: 'password'
          }
        })
   
        await page.goto('/')
    })
    test('Login form is shown', async ({ page }) => {
         await page.getByText('Log in to application').isVisible()
         await page.isVisible('username')
         await page.isVisible('password')
      
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'roots', 'password')
            await expect(page.getByText('Maurice Skinner logged in')).toBeVisible()

          // ...
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'roots', 'passwords')
            await expect(page.getByText('Maurice Skinner logged in')).not.toBeVisible()
          // ...
        })
      })

      describe('When logged in', () => {
        beforeEach(async ({ page }) => {
        await loginWith(page, 'roots', 'password')

        })
      
        test('a new blog can be created', async ({ page }) => {
       
          await createBlog(page, helperBlogs[0])
          await expect(page.getByText('Lamey McLamerson')).toBeVisible()

        })
        test('a blog can be liked', async ({ page }) => {
            await createBlog(page, helperBlogs[0])
            await page.getByRole('button', { name: 'view'}).click()
            await page.getByRole('button', { name: 'like'}).click()
            await expect(page.getByText('1')).toBeVisible()
  
          })
       
      })

      describe('Only user who made blog can delete it', () => {
        beforeEach(async ({ page, request })=> {
            await request.post('/api/users', {
                data: {
                  name: 'Bad Bad Not good',
                  username: 'badUser',
                  password: 'password'
                }
              })
            await loginWith(page, 'roots', 'password')
            await createBlog(page, helperBlogs[0])
            await createBlog(page, helperBlogs[1])
            await createBlog(page, helperBlogs[2])
            await createBlog(page, helperBlogs[3])
            
        })

        test('A user can delete its blog', async ({ page }) => {
            const blogToBeDeleted = await page.getByText('Lamey McLamerson')
            await expect(blogToBeDeleted).toBeVisible()
          

            page.on('dialog', async dialog => {
                console.log(dialog.message());  
                await dialog.accept();    
              })

            await blogToBeDeleted.getByRole('button', { name: 'remove' }).click()

  
            
            await expect(blogToBeDeleted).not.toBeVisible(); 
        })

        test('A different signed in user can not delete blog', async ({ page }) => {

            const blogToBeDeleted = await page.getByText('Lamey McLamerson')
            await expect(blogToBeDeleted).toBeVisible()
          

            page.on('dialog', async dialog => {
                console.log(dialog.message());  
                await dialog.accept();    
              })

            await blogToBeDeleted.getByRole('button', { name: 'remove' }).click()
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'badUser', 'password')

            const notSeenBlog = await page.getByText('Smartes person')
            await expect(notSeenBlog).not.toBeVisible()

        })

        test('The blogs are arranged by which has the most likes', async ({ page }) => {

            await addLikesToBlog(page, helperBlogs[0].author)
            await addLikesToBlog(page, helperBlogs[0].author)
            await addLikesToBlog(page, helperBlogs[0].author)
            await addLikesToBlog(page, helperBlogs[1].author)
            await addLikesToBlog(page, helperBlogs[2].author)
            await addLikesToBlog(page, helperBlogs[2].author)
            await addLikesToBlog(page, helperBlogs[3].author)
            await addLikesToBlog(page, helperBlogs[3].author)
            await addLikesToBlog(page, helperBlogs[3].author)
            await addLikesToBlog(page, helperBlogs[3].author)
            await page.waitForTimeout(2000)



            const mostLikedBlog = await page.getByText(helperBlogs[3].title)
             await mostLikedBlog.getByRole('button', { name: 'view' }).click()
             await expect(page.getByText('4')).toBeVisible()
        

        })
      })
  })