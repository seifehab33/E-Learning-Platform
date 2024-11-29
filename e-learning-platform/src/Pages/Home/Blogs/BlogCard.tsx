import { motion } from "framer-motion";
import notfound from "../../../assets/not-found.png";
import { SlCalender } from "react-icons/sl";

interface BlogCardProps {
  id: string;
  img: string;
  name: string;
  type: string;
  date: string;
  isInView: boolean; // For animation
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  img,
  name,
  type,
  date,
  isInView,
}) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={isInView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 1.3 }}
      key={id}
      className="bg-[#2A2438] rounded-lg shadow-lg pb-5 text-white hover:bg-[#221c30] transition-transform duration-300 ease-in-out mt-10 hover:scale-105"
    >
      <div className="mb-4 overflow-hidden rounded-lg border border-gray-800 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl max-w-full">
        <img
          src={img}
          alt={type}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).onerror = null;
            e.currentTarget.src = notfound;
          }}
          className="w-full max-w-full rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>
      <div className="text-box text-center flex flex-col gap-5 text-[var(--text-color)] px-4">
        <p className="text-[15px] font-semibold">{name}</p>
        <p className="text-sm text-gray-400">{type}</p>
        <p className="flex items-center justify-center gap-3 text-gray-300">
          <span className="text-[var(--peach-color)]">
            <SlCalender size={20} />
          </span>
          <span>{date}</span>
        </p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
