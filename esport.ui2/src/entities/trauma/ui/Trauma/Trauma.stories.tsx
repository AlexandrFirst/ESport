import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Trauma } from "./Trauma";

export default {
  title: "entities/Trauma",
  component: Trauma,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Trauma>;

const Template: ComponentStory<typeof Trauma> = (args) => <Trauma {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};
