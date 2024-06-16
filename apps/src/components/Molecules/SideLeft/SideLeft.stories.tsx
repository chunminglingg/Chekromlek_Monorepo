import { expect } from '@storybook/jest';
import React from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryFn } from "@storybook/react";
import SideStyle from "./SideLeft";
import { userEvent, within } from "@storybook/testing-library";


export default {
  title: "chekromlek/Components/Molecules/SideStyle",
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

const Template: StoryFn = (args) => <SideStyle {...args} />;
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

  // Click the home button and expect the action to be called
  await userEvent.click(homeButton);
  await expect(homeButton).toBeEnabled();


  // Click the category button and expect the action to be called
  await userEvent.click(categoryButton);
  await expect(categoryButton).toBeEnabled();

  // Click the notification button and expect the action to be called
  await userEvent.click(notificationButton);
  await expect(notificationButton).toBeEnabled();

  // Click the setting button and expect the action to be called
  await userEvent.click(settingButton);
  await expect(settingButton).toBeEnabled();
};
