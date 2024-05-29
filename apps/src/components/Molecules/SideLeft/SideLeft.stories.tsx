import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import SideStyle,{ SideStyleProps }  from "./SideLeft";
import { userEvent, within } from "@storybook/testing-library";

export default {
  title: "Components/SideStyle",
  component: SideStyle,
  argTypes: {
    isHomeClick: { control: "boolean" },
    isCategoryClick: { control: "boolean" },
    isNotificationClick: { control: "boolean" },
    isSettingClick: { control: "boolean" },
    onHomeClick: { action: "clicked home" },
    onCategoryClick: { action: "clicked category" },
    onNotificationClick: { action: "clicked notification" },
    onSettingClick: { action: "clicked setting" },
  },
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof SideStyle>;

const Template: StoryFn<SideStyleProps> = (args) => <SideStyle {...args} />;
export const Default = Template.bind({});
Default.args = {
  isHomeClick: false,
  isCategoryClick: false,
  isNotificationClick: false,
  isSettingClick: false,
};

export const Interactions = Template.bind({});
Interactions.args = {
  isHomeClick: false,
  isCategoryClick: false,
  isNotificationClick: false,
  isSettingClick: false,
};

Interactions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const homeButton = canvas.getByRole('button', { name: /home/i });
  const categoryButton = canvas.getByRole('button', { name: /category/i });
  const notificationButton = canvas.getByRole('button', { name: /notification/i });
  const settingButton = canvas.getByRole('button', { name: /setting/i });

  await userEvent.click(homeButton);
  await userEvent.click(categoryButton);
  await userEvent.click(notificationButton);
  await userEvent.click(settingButton);
};
