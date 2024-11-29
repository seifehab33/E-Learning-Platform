import React, { useState } from "react";
import { FaRegStar, FaStar, FaBook, FaClock, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

interface Instructor {
  id: string;
  name_inst: string;
  img_inst: string;
  job: string;
  lesson: string;
  hours: string;
  rate: string;
  courses: string[];
}

const InstructorCard: React.FC<{
  instructor: Instructor;
  isGrid: boolean;
  onSelect: () => void;
  selected: boolean;
}> = React.memo(({ instructor, isGrid, onSelect }) => {
  const rate = parseFloat(instructor.rate);
  const filledStars = Math.floor(rate);
  const unfilledStars = 5 - filledStars;
  const [liked, setLiked] = useState(false);

  const handleToggle = () => setLiked((prevLiked) => !prevLiked);

  return (
    <motion.div
      className={`bg-[var(--nav-color)] text-[var(--text-color)] rounded-lg p-4 shadow-md flex-col items-start flex ${
        isGrid ? "flex-col" : "lg:flex-row"
      } gap-5 relative`}
      onClick={onSelect}
      initial={{ x: "-100%", opacity: 0 }} // Start from the left
      animate={{ x: 0, opacity: 1 }} // Move to normal position
      exit={{ x: "-100%", opacity: 0 }} // Exit to the left
      transition={{ duration: 1.2 }} // Transition duration
    >
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleToggle}
      >
        <FaHeart className={liked ? "text-red-500" : "text-white"} />
      </div>
      <img
        src={instructor.img_inst}
        alt={instructor.name_inst}
        className={`mt-3 object-cover rounded-lg ${
          isGrid ? "w-full lg:w-full lg:h-52" : "lg:h-40 w-40 mt-0"
        }`}
      />
      <div className={`${isGrid ? "" : "text-left"} flex-1`}>
        <h3 className="text-lg font-bold">{instructor.name_inst}</h3>
        <p className="text-sm">{instructor.job}</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm">
            <FaBook className="text-[var(--peach-color)]" />
            {instructor.lesson}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <FaClock className="text-[var(--peach-color)]" />
            {instructor.hours}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex">
            {[...Array(filledStars)].map((_, index) => (
              <FaStar key={index} className="text-yellow-500" />
            ))}
            {[...Array(unfilledStars)].map((_, index) => (
              <FaRegStar key={index} className="text-gray-400" />
            ))}
          </div>
          <span className="text-sm">{rate.toFixed(1)}</span>
        </div>
        <div className="flex flex-wrap mt-2 gap-2">
          {instructor.courses.map((course, index) => (
            <span
              key={index}
              className="font-bold text-xs py-1 rounded-full mr-1 mb-1"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default InstructorCard;
