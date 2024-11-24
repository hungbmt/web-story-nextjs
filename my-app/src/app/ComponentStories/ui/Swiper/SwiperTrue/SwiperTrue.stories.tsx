import type { Meta, StoryObj } from "@storybook/react";
import TopStory from "@/app/component/homeComponent/TopStory/TopStory";
const SwiperOneMeta: Meta<typeof TopStory> = {
  title: "Example/swipeOne",
  component: TopStory,
  tags: ["autodocs"],
  argTypes: {},
};

export default SwiperOneMeta;

type Story = StoryObj<typeof TopStory>;

export const DefaultSwiperTrue: Story = {
  args: {},
};
