// Typography.stories.js

import React, { Children } from 'react';
import { Typography } from './Typography'; // Assuming this is the path to your Typography component
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Typography>= {
  title: 'chekromlek/Components/Atoms/Typography',
  component: Typography,
  parameters: {
    // layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3479%3A5860&node-id=3479-5861&viewport=451%2C288%2C0.35&t=DSSBfsG8eEnDygIp-1&scaling=min-zoom",
    },
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Typography>;

export const Default:Story ={
  args : {
  children: "Typography",
  align:'center',
  fontSize:'normal'
}
};
export const Inter:Story = {
  args : {
  children: "Typography",
  align:'center',
  fontSize:'normal',
  Inter: "inter 16"
}
};
export const Mulish:Story = {
  args : {
  children: "Typography",
  align:'center',
  fontSize:'normal',
  Mulish:"Regular 4"
}
};

