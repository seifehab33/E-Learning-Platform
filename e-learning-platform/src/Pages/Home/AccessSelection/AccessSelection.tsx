import React from "react";
import { FaGlobe, FaAws, FaCloud, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiKubernetes, SiAnsible, SiTerraform, SiVercel } from "react-icons/si";
import { RiMoonClearFill } from "react-icons/ri";
interface Childern {
  children: React.ReactNode;
  color: string;
}
function AccessSection() {
  return (
    <section className=" my-10 p-8 rounded-lg bg-gradient-to-r from-[#1f1d2b] to-[#2e2b40] text-white text-center shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-[var(--text-color )]">
        Unlimited access to{" "}
        <span className="text-[var(--highlight-color)]">360+</span> courses and{" "}
        <span className="text-[var(--highlight-color)]">1,600+</span> hands-on
        labs
      </h2>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        <IconCard color="#4285F4">
          <FaGlobe size={40} />
        </IconCard>
        <IconCard color="#326CE5">
          <SiKubernetes size={40} />
        </IconCard>
        <IconCard color="#FF9900">
          <FaAws size={40} />
        </IconCard>
        <IconCard color="#EE0000">
          <SiAnsible size={40} />
        </IconCard>
        <IconCard color="#00B4D8">
          <FaCloud size={40} />
        </IconCard>
        <IconCard color="#623CE4">
          <SiTerraform size={40} />
        </IconCard>
        <IconCard color="#2496ED">
          <FaDocker size={40} />
        </IconCard>
        <IconCard color="#000000">
          <SiVercel size={40} />
        </IconCard>
        <IconCard color="#F05032">
          <FaGitAlt size={40} />
        </IconCard>
        <IconCard color="#FFAA00">
          <RiMoonClearFill size={40} />
        </IconCard>
      </div>
    </section>
  );
}

const IconCard = ({ children, color }: Childern) => (
  <div
    className="p-6 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 shadow-md hover:shadow-lg"
    style={{ backgroundColor: color }}
  >
    {children}
  </div>
);

export default AccessSection;
