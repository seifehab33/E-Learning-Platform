import becom1 from "../../../assets/become-01.svg";
import becom2 from "../../../assets/become-02.svg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function BecomeInst() {
  const inst1Ref = useRef(null);
  const inst2Ref = useRef(null);
  const inViewInst1 = useInView(inst1Ref, { once: true });
  const inViewInst2 = useInView(inst2Ref, { once: true });

  return (
    <section className="become_inst my-16 p-5">
      <div className="container-main gap-5 flex-col lg:flex-row">
        <motion.div
          ref={inst1Ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inViewInst1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="Inst1 flex bg-[var(--nav-color)] px-5 py-2 text-[var(--text-color)] rounded-xl shadow-md shadow-gray-800"
        >
          <div>
            <h1 className="text-4xl">Become An Instructor</h1>
            <p className="text-sm">
              Top instructors from around the world teach millions of students
              on Mentoring.
            </p>
          </div>
          <div>
            <img
              src={becom1}
              alt="Become Inst"
              className="object-contain h-56"
            />
          </div>
        </motion.div>

        <motion.div
          ref={inst2Ref}
          initial={{ opacity: 0, x: 50 }}
          animate={inViewInst2 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="Inst2 flex bg-[var(--nav-color)] px-5 py-2 text-[var(--text-color)] rounded-xl shadow-md shadow-gray-800"
        >
          <div>
            <h1 className="text-3xl">Transform Access To Education</h1>
            <p className="text-sm">
              Create an account to receive our newsletter, course
              recommendations and promotions.
            </p>
          </div>
          <div>
            <img
              src={becom2}
              alt="Become Inst"
              className="object-cover w-full h-56"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BecomeInst;
