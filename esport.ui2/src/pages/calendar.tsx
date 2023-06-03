import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

import { Calendar } from "@/shared/ui";
import { DayOfTheWeek } from "@/shared/constants";

type CalendarPageProps = PageProps & {};

const CalendarPage: AppNextPage<CalendarPageProps> = () => {
  return (
    <>
      <Calendar
        events={[
          {
            title: "awrwt",
            dayOfTheWeek: DayOfTheWeek.SATURDAY,
            from: "12:00",
            to: "15:00",
            data: { id: "1" },
          },
          {
            title: "awrwtrpogfreiohfowrhfiowehowhfiowehfoihewiohf",
            dateTime: new Date(),
            from: "12:00",
            to: "15:00",
          },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date(), from: "12:00", to: "15:00" },
          { title: "awrwt", dateTime: new Date("05-24-2023") },
        ]}
      />
    </>
  );
};

CalendarPage.getLayout = getMainLayout({
  headProps: { title: "CalendarPage | E-Sport" },
});

export default CalendarPage;
