import BlogsLayout from "./BlogsLayout";
import RecentBlogsLayout from "./RecentBlogsLayout";

function Blogs() {
  return (
    <div className="flex flex-col lg:flex-row max-w-[1280px] mx-auto mt-40 gap-5 p-5">
      <BlogsLayout />
      <RecentBlogsLayout />
    </div>
  );
}

export default Blogs;
