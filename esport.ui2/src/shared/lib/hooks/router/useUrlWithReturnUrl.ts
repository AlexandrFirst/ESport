import { useRouter } from "next/router";
import { addReturnUrl } from "../../router/add-return-url/add-return-url";

export const useUrlWithReturnUrl = (to: string) => {
  const router = useRouter();
  return addReturnUrl(to, router.query);
};
