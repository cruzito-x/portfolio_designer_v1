import { useEffect, useState } from "react";
import Lottie from "react-lottie";

import coffeeLottie from "@/assets/img/lottie/coffee";

const ContactAnimation = ({ lang }) => {
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

  return (
    <>
      {showLottie && (
        <Lottie
          isStopped={false}
          isPaused={false}
          isClickToPauseDisabled
          options={{
            loop: true,
            autoplay: true,
            animationData: coffeeLottie,
          }}
          style={{
            width: "85%",
          }}
        />
      )}

      <p className="text-black">{lang.contact_text?.text}</p>
    </>
  );
};

export default ContactAnimation;
