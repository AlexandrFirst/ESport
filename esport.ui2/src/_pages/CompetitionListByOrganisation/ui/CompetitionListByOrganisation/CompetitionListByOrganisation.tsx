import { FC, Suspense } from "react";
import styles from "./CompetitionListByOrganisation.module.css";

import { useRouter } from "next/router";

import { Skeleton, Title, BackLink, SubTitle, ErrorText } from "@/shared/ui";
import { routes } from "@/shared/config";

import { useCompetitionsByOrganisationId } from "@/entities/competition";

import { CompetitionList } from "@/features/CompetitionListOfOrganisation";

interface CompetitionListByOrganisationProps {
  className?: string;
}

export const CompetitionListByOrganisation: FC<
  CompetitionListByOrganisationProps
> = () => {
  const router = useRouter();
  const orgId = Number(router.query.organisationId);

  const { data, isLoading, error } = useCompetitionsByOrganisationId({ orgId });

  if (isLoading) {
    return (
      <div>
        <Skeleton className={"w-[200px] h-[30px]"} />
      </div>
    );
  }

  if (error) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  return (
    <Suspense fallback={"Loading..."}>
      <div className={styles.wrapper}>
        <BackLink href={routes.Competition.Home()} />
        <Title className={"my-10"}>
          Competitions for {data?.organisation?.name}
        </Title>
        {!data?.competitions.length ? (
          <SubTitle>No competitions yet</SubTitle>
        ) : (
          <CompetitionList list={data?.competitions ?? []} orgId={orgId} />
        )}
      </div>
    </Suspense>
  );
};
