import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // Ensure Swiper styles are imported

import signImg from "../../assets/login-img.png";

const SignWelcome = [
  {
    id: 1,
    img: signImg,
    title: "Welcome to Dream LMS Course",
    desc: "Start your journey with our comprehensive courses designed to build your skills and knowledge.",
  },
  {
    id: 2,
    img: signImg,
    title: "Explore New Skills",
    desc: "Discover new opportunities to learn and grow with a variety of courses tailored to different levels.",
  },
  {
    id: 3,
    img: signImg,
    title: "Achieve Your Goals",
    desc: "Our courses are created to help you reach your personal and professional objectives effectively.",
  },
];

function SignHello() {
  return (
    <section className="p-5">
      <Swiper
        slidesPerView={1} // Ensure only 1 slide is visible
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true} // Enable looping
        modules={[Autoplay]}
        className="mySwiper"
      >
        {SignWelcome.map((sign) => (
          <SwiperSlide
            className="flex flex-col text-[var(--text-color)]"
            key={sign.id}
          >
            <div className="mb-6">
              <img src={sign.img} alt="" className="bg-no-repeat" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl font-bold">{sign.title}</p>
              <p className="text-center">{sign.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default SignHello;
