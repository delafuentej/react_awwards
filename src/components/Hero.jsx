import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import CustomButton from "./CustomButton";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  console.log("loadedVideos", loadedVideos);

  const TOTAL_VIDEOS = 4;

  const nextVideoRef = useRef(null);

  const upcommingVideoIndex = (currentIndex % TOTAL_VIDEOS) + 1;

  const words = ["Gaming", "Identity", "Reality", "Agentic AI"];

  const currentWord = words[(currentIndex - 1) % words.length];
  console.log("currentWord", currentWord);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcommingVideoIndex);
  };
  const handleVideoLoad = () => {
    setLoadedVideos((prevVideo) => prevVideo + 1);
  };

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === TOTAL_VIDEOS - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      easy: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-36 md:size-64 cursor-pointer overflow-hidden rounded-lg ">
            <div
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              onClick={handleMiniVideoClick}
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcommingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-36 md:size-64  scale-150 origin-center object-cover object-center border-spacing-2 "
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            id="next-video"
            src={getVideoSrc(currentIndex)}
            loop
            muted
            className="absolute-center invisible absolute z-20 size-36 md:size-64  object-cover object-center rounded-lg"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex === TOTAL_VIDEOS - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5  z-40 text-blue-75">
          <b>{currentWord}</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              <b>Redefine</b>
            </h1>
            <p className="mb-5 max-w-64 font-robertRegular text-blue-100">
              <b>
                Enter de Metagame Layer. <br /> Unleash the Play Economy
              </b>
            </p>
            <CustomButton
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        <b>{currentWord}</b>
      </h1>
    </div>
  );
};

export default Hero;
