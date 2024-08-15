import { useEffect } from 'react';
import lottie from 'lottie-web';

interface LottieProps {
  animationData: NonNullable<unknown>;
  width?: number | string;
  height?: number | string;
  itemKey: string;
  loop?: boolean;
}

const Lottie = ({ animationData, width, height, itemKey, loop = false }: LottieProps) => {
  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: (document.getElementById(itemKey) as Element) ?? null,
      loop: loop,
      autoplay: true,
      animationData
    });

    return () => instance.destroy();
  }, [animationData, itemKey, loop]);

  return <div style={{ width, height }} id={itemKey} />;
};

export default Lottie;
