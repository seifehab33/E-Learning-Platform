import { SlCalender } from "react-icons/sl";
import {
  ErrorWrapper,
  LoadingWrapper,
} from "../Home/FeaturedCourses/FeaturedCourses";
import useRecentBlogs from "./useRecentBlogs";

const tags = [
  { id: 1, tag_tx: "HTML" },
  { id: 2, tag_tx: "Java Script" },
  { id: 3, tag_tx: "CSS" },
  { id: 4, tag_tx: "Jquery" },
  { id: 5, tag_tx: "Java" },
  { id: 6, tag_tx: "React" },
];

function RecentBlogs() {
  const { recentBlogs, isLoading, isError } = useRecentBlogs();

  if (isLoading) {
    return <LoadingWrapper />;
  }
  if (isError) {
    return <ErrorWrapper />;
  }

  return (
    <section className="flex flex-col gap-4">
      {" "}
      {/* Added flex and flex-col */}
      <div className="recent-card w-full  rounded-md shadow-md">
        <div className="bg-[var(--nav-color)] h-auto p-4 rounded-lg shadow-md shadow-gray-900 text-[var(--text-color)]">
          <h1 className="text-xl font-semibold mb-4">Recent Blogs</h1>
          {recentBlogs.map((recentblog, index) => (
            <div key={index} className="flex gap-4 mb-4 h-auto">
              <div className="overflow-hidden rounded-md w-1/3">
                <img
                  src={recentblog.img_blog}
                  alt={recentblog.desc_blog}
                  className="w-full h-20 object-cover transition-transform duration-500 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="flex flex-col justify-between w-2/3">
                <p className="text-sm text-gray-700 hover:text-[var(--peach-color)] transition-colors ease-in cursor-pointer">
                  {recentblog.desc_blog}
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <SlCalender className="text-[#f6853d]" />{" "}
                  {recentblog.date_blog}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="bg-[var(--nav-color)] h-auto p-4 rounded-lg shadow-md shadow-gray-900 text-[var(--text-color)]">
          <h1 className="text-lg font-semibold mb-4">Latest Tags</h1>
          <div className="grid grid-cols-3 gap-2">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="border border-solid border-[var(--text-color)] rounded-md px-3 py-1 text-center text-sm max-w-full whitespace-nowrap transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              >
                {tag.tag_tx}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecentBlogs;
