import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import BentoTilt from "./BentoTilt";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });
  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px] ">
          Welcome to Zentry
        </h2>
        <AnimatedTitle
          title="Disc<b>o</b>ver the  <br />  world's <br /> l<b>a</b>rgest shared  <br /> adventure"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Metagame begins-your life, now an epic MMORPG.</p>
          <p className="text-gray-500">
            Zentry is the unified play layer driving attention and contribution
            through cross-world AI gamification.
          </p>
        </div>
      </div>
      <BentoTilt>
        <div id="clip" className="h-dvh w-screen">
          <div className="mask-clip-path about-image  border-black border-2">
            <img
              src="/img/about.webp"
              alt="backgroud"
              className="absolute left-0 top-0 size-full object-cover"
            />
          </div>
        </div>
      </BentoTilt>
    </div>
  );
};

export default About;
