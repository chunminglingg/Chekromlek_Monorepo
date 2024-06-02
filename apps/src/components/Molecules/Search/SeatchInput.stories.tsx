import { expect } from '@storybook/jest';
import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import SearchInput from "./SearchInput";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";
import { url } from "inspector";

export default {
  title: "chekromlek/Components/Molecules/SearchInput",
  component: SearchInput,
  argTypes: {
    onIconClick: { action: "icon clicked" },
    onInputClick: { action: "input clicked" },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3544%3A957&node-id=3544-958&viewport=665%2C612%2C0.37&t=j4WPEl6r9oKenGmg-1&scaling=min-zoom",
    },
    tags: ["autodocs"],
  },
} as Meta;

const Template: StoryFn<typeof SearchInput> = (args) => {
  const [search, setSearch] = useState("");
  return <SearchInput {...args} setSearch={setSearch} />;
};

export const Default = Template.bind({});
Default.args = {
  onIconClick: action("icon clicked"),
  onInputClick: action("input clicked"),
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const input = await canvas.getByPlaceholderText("Search");

  // Simulate user typing
  await userEvent.type(input, "Test Search", { delay: 100 });

  // Assert that the input value is updated
  expect(input).toHaveValue("Test Search");

  // Simulate clicking on the search icon
  const icon = await canvas.getByRole("img", { name: /search/i });
  await userEvent.click(icon);
};
