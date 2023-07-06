import { FC, Suspense, useEffect, useState } from "react";
import styles from "./CompetitionListByOrganisation.module.css";

import { useRouter } from "next/router";
import { useQueryState } from "next-usequerystate";

import {
  Skeleton,
  Title,
  BackLink,
  SubTitle,
  ErrorText,
  CheckboxBase,
} from "@/shared/ui";
import { routes } from "@/shared/config";

import { useCompetitionsByOrganisationId } from "@/entities/competition";

import { CompetitionList } from "../../../../features/(competition)/CompetitionListOfOrganisation";
import { useCurrentUserProfileInfo } from "@/entities/user";

interface CompetitionListByOrganisationProps {
  className?: string;
}

export const CompetitionListByOrganisation: FC<
  CompetitionListByOrganisationProps
> = () => {
  const router = useRouter();
  const orgId = Number(router.query.organisationId);

  const [includeClosedRegistration, setIncludeClosedRegistration] =
    useQueryState("showClosed", {
      parse: (value) => value === "true",
    });

  const { data, isLoading, error } = useCompetitionsByOrganisationId({
    orgId,
    includeClosedRegistration: !!includeClosedRegistration,
  });
  const { isOrgAdminForOrganisations } = useCurrentUserProfileInfo();

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
          Competitions of {data?.organisation?.name}
        </Title>
        {!data?.competitions.length ? (
          <SubTitle>No competitions yet</SubTitle>
        ) : (
          <>
            {isOrgAdminForOrganisations([orgId]) && (
              <CheckboxBase
                className={"my-5"}
                label={"Show competitions with closed registration"}
                checked={!!includeClosedRegistration}
                onCheckedChange={(checked) =>
                  setIncludeClosedRegistration(!!checked)
                }
              />
            )}
            <CompetitionList list={data?.competitions ?? []} orgId={orgId} />
          </>
        )}
      </div>
    </Suspense>
  );
};
