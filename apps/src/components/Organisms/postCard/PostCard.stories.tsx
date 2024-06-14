import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { action } from '@storybook/addon-actions';
import PostCard, { postCardProps } from './PostCard';
import { expect } from '@storybook/jest';

export default {
  title: 'chekromlek/Components/Organisms/PostCard',
  component: PostCard,
  argTypes: {
    username: { control: 'text' },
    profile: { control: 'text' },
    hour: { control: 'number' },
    title: { control: 'text' },
    description: { control: 'text' },
    postImage: { control: 'text' },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A8345&node-id=3498-8346&viewport=398%2C317%2C0.52&t=cPIchSAqsFJlj3Gz-1&scaling=min-zoom",
    },
    tags: ["autodocs"],
  },
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: '1',
  profile: 'https://via.placeholder.com/42',
  username: 'John Doe',
  hour: 1,
  title: 'This is a title',
  description: 'This is a caption that might be quite long so it can be truncated.',
  postImage: 'https://via.placeholder.com/320',
  onLike: action('liked'),
  onSave: action('saved'),
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const likeButton = await canvas.getByRole('button', { name: /like/i });
  const saveButton = await canvas.getByRole('button', { name: /save/i });

  await userEvent.click(likeButton);
  await userEvent.click(saveButton);

  // Assert that the actions are called
  await expect(likeButton).toBeEnabled();
  await expect(saveButton).toBeEnabled();
};

export const NoImage = Template.bind({});
NoImage.args = {
  id: '2',
  profile: 'https://via.placeholder.com/42',
  username: 'Kim Lang',
  hour: 2,
  title: 'Another title',
  description: 'This is another caption with some more text to show the truncation effect in action.',
  onLike: action('liked'),
  onSave: action('saved'),
};

NoImage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const likeButton = await canvas.getByRole('button', { name: /like/i });
  const saveButton = await canvas.getByRole('button', { name: /save/i });

  await userEvent.click(likeButton);
  await userEvent.click(saveButton);

  // Assert that the actions are called
  await expect(likeButton).toBeEnabled();
  await expect(saveButton).toBeEnabled();
};

export const LongCaption = Template.bind({});
LongCaption.args = {
  id: '3',
  profile: 'https://via.placeholder.com/42',
  username: 'Sok Leng',
  hour: 3,
  title: 'Yet another title',
  description: 'This caption is very long and should be truncated when displayed. The full text includes more details and information that will be visible when the "See more" button is clicked. This caption is very long and should be truncated when displayed. The full text includes more details and information that will be visible when the "See more" button is clicked.',
  postImage: 'https://via.placeholder.com/320',
  onLike: action('liked'),
  onSave: action('saved'),
};

LongCaption.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const likeButton = await canvas.getByRole('button', { name: /like/i });
  const saveButton = await canvas.getByRole('button', { name: /save/i });

  await userEvent.click(likeButton);
  await userEvent.click(saveButton);

  // Assert that the actions are called
  await expect(likeButton).toBeEnabled();
  await expect(saveButton).toBeEnabled();
};
