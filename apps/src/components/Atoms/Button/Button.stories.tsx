import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { action } from "@storybook/addon-actions";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Button> = {
  title: "chekromlek/Components/Atoms/Button",
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' }
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A7931&node-id=3683-11678&viewport=646%2C407%2C0.27&t=XYeCNRYRxlyewHXZ-1&scaling=min-zoom",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Button",
    colorScheme: "primary",
    size: "md",
    colorOutline: "none",
    rounded: "none",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole("button", { name: /click Button/i });

    // Simulate click and check if the button is still enabled
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
};

export const ClickAction: Story = {
  args: {
    ...Default.args,
    onClick: action("Clicked Action!"),
  },
  play: async ({ canvasElement }) => {
    // Access the canvas where your component renders
    const canvas = within(canvasElement);

    // Simulate a user click on the button
    await userEvent.click(
      canvas.getByRole("button", { name: /click button/i })
    );

    // Check if the action was called after the click
    await expect(
      canvas.getByRole("button", { name: /click button/i })
    ).toBeEnabled();
  },
};
