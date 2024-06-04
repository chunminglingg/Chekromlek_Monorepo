// src/components/SideRight.stories.tsx

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import SideRight from './SideRight';

export default {
  title: 'chekromlek/Components/Molecules/SideRight',
  component: SideRight,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A7931&node-id=4156-2613&viewport=1479%2C479%2C0.85&t=e0iDKTScDqiiSHth-1&scaling=min-zoom',
    },
    
  },tags: ["autodocs"],
} as Meta<typeof SideRight>;

const categories = [
  { name: 'Mathematic', href: '/categories/math' },
  { name: 'Physic', href: '/categories/physic' },
  { name: 'Khmer Writing', href: '/categories/khmer' },
  { name: 'Chemistry', href: '/categories/chemistry' },
  { name: 'Biology', href: '/categories/biology' },
  { name: 'History', href: '/categories/history' },
];

// Define a template for the component
const Template: StoryFn = (args) => <SideRight {...args} />;

// Default state story
export const Default = Template.bind({});
Default.args = {
  categories,
  hoverEffect: false,
};
Default.decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
];
Default.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText('Mathematic');
    await userEvent.hover(button);
    const button1 = canvas.getByText('Physic');
    await userEvent.hover(button1);
    const button2 = canvas.getByText('Khmer Writing');
    await userEvent.hover(button2);
    const button3 = canvas.getByText('Chemistry');
    await userEvent.hover(button3);
    const button4 = canvas.getByText('Biology');
    await userEvent.hover(button4);
    const button5 = canvas.getByText('History');
    await userEvent.hover(button5);
  };

