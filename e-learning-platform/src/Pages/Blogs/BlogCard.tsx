import { SlCalender } from "react-icons/sl";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../Home/FeaturedCourses/FeaturedCourses";
import useBlogs from "./useBlogs";
import { FaTag } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion

function BlogCard() {
  const { blogsNews, isLoading, isError } = useBlogs();

  if (isLoading) {
    return <LoadingWrapper />;
  }

  if (isError) {
    return <ErrorWrapper />;
  }

  return (
    <div className="blog-card">
      {blogsNews.map((blog) => (
        <motion.div
          key={blog.id} // Ensure each item has a unique key
          className="mb-10 text-[var(--text-color)] max-w-7xl"
          initial={{ opacity: 0 }} // Initial opacity
          animate={{ opacity: 1 }} // Final opacity
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <div className="relative overflow-hidden rounded-md ">
            <img
              src={blog.img_blog}
              alt={blog.name_blog}
              className="w-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
          </div>
          <div className="blog-info mt-3 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <img
                src={blog.admin_img}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <p>{blog.admin_name}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <SlCalender className="text-[#f6853d]" /> <p>{blog.date_blog}</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaTag className="text-[#f45061]" />
              <p>{blog.tag_blog}</p>
            </div>
          </div>
          <h1 className="my-3 text-3xl font-bold hover:text-[var(--peach-color)] transition-colors ease-in cursor-pointer">
            {blog.name_blog}
          </h1>
          <p className="font-thin text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
            magnam in, maxime distinctio, nam numquam quasi sed impedit dicta
            illo ullam fuga rerum aspernatur vel eos suscipit delectus
            consectetur! Facilis?
          </p>
          <div className="read-more mt-4">
            <button className="border border-solid border-[#ff875a] px-4 py-2 rounded-md hover:bg-[#ff875a] hover:text-white duration-150 transition-colors ease-in">
              Read More
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default BlogCard;
