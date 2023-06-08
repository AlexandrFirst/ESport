import { AppNextPage, PageProps } from "@/shared/types";

import { getMainLayout } from "@/widgets/MainLayout";
import { TraineeRecommendations } from "@/widgets/TraineeRecommendations";

type FindSportProps = PageProps & {};

const FindSport: AppNextPage<FindSportProps> = () => {
  return <TraineeRecommendations />;
};

FindSport.getLayout = getMainLayout({
  headProps: { title: "FindSport | E-Sport" },
});

export default FindSport;
