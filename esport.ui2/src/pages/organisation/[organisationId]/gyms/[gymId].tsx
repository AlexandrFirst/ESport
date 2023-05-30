import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

type GymProps = PageProps & {};

const Gym: AppNextPage<GymProps> = () => {
  return <div>Gym</div>;
};

Gym.getLayout = getMainLayout({
  headProps: { title: "Gym | E-Sport" },
});

export default Gym;
