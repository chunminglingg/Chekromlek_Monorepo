import { expect } from '@storybook/jest';
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CreatePostDialog from './CreatePostDialog';
import { userEvent, within } from '@storybook/testing-library';

export default {
  title: 'Chekromlek/Components/Molecules/CreatePostDialog',
  component: CreatePostDialog,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?node-id=3911-2899&t=0i02gzHgTUOS7Agu-1&scaling=min-zoom&page-id=3911%3A2898https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?node-id=3911-2899&t=0i02gzHgTUOS7Agu-1&scaling=contain&page-id=3911%3A2898",
    },
    tags: ["autodocs"],
  },
} as Meta;

const Template: StoryFn<typeof CreatePostDialog> = (args) => <CreatePostDialog {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithActionLogs = Template.bind({});
WithActionLogs.args = {
  onTitleChange: action('Title changed'),
  onDescriptionChange: action('Description changed'),
  onSubmit: action('Form Post'),
  onImageUpload: action('Image uploaded'),
  onImageDelete: action('Image deleted'),
  onDialogOpen: action('Dialog opened'),
  onDialogClose: action('Dialog closed'),
};

WithActionLogs.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  
  // Open the dialog
  const triggerButton = await canvas.getByRole('button');
  await userEvent.click(triggerButton);
  
  // Check if the title input is enabled
  const titleInput = await canvas.getByRole('text', { name: /title/i });
  await expect(titleInput).toBeEnabled();
};