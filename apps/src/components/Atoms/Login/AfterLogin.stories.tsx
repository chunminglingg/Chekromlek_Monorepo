// AfterLogin.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import AfterLogin, { AfterLoginProps } from './AfterLogin';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
  title: 'chekromlek/Components/Atoms/AfterLogin',
  component: AfterLogin,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A7931&node-id=4156-2613&viewport=1479%2C479%2C0.85&t=e0iDKTScDqiiSHth-1&scaling=min-zoom',
    },
    tags: ['autodocs'],
  },
} as Meta;

const Template: StoryFn<AfterLoginProps> = (args) => <AfterLogin {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'John Doe',
};


Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.findByRole('button');
  await userEvent.click(button);

  // Verify that the dropdown opened
  await waitFor(() => {
    expect(canvas.getByText('Profile')).toBeInTheDocument();
    expect(canvas.getByText('Setting')).toBeInTheDocument();
    expect(canvas.getByText('LogOut')).toBeInTheDocument();
  });
};

