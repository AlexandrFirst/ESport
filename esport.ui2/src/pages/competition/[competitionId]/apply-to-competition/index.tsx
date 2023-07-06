import { PageProps, AppNextPage } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

type ApplyToCompetitionProps = PageProps & {};

const ApplyToCompetition: AppNextPage<ApplyToCompetitionProps> = () => {
  return <div>ApplyToCompetition</div>;
};

ApplyToCompetition.getLayout = getMainLayout({
  headProps: { title: "ApplyToCompetition | E-Sport" },
});

export default ApplyToCompetition;
