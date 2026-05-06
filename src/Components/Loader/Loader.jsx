import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import loaderLottie from '../../assets/couple-heart.json'

const Loader = ({ width, height, speed = 3 }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current && typeof lottieRef.current.setSpeed === 'function') {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  return (
    <div className={`${height || "h-screen"} flex justify-center items-center`}>
      <Lottie lottieRef={lottieRef} animationData={loaderLottie} className={width ? `w-${width}` : undefined} />
    </div>
  );
}

export default Loader;