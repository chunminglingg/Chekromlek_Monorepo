// src/stories/CreatePostDialog.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CreatePostDialog from './CreatePostDialog';

export default {
  title: 'chekromlek/Components/Molecules/CreatePostDialog',
  component: CreatePostDialog,
  parameters: {
    actions: {
      handles: ['click', 'change'],
    },
  },
} as Meta;

const Template: StoryFn = (args) => <CreatePostDialog {...args} />;

export const Default = Template.bind({});
Default.args = {};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulate opening the dialog
  const triggerButton = canvas.getByRole('button');
  await userEvent.click(triggerButton);

  // Log the current HTML to help debug
  console.log(canvasElement.innerHTML);

  // Wait for the dialog to open and the title input to appear
  const titleInput = await waitFor(() => canvas.findByPlaceholderText('Title'), {
    timeout: 5000,
  });
  await userEvent.type(titleInput, 'Title');
  expect(titleInput).toHaveValue('Title');

  // Wait for the description textarea to appear
  const descriptionTextarea = await waitFor(() =>
    canvas.findByPlaceholderText('Type your descriptions of your question here.'), {
      timeout: 5000,
    }
  );
  await userEvent.type(descriptionTextarea, 'This is the description of my post.');
  expect(descriptionTextarea).toHaveValue('This is the description of my post.');

  // Simulate clicking the Post button
  const postButton = canvas.getByRole('button', { name: /post/i });
  await userEvent.click(postButton);

  // Add further assertions if needed
};
