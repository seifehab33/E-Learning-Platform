import share from "../../../assets/share.png";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function JoinMentor() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true });

  // Define common animation settings for reuse
  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  };

  const commonTransition = {
    duration: 0.8,
    ease: "easeInOut",
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="initial"
      animate={inView ? "animate" : ""}
      className="my-10 p-5"
    >
      <motion.div
        variants={fadeInUp}
        transition={commonTransition}
        className="container-main flex-col lg:flex-row"
      >
        <motion.div
          variants={fadeInLeft}
          transition={{ ...commonTransition, delay: 0.2 }}
          className="left-side flex-1"
        >
          <img src={share} alt="Share Your Knowledge" />
        </motion.div>
        <motion.div
          variants={fadeInRight}
          transition={{ ...commonTransition, delay: 0.4 }}
          className="right-side flex-1 flex flex-col gap-10"
        >
          <h1 className="text-4xl font-bold text-[var(--text-color)]">
            Want to share your knowledge? Join us as a Mentor
          </h1>
          <p className="text-xl text-[var(--text-color)]">
            High-definition video is video of higher resolution and quality than
            standard-definition. While there is no standardized meaning for
            high-definition, generally any video.
          </p>
          <div className="features-mentor flex flex-col gap-5">
            {["Best Courses", "Top rated Instructors"].map((feature, index) => (
              <h1 key={index} className="flex items-center gap-5">
                <FaCheckCircle color="var(--peach-color)" size={20} />
                <p className="text-[var(--text-color)]">{feature}</p>
              </h1>
            ))}
          </div>
          <div className="read-more">
            <Button buttonText="Read More" />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default JoinMentor;
