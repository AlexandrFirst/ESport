import { useRouter } from "next/router";

import { ReturnUrl } from "@/shared/constants";

export const useGetLoginUrl = (returnUrl?: string) => {
  const router = useRouter();
  return `/login?${ReturnUrl}=${returnUrl ? returnUrl : router.asPath}`;
};
