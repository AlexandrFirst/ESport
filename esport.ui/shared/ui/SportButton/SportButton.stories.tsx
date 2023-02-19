import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SportButton } from "@shared/ui/SportButton/SportButton";
import { DarkThemeDecorator } from "@shared/config/storybook/Theme/DarkThemeDecorator";

export default {
  title: "shared/SportButton",
  component: SportButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SportButton>;

const Template: ComponentStory<typeof SportButton> = (args) => (
  <SportButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  children: "Primary",
  isNew: true,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.decorators = [DarkThemeDecorator];

PrimaryDark.args = {
  primary: true,
  children: "Primary Dark",
  isNew: true,
};

export const OldPrimary = Template.bind({});

OldPrimary.args = {
  primary: true,
  children: "Old Primary",
};

export const OldPrimaryDark = Template.bind({});
OldPrimaryDark.decorators = [DarkThemeDecorator];

OldPrimaryDark.args = {
  primary: true,
  children: "Old Primary Dark",
};
