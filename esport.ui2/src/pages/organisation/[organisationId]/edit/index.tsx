import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { Card, ErrorText } from "@/shared/ui";

import { GymApi, IGymReadInfo } from "@/entities/gym";
import { IOrganisation } from "@/entities/organisation";
import { getOrganisationAdminInfo, ProfileApi } from "@/entities/profile";

import { EditOrganisationForm } from "@/features/EditOrganisation";

import { getMainLayout } from "@/widgets/MainLayout";

type EditOrganisationProps = PageProps & {
  gyms: IGymReadInfo[];
  organisation: IOrganisation;
};

const EditOrganisation: AppNextPage<EditOrganisationProps> = ({
  gyms,
  error,
  organisation,
}) => {
  if (error) return <ErrorText>{error}</ErrorText>;
  return (
    <Card>
      <EditOrganisationForm gyms={gyms} organisation={organisation} />
    </Card>
  );
};

EditOrganisation.getLayout = getMainLayout({
  headProps: { title: "Organisation | E-Sport" },
});

export default EditOrganisation;

export const getServerSideProps = getAppServerSideProps<EditOrganisationProps>(
  async (ctx, store) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common"]
    );
    const { organisationId } = ctx.query;
    const { user } = store.getState();

    const [profileApi, gymApi] = await Promise.all([
      ProfileApi(ctx),
      GymApi(ctx),
    ]);

    const [{ data: profile }, { data: gymsResponse }] = await Promise.all([
      profileApi.getProfileInfo(user.data?.id ?? 0),
      gymApi.gymListing({
        page: 1,
        pageSize: 1000,
        gymIds: [],
        organisationIds: [Number(organisationId)],
      }),
    ]);

    const organisationInfo = getOrganisationAdminInfo(profile);

    return {
      props: {
        ...localization,
        gyms: gymsResponse.gymReadInfos ?? [],
        organisation: {
          organisationId: organisationInfo?.organisationId ?? 0,
          name: organisationInfo?.organisationName ?? "",
          description: organisationInfo?.organisationDescription ?? "",
        },
      },
    };
  }
);
