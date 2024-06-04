import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import SearchInput from "@/components/Molecules/Search/SearchInput";
import NavAfter, { NavAfterProps } from "@/components/Organisms/navbar/NavAfter";
import { Logo, LogoProps } from "@/components/Atoms/Logo"; // Import LogoProps if defined

const AfterLogin = ({ name }) => <div>Welcome, {name}</div>;
const Burger = () => <div>Burger Menu</div>;

export default {
  title: "chekromlek/Components/Organisms/Navbar",
  component: NavAfter,
  parameters: {
    layout: 'left',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/proto/3bZbAhm0fbpqzRiPGP3uDO/Chekromlek?page-id=3498%3A8273&node-id=3498-8344&viewport=436%2C326%2C0.57&t=VUm4kRK4m6NCNR56-1&scaling=scale-down-width',
    },

  },    tags: ['autodocs'],
} as Meta;

const Template: StoryFn<NavAfterProps> = (args) => <NavAfter {...args} />;

export const afterLogin = Template.bind({});
afterLogin.args = {
  AfterLogin,
  Burger,
  Logo: Logo as React.FC<LogoProps>, // Ensure Logo is cast as React.FC<LogoProps>
  SearchInput: (props) => <SearchInput {...props} />, // Pass props if needed
};
