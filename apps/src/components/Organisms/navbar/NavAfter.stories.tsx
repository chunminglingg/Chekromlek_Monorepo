import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import SearchInput from "@/components/Molecules/Search/SearchInput";
import NavAfter, { NavAfterProps } from "@/components/Organisms/navbar/NavAfter";
import { Logo, LogoProps } from "@/components/Atoms/Logo"; // Import LogoProps if defined

const AfterLogin = ({ name }) => <div>Welcome, {name}</div>;
const Burger = () => <div>Burger Menu</div>;

export default {
  title: "Organisms/navbar",
  component: NavAfter,
  parameters: {
    layout: 'left',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A7931&node-id=4156-2613&viewport=1479%2C479%2C0.85&t=e0iDKTScDqiiSHth-1&scaling=min-zoom',
    },
    tags: ['autodocs'],
  },
} as Meta;

const Template: StoryFn<NavAfterProps> = (args) => <NavAfter {...args} />;

export const Default = Template.bind({});
Default.args = {
  AfterLogin,
  Burger,
  Logo: Logo as React.FC<LogoProps>, // Ensure Logo is cast as React.FC<LogoProps>
  SearchInput: (props) => <SearchInput {...props} />, // Pass props if needed
};
