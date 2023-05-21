import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Sport } from "./Sport";

export default {
  title: "entities/Sport",
  component: Sport,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Sport>;

const Template: ComponentStory<typeof Sport> = (args) => <Sport {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
