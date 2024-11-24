import { SubmitIcon } from "../icon/icon";
import Button from "./Button";
import type { Meta, StoryObj } from "@storybook/react";
import { withKnobs, text } from "@storybook/addon-knobs";
// Cấu hình meta cho Storybook
const meta: Meta<typeof Button> = {
  title: "Example/Button", // Đặt tên cho story trên sidebar
  component: Button,
  tags: ["autodocs"], // Tự động tạo tài liệu
  argTypes: {
    label: { control: "text" },
    icon: {
      control: "select",
      options: ["none", "submitIcon", "checkIcon"],
      mapping: {
        none: null,
        submitIcon: <SubmitIcon />,
      },
    },
    backgroundColor: { control: "color" },
    colorspan: { control: "color" },
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"], // Các tùy chọn cho prop size
      },
    },
    onClick: { action: "clicked" }, // Ghi lại sự kiện click
  },
};

export default meta;

// Định nghĩa kiểu Story cho CSF3
type Story = StoryObj<typeof Button>;

// Story chính: Primary
export const DefaultBtn: Story = {
  args: {
    label: "Click me",
    backgroundColor: "rgba(24, 26, 28, 1)",
    size: "medium",
  },
};
export const Submit: Story = {
  args: {
    label: "Submit",
    backgroundColor: "rgba(36, 228, 21, 1)",
    size: "medium",
    icon: "submitIcon",
    colorspan: "#a07979",
  },
};
