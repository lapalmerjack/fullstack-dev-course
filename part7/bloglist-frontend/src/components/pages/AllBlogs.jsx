import { updateLike, deleteBlog } from "../../reducers/blogReducer";
import BlogForm from "../../form-components/BlogForm";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
import OneBlog from "./OneBlog";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const AllBlogs = () => {
    const dispatch = useDispatch();

    const blogs = useSelector((state) => state.blogs);
    console.log('MY BLOGS BRO', blogs)

 
 
      const updateLikes = (id) => dispatch(updateLike(id));
      const deleteBlogs = (id) => dispatch(deleteBlog(id));

      const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    

      return (
        <div>
          <Notification />
          <h1>Blog app</h1>
          <BlogForm />
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="blog" style={blogStyle}>
                <Link to={`/blogs/${blog.id}`}> {blog.title}</Link>
              </div>
            ))
          ) : (
            <p>No blogs available</p>
          )}
        </div>
      );
    };





export default AllBlogs