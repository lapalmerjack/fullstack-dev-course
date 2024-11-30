export const getUsers = (blogger) =>
  Object.values(
    blogger.reduce((acc, blog) => {
      const userName = blog.user.name;
      const userId = blog.user.id;
      acc[userName] = acc[userName] || { name: userName, id: userId, count: 0 };
      acc[userName].count += 1;
      return acc;
    }, {})
  );

export const getUserBlogs = (blogs, userId) => {
  console.log(blogs, "in the main frame");

  const userName = blogs.find((blog) => blog.user.id === userId)?.blog.user
    .name;
  console.log("MY USERNAME", userName);

  user = {
    name: userName,
    blogs: userBlogs,
  };

  return user;
};
