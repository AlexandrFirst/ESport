import { useRouter } from "next/router";

import { AppNextPage, PageProps } from "@/shared/types";
import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";

import { getMainLayout } from "@/widgets/MainLayout";

type GymProps = PageProps & {};

const Gym: AppNextPage<GymProps> = () => {
  const router = useRouter();
  const { organisationId, gymId } = router.query;

  return (
    <div>
      <Title>Temporary empty page</Title>
      <UILink
        href={routes.Organisation.CreateRequest([
          organisationId as string,
          gymId as string,
        ])}
      >
        Create request
      </UILink>
    </div>
  );
};

Gym.getLayout = getMainLayout({
  headProps: { title: "Gym | E-Sport" },
});

export default Gym;
