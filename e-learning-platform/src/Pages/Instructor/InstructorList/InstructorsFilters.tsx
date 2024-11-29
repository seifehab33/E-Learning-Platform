import React from "react";
import { motion } from "framer-motion";

interface InstructorFiltersProps {
  checkedCourses: { [key: string]: boolean };
  setCheckedCourses: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  checkedInstructors: { [key: string]: boolean };
  setCheckedInstructors: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

const InstructorFilters: React.FC<InstructorFiltersProps> = ({
  checkedCourses,
  setCheckedCourses,
  checkedInstructors,
  setCheckedInstructors,
}) => {
  const instructors = [
    "Ryan Collins",
    "Sophia Turner",
    "Daniel Foster",
    "Isabella Brown",
    "Adam Miller",
    "Michael Roberts",
    "David Parker",
  ];
  const courses = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "WordPress",
    "Cybersecurity",
    "DevOps",
  ];

  const handleCourseCheckboxChange = (course: string) => {
    setCheckedCourses((prev) => ({
      ...prev,
      [course]: !prev[course],
    }));
  };

  const handleInstructorCheckboxChange = (name: string) => {
    setCheckedInstructors((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <motion.div
      className="Filters-Categories w-full lg:w-1/3 flex flex-col gap-5"
      initial={{ x: "100%", opacity: 0 }} // Start from the right
      animate={{ x: 0, opacity: 1 }} // Move to normal position
      exit={{ x: "100%", opacity: 0 }} // Exit to the right
      transition={{ duration: 1.2 }} // Transition duration
    >
      {/* Instructor Name Filters */}
      <div className="course-cat bg-[var(--nav-color)] h-auto p-4 rounded-lg shadow-md shadow-gray-900 text-[var(--text-color)]">
        <h1 className="text-lg font-bold mb-2">Instructors</h1>
        {instructors.map((name, index) => (
          <div className="inp-cat flex items-center mb-4 text-sm" key={index}>
            <input
              type="checkbox"
              className="hidden"
              onChange={() => handleInstructorCheckboxChange(name)}
              checked={!!checkedInstructors[name]}
            />
            {checkedInstructors[name] ? (
              <div
                className="flex items-center justify-center w-4 h-4 bg-[var(--peach-color)] cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => handleInstructorCheckboxChange(name)}
              >
                <div className="absolute text-white text-xs">✓</div>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-4 h-4 border-2 bg-white cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => handleInstructorCheckboxChange(name)}
              />
            )}
            <p>{name}</p>
          </div>
        ))}
      </div>

      {/* Course Filters */}
      <div className="course-cat bg-[var(--nav-color)] h-auto p-4 rounded-lg shadow-md shadow-gray-900 text-[var(--text-color)]">
        <h1 className="text-lg font-bold mb-2">Courses</h1>
        {courses.map((course, index) => (
          <div className="inp-cat flex items-center mb-4 text-sm" key={index}>
            <input
              type="checkbox"
              className="hidden"
              onChange={() => handleCourseCheckboxChange(course)}
              checked={!!checkedCourses[course]}
            />
            {checkedCourses[course] ? (
              <div
                className="flex items-center justify-center w-4 h-4 bg-[var(--peach-color)] cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => handleCourseCheckboxChange(course)}
              >
                <div className="absolute text-white text-xs">✓</div>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-4 h-4 border-2 bg-white cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => handleCourseCheckboxChange(course)}
              />
            )}
            <p>{course}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InstructorFilters;
