import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { BodyPart } from "./BodyPart";

export default {
  title: "entities/BodyPart",
  component: BodyPart,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BodyPart>;

const Template: ComponentStory<typeof BodyPart> = (args) => (
  <BodyPart {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
