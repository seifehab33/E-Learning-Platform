import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { AchievementsData } from "./Achievemnt";

function Achivements() {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });
  const [startCounting, setStartCounting] = useState(false);

  return (
    <div className="container-main p-5 lg:p-2">
      <motion.div
        ref={ref}
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5"
      >
        {AchievementsData.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="flex items-center gap-5 bg-[var(--nav-color)] p-5 text-[var(--text-color)] rounded-xl transition-transform duration-200 ease-in w-full"
            initial={{
              x: index % 2 === 0 ? -100 : 100,
            }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            onAnimationComplete={() => {
              if (isInView) {
                setStartCounting(true);
              }
            }}
            whileHover={{
              translateY: -15,
              y: index % 2 === 0 ? -2 : 0,
              transition: { duration: 0, delay: 0 },
            }}
          >
            <img src={achievement.img} alt="" />
            <div className="info">
              <span className="text-2xl font-bold">
                {startCounting && (
                  <CountUp
                    start={0}
                    end={parseInt(achievement.head.replace(/K|\+/g, ""))}
                    duration={10}
                  />
                )}
                {achievement.head.includes("K") ? "K" : ""}+
              </span>
              <p>{achievement.info}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Achivements;
