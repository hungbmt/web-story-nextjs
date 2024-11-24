import type { Meta, StoryObj } from "@storybook/react";
import Auth from "./AuthComponent";

const authMeta: Meta<typeof Auth> = {
  title: "Example/auth",
  component: Auth,
  tags: ["autodocs"],
  argTypes: {
    HandleSubmitAuth: { action: "submit" },
    HandleSubmitRegister: { action: "submit" },
  },
};
export default authMeta;
type Story = StoryObj<typeof Auth>;

export const auth: Story = {
  args: {
    HandleSubmitAuth: (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của submit form login
    },
    HandleSubmitRegister: (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của submit form đăng ký
    },
  },
};
