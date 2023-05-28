import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

import { AppNextPage, PageProps } from "@/shared/types";
import { useRedirectAfterFetch } from "@/shared/lib";
import { ErrorText, Title } from "@/shared/ui";
import { CenteredLayout } from "@/shared/layouts";

import { useConfirmMyProfile } from "@/entities/profile";

import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { routes } from "@/shared/config";

type ConfirmProfileProps = PageProps & {};

const ConfirmProfile: AppNextPage<ConfirmProfileProps> = () => {
  const router = useRouter();

  const { isLoading, isError, isFetched } = useConfirmMyProfile(
    router.query.token as string
  );

  const timeLeft = useRedirectAfterFetch({
    isFetched,
    isError,
    redirectPath: routes.Me(),
  });

  return (
    <CenteredLayout
      isError={isError}
      isLoading={isLoading}
      loadingFallback={<BeatLoader color={"#b2c9df"} />}
      errorFallback={
        <ErrorText className={"text-4xl"}>Something went wrong</ErrorText>
      }
      fadeOutOnFinish={timeLeft === 0}
    >
      <ThemeSwitcher className={"absolute right-10 top-10"} />
      <Title center size={"large"}>
        Your profile have been successfully activated
      </Title>
      <Title center className="mt-10">
        You will be automatically redirected to your profile page in {timeLeft}
      </Title>
    </CenteredLayout>
  );
};

export default ConfirmProfile;
