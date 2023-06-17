import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";
import { Title } from "@/shared/ui";

type SettingsProps = PageProps & {};

const Settings: AppNextPage<SettingsProps> = () => {
  return <Title center>Settings - Coming soon</Title>;
};

Settings.getLayout = getMainLayout({
  headProps: { title: "Settings | E-Sport" },
});

export default Settings;
