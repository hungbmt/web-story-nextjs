import type { Meta, StoryObj } from "@storybook/react";
import InputText from "./InputText";

const inputTextMeta: Meta<typeof InputText> = {
  title: "Example/input",
  component: InputText,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    name: { control: "text" },
    icon: { control: "text" },
  },
};
export default inputTextMeta;
type Story = StoryObj<typeof InputText>;

export const inputText: Story = {
  args: {
    placeholder: "placeholder",
    name: "name",
    icon: "icon",
  },
};
