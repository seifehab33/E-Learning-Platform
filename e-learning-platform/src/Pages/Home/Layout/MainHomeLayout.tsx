import { useState, useRef, useCallback, lazy, Suspense } from "react";
import { FaStar } from "react-icons/fa";
import CountUp from "react-countup";
import { motion, useInView } from "framer-motion";
import img_main from "../../../assets/home.png";
import SearchBar from "./SearchBar";
import SpinnerFallback from "../../../components/SpinnerFallback/SpinnerFallback";

// Lazy loading components below the fold
const Achievements = lazy(() => import("../Achivements/Achivements"));
const Category = lazy(() => import("../Categories/Category"));
const FeaturedCourses = lazy(
  () => import("../FeaturedCourses/FeaturedCourses")
);
const MasterSkill = lazy(() => import("../MasterSkill/MasterSkill"));
const NewCourses = lazy(() => import("../New_Courses/NewCourses"));
const FeaturedInstructor = lazy(
  () => import("../FeaturedInstructor/FeaturedInstructor")
);
const TrustedUni = lazy(() => import("../TrustedUni/TrustedUni"));
const JoinMentor = lazy(() => import("../JoinMentor/JoinMentor"));
const Testimonials = lazy(() => import("../Testimonials/Test"));
const BecomeInst = lazy(() => import("../BecomeInst/BecomeInst"));
const Blogs = lazy(() => import("../Blogs/Blogs"));
const TotalCourses = lazy(() => import("../TotalCourses/TotalCourses"));
const AccessSection = lazy(() => import("../AccessSelection/AccessSelection"));

function MainHomeLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Category");

  const textRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(textRef, { once: true });

  // useCallback to prevent re-creation of handleSearch on each render
  const handleSearch = useCallback(() => {
    console.log("Search Query:", searchQuery);
    console.log("Selected Category:", category);
  }, [searchQuery, category]);

  return (
    <>
      <section className="home-main mt-[100px] p-5" id="home-main">
        <div className="container-main flex flex-col lg:flex-row gap-5 text-[var(--text-color)]">
          <motion.div
            className="left-side flex-1 flex flex-col gap-5"
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1.5 }}
            ref={textRef}
          >
            <p className="text-xl">The Leader in Online Learning</p>
            <h1 className="text-4xl lg:text-6xl font-bold">
              Engaging & <br />
              Accessible Online Courses For All
            </h1>
            <p className="text-xl">
              Own your future learning new skills online
            </p>

            {/* Search Bar Component */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              category={category}
              setCategory={setCategory}
              handleSearch={handleSearch}
            />

            <div>
              <h6 className="text-xl">Trusted by over 15K Users</h6>
              <h6 className="text-xl">worldwide since 2024</h6>
            </div>
            <div className="rate flex gap-8 md:gap-16 text-4xl md:text-5xl font-bold">
              <p>
                <CountUp end={1000} duration={2.5} />+
              </p>
              <div className="flex items-center space-x-1">
                <p>4.4</p>
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500 w-5 h-5" />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="right-side flex-1 flex justify-center items-center"
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1.5 }}
            ref={imageRef}
          >
            <img
              src={img_main}
              alt="Main Visual"
              className="max-w-full h-auto animate-bounce"
              loading="lazy" // Lazy load the main image
            />
          </motion.div>
        </div>
      </section>

      <Suspense fallback={<SpinnerFallback />}>
        <section className="my-20">
          <Achievements />
        </section>
        <Category />
        <FeaturedCourses />
        <MasterSkill />
        <NewCourses />
        <FeaturedInstructor />
        <TrustedUni />
        <JoinMentor />
        <Testimonials />
        <BecomeInst />
        <Blogs />
        <TotalCourses />
        <AccessSection />
      </Suspense>
    </>
  );
}

export default MainHomeLayout;
