import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ApplyToCompetitionForm } from "./ApplyToCompetitionForm";

export default {
  title: "features/ApplyToCompetitionForm",
  component: ApplyToCompetitionForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ApplyToCompetitionForm>;

const Template: ComponentStory<typeof ApplyToCompetitionForm> = (args) => (
  <ApplyToCompetitionForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
