// components/Navbar.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Navbar from './NavBefore'

export default {
  title: 'chekromlek/Components/Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'left',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A8273&node-id=3498-8344&viewport=436%2C326%2C0.57&t=VUm4kRK4m6NCNR56-1&scaling=scale-down-width',
    },
    tags: ['autodocs'],
  },
} as Meta;

const Template: StoryFn = (args) => <Navbar {...args} />;

export const BeforeLogin = Template.bind({});
BeforeLogin.args = {};
