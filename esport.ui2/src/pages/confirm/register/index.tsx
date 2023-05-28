import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

import { AppNextPage, PageProps } from "@/shared/types";
import { CenteredLayout } from "@/shared/layouts";
import { ErrorText, Title } from "@/shared/ui";
import { useRedirectAfterFetch } from "@/shared/lib";

import { useConfirmUser } from "@/entities/user";

import { ThemeSwitcher } from "@/features/ThemeSwitcher";

type ConfirmRegisterProps = PageProps & {};

const ConfirmRegister: AppNextPage<ConfirmRegisterProps> = () => {
  const router = useRouter();

  const { isLoading, isError, isFetched } = useConfirmUser(
    router.query.token as string
  );

  const timeLeft = useRedirectAfterFetch({ isFetched, isError });

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
        Your account have been successfully activated
      </Title>
      <Title center className="mt-10">
        You will be automatically redirected to home page in {timeLeft}
      </Title>
    </CenteredLayout>
  );
};

export default ConfirmRegister;
