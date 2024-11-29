import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import { FaUserPlus, FaBook, FaGlobe } from "react-icons/fa";

function TotalCourses() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartCount(true);
    }
  }, [isInView]);

  const stats = [
    {
      id: 1,
      icon: <FaUserPlus size={60} className="text-[#F8B400]" />,
      count: 1000,
      label: "STUDENTS ENROLLED",
    },
    {
      id: 2,
      icon: <FaBook size={60} className="text-[#FF4C60]" />,
      count: 2000,
      label: "TOTAL COURSES",
    },
    {
      id: 3,
      icon: <FaGlobe size={60} className="text-[#6A0DAD]" />,
      count: 300,
      label: "COUNTRIES",
    },
  ];

  return (
    <div className="container-main p-5 ">
      <div
        ref={ref}
        className="my-10 p-6 bg-[#1a1a2e] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.2),0_4px_15px_rgba(0,0,0,0.15)] w-full max-w-full"
      >
        <div className="flex justify-between flex-col lg:flex-row gap-5">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="flex items-center text-center text-white p-6 rounded-md bg-[#212135] shadow-lg hover:shadow-[0_15px_30px_-10px_rgba(248,180,0,0.7),0_10px_20px_0_rgba(0,0,0,0.5)] transition-shadow duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.id * 0.3 }}
            >
              <div className="flex gap-5">
                <div className="mb-4">{stat.icon}</div>
                <div className="flex flex-col text-start">
                  <h3 className="text-3xl font-bold">
                    {startCount && (
                      <CountUp
                        start={0}
                        end={stat.count}
                        duration={2.5}
                        separator=","
                      />
                    )}
                  </h3>
                  <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TotalCourses;
