import { useState, useEffect, useRef } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { LogSnag } from "@logsnag/node";

const logsnag = new LogSnag({
  token: "LOGSNAG_TOKEN",
  project: "PROJECT_NAME",
});

const track = async () => {
  await logsnag.track({
    channel: "yes",
    event: "Now that we're dating",
    description: "You said yes!",
    icon: "💖",
    notify: true,
  });
};

function App() {
  // const steps = [
  //   {
  //     content: "Hey Nancy, we have been together for 4 months now...",
  //     image: "/character/one.png",
  //   },
  //   {
  //     content: "And every single day with you has been special.",
  //     image: "/character/two.png",
  //   },
  //   {
  //     content: "From our first conversations to our little moments together...",
  //     image: "/character/three.png",
  //   },
  //   {
  //     content: "Now, even though i haven`t seen you in a while...",
  //     image: "/character/four.png",
  //   },
  //   {
  //     content: "I still feel you close—right here in my heart.",
  //     image: "/character/five.png",
  //   },
  //   {
  //     content: "So even from miles apart, I want to ask you this...",
  //     image: "/character/six.png",
  //   },
  //   {
  //     content: "Will you be my Valentine?",
  //     image: "/character/seven.png",
  //   },
  // ];

  // const [currentStep, setCurrentStep] = useState(0);

  const [sheWantsToBeMyValentine, setSheWantsToBeMyValentine] = useState(false);
  const { width, height } = useWindowSize();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // const [isPlaying, setIsPlaying] = useState(true);

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      content: "Hey Shylet 💖",
      image: "/character/one.png",
    },
    {
      content: `We have been together for some time now, and I wouldn't trade it for anything in the world.  ❤️`,
      image: "/character/two.png",
    },
    {
      content: `Even though i havent seen you in a while, my heart is always with you.. 💕`,
      image: "/character/three.png",
    },
    {
      content: `I miss your smile, your voice, and the way you make my days brighter. 🥰`,
      image: "/character/four.png",
    },
    {
      content: "So now I have a special words for you...",
      image: "/character/five.png",
    },
    {
      content: "I love you 💝",
      image: "/character/six.png",
    },
  ];

  const startExperience = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay failed", err));
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current
          .play()
          .catch((err) => console.log("Autoplay failed", err));
        setIsPlaying(true);
      }
    };

    document.addEventListener("click", playAudio, { once: true });
    return () => document.removeEventListener("click", playAudio);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Play failed", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const imagePaths = [
      ...steps.map((step) => step.image),
      "/character/yayyyy.png",
    ];
    imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/song.mp3" loop autoPlay />

      {sheWantsToBeMyValentine && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Confetti width={width} height={height} />
          <div className="fixed top-0 left-0 w-full h-dvh bg-[#FFC5D3] flex flex-col items-center justify-center">
            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-white text-4xl font-bold"
            >
              Yayyy! You Love me too❤️
            </motion.h1>
            <img
              src="/character/yayyyy.png"
              alt=""
              className="w-40 animate-bounce"
            />
          </div>
        </motion.div>
      )}
      {!hasStarted ? (
        <div
          className="fixed top-0 left-0 w-full h-dvh bg-[#FFC5D3] flex text-center flex-col items-center justify-center text-white text-3xl font-bold cursor-pointer"
          onClick={startExperience}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Hey Shylet Praise❤️, <br/>
                      💝💞<br/>
            Tap Anywhere To Begin 💖
          </motion.div>
        </div>
      ) : (
        <div className="bg-[#FFC5D3] min-h-dvh text-white p-5 flex flex-col items-center justify-center max-w-md mx-auto text-center">
          <motion.img
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            src={steps[currentStep].image}
            alt=""
            className="w-40"
          />
          <motion.div
            key={currentStep + "-text"}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-josefin text-4xl font-bold"
          >
            {steps[currentStep].content}
          </motion.div>

          {currentStep < steps.length - 1 && (
            <>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
              >
                Next
              </button>
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold opacity-90"
                >
                  Back
                </button>
              )}
            </>
          )}
          {currentStep === steps.length - 1 && (
            <>
              <button
                onClick={async () => {
                  setSheWantsToBeMyValentine(true);
                  await track();
                }}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-10 font-semibold"
              >
                Yes
              </button>

              <button
                onClick={async () => {
                  setSheWantsToBeMyValentine(true);
                  await track();
                }}
                className="bg-white text-[#FFC5D3] py-3 text-xl rounded-xl w-full mt-2 font-semibold"
              >
                Yes
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
