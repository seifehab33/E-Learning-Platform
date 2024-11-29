import { motion } from "framer-motion";

interface CourseCategoriesProps {
  checkedCourses: { [key: string]: boolean };
  checkedInstructors: { [key: string]: boolean };
  onCourseChange: (course: string) => void;
  onInstructorChange: (instructor: string) => void;
}

const CourseCategories: React.FC<CourseCategoriesProps> = ({
  checkedCourses,
  checkedInstructors,
  onCourseChange,
  onInstructorChange,
}) => {
  const instructorsList = [
    "Ryan Collins",
    "Sophia Turner",
    "Daniel Foster",
    "Isabella Brown",
    "Adam Miller",
    "Michael Roberts",
    "David Parker",
  ];

  const coursesList = [
    "UI/UX Design",
    "React",
    "WordPress",
    "Data Structures & Algorithms",
    "Fullstack Web Development",
    "Cybersecurity",
    "Game Development with Unity",
  ];

  return (
    <motion.div
      className="Filters-Categories lg:w-1/3 flex flex-col gap-5 p-5 lg:p-0 ml-2"
      initial={{ x: "100%", opacity: 0 }} // Start from the right
      animate={{ x: 0, opacity: 1 }} // Move to normal position
      exit={{ x: "100%", opacity: 0 }} // Exit to the right
      transition={{ duration: 1.2 }} // Transition duration
    >
      {/* Instructor Name Filters */}
      <div className="course-cat bg-[var(--nav-color)] h-auto p-4 rounded-lg shadow-md shadow-gray-900 text-[var(--text-color)]">
        <h1 className="text-lg font-bold mb-2">Instructors</h1>
        {instructorsList.map((name, index) => (
          <div className="inp-cat flex items-center mb-4 text-sm" key={index}>
            <input
              type="checkbox"
              className="hidden"
              onChange={() => onInstructorChange(name)}
              checked={!!checkedInstructors[name]}
            />
            {checkedInstructors[name] ? (
              <div
                className="flex items-center justify-center w-4 h-4 bg-[var(--peach-color)] cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => onInstructorChange(name)}
              >
                <div className="absolute text-white text-xs">✓</div>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-4 h-4 border-2 bg-white cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => onInstructorChange(name)}
              />
            )}
            <p>{name}</p>
          </div>
        ))}
      </div>

      {/* Course Filters */}
      <div className="course-cat bg-[var(--nav-color)] h-auto p-4 rounded-lg shadow-md shadow-gray-900 text-[var(--text-color)]">
        <h1 className="text-lg font-bold mb-2">Courses</h1>
        {coursesList.map((course, index) => (
          <div className="inp-cat flex items-center mb-4 text-sm" key={index}>
            <input
              type="checkbox"
              className="hidden"
              onChange={() => onCourseChange(course)}
              checked={!!checkedCourses[course]}
            />
            {checkedCourses[course] ? (
              <div
                className="flex items-center justify-center w-4 h-4 bg-[var(--peach-color)] cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => onCourseChange(course)}
              >
                <div className="absolute text-white text-xs">✓</div>
              </div>
            ) : (
              <div
                className="flex items-center justify-center w-4 h-4 border-2 bg-white cursor-pointer mr-2 transition-all duration-300 transform scale-100 hover:scale-110"
                onClick={() => onCourseChange(course)}
              />
            )}
            <p>{course}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CourseCategories;
