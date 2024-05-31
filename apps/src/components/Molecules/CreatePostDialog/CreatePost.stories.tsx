// src/stories/CreatePostDialog.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { action } from '@storybook/addon-actions';
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
Default.args = {
  onClick: action("create dialog"),
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Simulate opening the dialog
  const triggerButton = canvas.getByRole('button');
  await userEvent.click(triggerButton);

  // Wait for the dialog to open
  await waitFor(() => {
    // Log the current HTML to help debug
    console.log(canvasElement.innerHTML);
  });

  // Wait for the title input to appear
  const titleInput = await waitFor(() => canvas.findByPlaceholderText('Title'), {
    timeout: 10000, // Increase timeout
  });
  await userEvent.type(titleInput, 'Title');
  expect(titleInput).toHaveValue('Title');

  // Wait for the description textarea to appear
  const descriptionTextarea = await waitFor(() =>
    canvas.findByPlaceholderText('Type your descriptions of your question here.'), {
      timeout: 10000, // Increase timeout
    }
  );
  await userEvent.type(descriptionTextarea, 'This is the description of my post.');
  expect(descriptionTextarea).toHaveValue('This is the description of my post.');

  // Simulate clicking the Post button
  const postButton = canvas.getByRole('button', { name: /post/i });
  await userEvent.click(postButton);

  // Add further assertions if needed

  // For example, verify if the dialog is closed or a success message appears
  await waitFor(() => {
    const dialog = canvas.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument(); // Assuming the dialog closes on post
  });

  // Or check for a success message
  const successMessage = await waitFor(() =>
    canvas.findByText('Your post has been created successfully!'), {
      timeout: 10000, // Increase timeout
    }
  );
  expect(successMessage).toBeInTheDocument();
};
