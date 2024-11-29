import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ResuableHead from "../../../components/ResuableHead/ResuableHead";
import { Skills } from "./Skills";
import join from "../../../assets/join.png";

const MasterSkill: React.FC = () => {
  const ref = useRef(null);
  const InView = useInView(ref, { once: true });
  return (
    <section className="master-skill my-10 p-5" ref={ref}>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={InView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="container-main flex-col lg:flex-row gap-2">
          <>
            <ResuableHead
              title="What's new"
              subtitle="Master the skills to drive your career"
              description="Get certified, master modern tech skills, and level up your career — whether you’re starting out or a seasoned pro. 95% of eLearning learners report our hands-on content directly helped their careers."
            />
          </>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3 }}
            className="join-skill-img lg:-mb-[200px] mb-20"
          >
            <img src={join} alt="" />
          </motion.div>
        </div>

        <div className="skills-master container-main">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
            {Skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, type: "tween", stiffness: 50 }}
                whileHover={{ y: -10, transition: { duration: 0.1 } }}
                className="flex items-center gap-3 bg-[var(--nav-color)] p-3 rounded-xl text-[var(--text-color)] text-sm outline outline-2 outline-offset-4 outline-[#1b1632] hover:-translate-y-1 transition-transform ease-in-out duration-300"
              >
                <div className="bg-[var(--main-color)] p-2 rounded-md">
                  <img src={skill.img} alt="Skill image" />
                </div>
                <p>{skill.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MasterSkill;
