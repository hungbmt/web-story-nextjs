import type { Meta, StoryObj } from "@storybook/react";
import ListProductLoading from "./ListProductLoading";
import BookHomeUpdate from "@/app/component/homeComponent/BookHomeUpdata/BookHomeUpdata";

const ListProductMeta: Meta<typeof BookHomeUpdate> = {
  title: "Example/ListProduct",
  component: BookHomeUpdate,
  tags: ["autodocs"],
  argTypes: {},
};

export default ListProductMeta;

type Story = StoryObj<typeof BookHomeUpdate>;

export const Defaultlist: Story = {
  args: {},
};
