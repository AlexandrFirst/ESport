import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Lesson } from "./Lesson";

export default {
  title: "entities/Lesson",
  component: Lesson,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Lesson>;

const Template: ComponentStory<typeof Lesson> = (args) => <Lesson {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
