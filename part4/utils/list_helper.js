const dummy = (blogs) => {

    let addValue = blogs.concat(1)

    return addValue[0]

}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)

   
   
}

const favoriteBlog = (blogs) => {
    console.log(blogs[2])
  let maxedValue =  Math.max(...blogs.map(mostLikes => mostLikes.likes))

  console.log(maxedValue)

  let blogObject = blogs.find(obj => obj.likes === maxedValue)

  console.log(blogObject)

  

  return blogObject



}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}