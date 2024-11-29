import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import love from "../../../assets/user-love.jpg";
import qute from "../../../assets/qute.png";
import qute0 from "../../../assets/qute-01.png";
import { TestData } from "./Testimonials";
import "./Test.css";

interface TestimonialProps {
  text: string;
  image: string;
  name: string;
  position: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  text,
  image,
  name,
  position,
}) => (
  <div className="text-white">
    <p className="text-xl italic text-center relative">
      {text} <img src={qute0} className="absolute right-0 top-[-50px]" alt="" />
    </p>
    <div className="flex items-center justify-center mt-8 flex-col text-center">
      <img src={image} alt={name} className="w-14 h-14 rounded-full mr-4" />
      <div>
        <h4 className="text-2xl font-bold">{name}</h4>
        <p className="text-sm">{position}</p>
      </div>
    </div>
  </div>
);

function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <section
      ref={sectionRef}
      className="bg-cover bg-center py-5 relative h-[500px] mb-[5em] "
      style={{ backgroundImage: `url(${love})` }}
    >
      <div className="text-center text-[var(--text-color)] mb-12 ">
        <p className="font-bold uppercase">Check out these real reviews</p>
        <h2 className="text-4xl font-bold">
          Users love us. Don’t take it from us.
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="container mx-auto bg-[#131022] rounded-xl max-w-4xl border-[10px] border-[var(--nav-color)] absolute -bottom-12 right-0 left-0"
      >
        <div className="absolute top-0 -mt-[3em] left-5">
          <img src={qute} className="" alt="" />
        </div>
        <Swiper
          navigation
          loop
          spaceBetween={30}
          slidesPerView={1} // Ensuring one slide is visible at a time
          modules={[Navigation]}
          className="relative p-8 pt-16 custom-swiper"
        >
          {TestData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Testimonial
                text={testimonial.text}
                image={testimonial.image}
                name={testimonial.name}
                position={testimonial.position}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}

export default Testimonials;
