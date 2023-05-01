import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type FramerMotionType = typeof import("framer-motion");
type GestureType = typeof import("@use-gesture/react");
type SpringType = typeof import("@react-spring/web");

interface AnimationContextPayload {
  Gesture?: GestureType;
  FramerMotion?: FramerMotionType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе либы зависят друг от друга
const getAsyncAnimationModules = async () => {
  return Promise.all([
    import("framer-motion"),
    import("@use-gesture/react"),
    import("@react-spring/web"),
  ]);
};

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const FramerMotionRef = useRef<FramerMotionType>();
  const GestureRef = useRef<GestureType>();
  const SpringRef = useRef<SpringType>();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModules().then(([FramerMotion, Gesture, Spring]) => {
      FramerMotionRef.current = FramerMotion;
      GestureRef.current = Gesture;
      SpringRef.current = Spring;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      FramerMotion: FramerMotionRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};