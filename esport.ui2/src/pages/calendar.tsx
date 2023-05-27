import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

import { Calendar } from "@/shared/ui";

type CalendarPageProps = PageProps & {};

const CalendarPage: AppNextPage<CalendarPageProps> = () => {
  return (
    <>
      <Calendar
        events={[
          {
            title: "awrwtrpogfreiohfowrhfiowehowhfiowehfoihewiohf",
            date: new Date(),
          },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date() },
          { title: "awrwt", date: new Date("05-24-2023") },
        ]}
      />
    </>
  );
};

CalendarPage.getLayout = getMainLayout({
  headProps: { title: "CalendarPage | E-Sport" },
});

export default CalendarPage;
