// Typography.stories.js

import React from 'react';
import { Typography } from './Typography'; // Assuming this is the path to your Typography component
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Typography>= {
  title: 'Typography',
  component: Typography,
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Default:Story ={
  args : {
  children: "Default_Typography",
  align:'center',
  fontSize:'bold'
}};

