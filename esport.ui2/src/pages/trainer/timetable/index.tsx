import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

type TimetableProps = PageProps & {};

const Timetable: AppNextPage<TimetableProps> = () => {
  return <div>Timetable</div>;
};

Timetable.getLayout = getMainLayout({
  headProps: { title: "Trainer Timetable | E-Sport" },
});

export default Timetable;
