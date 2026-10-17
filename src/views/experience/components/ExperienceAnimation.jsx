import { useEffect, useState } from "react";
import Lottie from "react-lottie";

import preSpecialtyLottie from "@/assets/img/lottie/pre-specialty.json";

const ExperienceAnimation = () => {
  const [showLottie, setShowLottie] = useState(false);

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const callbackId = requestIdleCallback(() => {
        setShowLottie(true);
      });

      return () => {
        cancelIdleCallback(callbackId);
      };
    }

    const timeoutId = setTimeout(() => {
      setShowLottie(true);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!showLottie) {
    return null;
  }

  return (
    <Lottie
      isStopped={false}
      isPaused={false}
      isClickToPauseDisabled
      options={{
        loop: true,
        autoplay: true,
        animationData: preSpecialtyLottie,
      }}
    />
  );
};

export default ExperienceAnimation;
