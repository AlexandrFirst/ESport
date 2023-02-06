import { FC, MutableRefObject, useEffect } from "react";
import { ButtonBase } from "@mui/material";

export interface UseRippleAnimationParams {
  color?: string;
  duration?: number;
}

export const useRippleAnimation = (
  element: MutableRefObject<any>,
  config?: UseRippleAnimationParams
) => {
  const { color = "rgba(97,95,95,0.57)", duration = 500 } = config || {};
  useEffect(() => {
    const applyContainerProperties = () => {
      element.current.classList.add("effect-container");
    };
    applyContainerProperties();

    const applyStyles = (e: any) => {
      const { offsetX, offsetY } = e;
      const { style } = element.current;
      const sizeOffset = 50;

      style.setProperty("--effect-top", `${offsetY - sizeOffset}px`);
      style.setProperty("--effect-left", `${offsetX - sizeOffset}px`);
    };

    const onClick = (e: any) => {
      element.current.classList.remove("active");
      applyStyles(e);
      element.current.classList.add("active");
    };

    element.current.addEventListener("mouseup", onClick);

    const cleanRef = element.current;

    return () => {
      cleanRef.removeEventListener("mouseup", onClick);
    };
    // if (element?.current) {
    //   const button = element?.current;
    //   const ripple = document.createElement("span");
    //   ripple.className = "ripple";
    //   const diameter = Math.max(button.clientWidth, button.clientHeight);
    //   const radius = diameter / 2;
    //   ripple.style.width = ripple.style.height = `${diameter}px`;
    //   ripple.style.left = `${button.clientWidth / 2 - radius}px`;
    //   ripple.style.top = `${button.clientHeight / 2 - radius}px`;
    //   ripple.style.backgroundColor = color;
    //   ripple.style.animationDuration = `${duration}ms`;
    //   const rippleAnimation = ripple.animate(
    //     [
    //       {
    //         transform: "scale(0)",
    //         opacity: 1,
    //       },
    //       {
    //         transform: "scale(1)",
    //         opacity: 0,
    //       },
    //     ],
    //     {
    //       duration,
    //       easing: "ease-out",
    //     }
    //   );
    //   rippleAnimation.onfinish = () => {
    //     ripple.remove();
    //   };
    //   button.appendChild(ripple);
    // }
  }, [config, element]);
};

interface RippleEffectProps {}

export const RippleEffect: FC<RippleEffectProps> = () => {
  // const ref = useRef<HTMLButtonElement | null>(null);
  // useRippleAnimation(ref);

  // <button className={styles.btn} ref={ref}>
  return (
    <button>
      <ButtonBase>EUIGhewugewgb</ButtonBase>
    </button>
  );
};
