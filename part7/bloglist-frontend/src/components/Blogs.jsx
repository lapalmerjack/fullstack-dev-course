import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { updateLike, deleteBlog } from "../reducers/blogReducer";
import { useMemo } from "react";
import BlogForm from "../form-components/BlogForm";
import Notification from "./Notification";

const Blogs = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  console.log("MY BLOG");
  const sortedBlogs = useMemo(
    () => [...blogs].sort((a, b) => b.likes - a.likes),
    [blogs]
  );

  console.log("my blogs", blogs);

  const updateLikes = (id) => dispatch(updateLike(id));
  const deleteBlogs = (id) => dispatch(deleteBlog(id));

  return (
    <div>
      <Notification />
      <h1>Blog app</h1>
      <BlogForm />
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLike={() => updateLikes(blog.id)}
          deleteBlogs={() => deleteBlogs(blog.id)}
        />
      ))}
    </div>
  );
};

export default Blogs;
