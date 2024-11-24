import type { Meta, StoryObj } from "@storybook/react";
import GimStory from "@/app/component/homeComponent/GimStory/GimStory";
const SwiperOneMeta: Meta<typeof GimStory> = {
  title: "Example/swipeOne",
  component: GimStory,
  tags: ["autodocs"],
  argTypes: {
    slidesPerView320: { control: "number" },
    slidesPerView480: { control: "number" },
    slidesPerView993: { control: "number" },
  },
};

export default SwiperOneMeta;

type Story = StoryObj<typeof GimStory>;

export const DefaultGimStory: Story = {
  args: {
    slidesPerView320: 2,
    slidesPerView480: 2,
    slidesPerView993: 3,
  },
};
