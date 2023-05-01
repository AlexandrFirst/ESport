import { useAppSelector } from "@/shared/lib";
import { StateSchema } from "@/_app/Providers";

type Selector<T> = (state: StateSchema) => T;
type Result<T> = [() => T, Selector<T>];

export function buildSelector<T>(selector: Selector<T>): Result<T> {
  const useSelectorHook = () => {
    return useAppSelector(selector);
  };

  return [useSelectorHook, selector];
}
