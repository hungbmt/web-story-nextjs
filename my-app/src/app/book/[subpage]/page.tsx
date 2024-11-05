import type { Metadata, ResolvingMetadata } from "next";
import "./subpage.css";
import DefaulrLayout from "@/app/layout/defaultLayout/DefaulrLayout";
import SubpagePage from "./subpage";
type Props = {
  params: { subpage: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const subpage = params.subpage;
  let data;

  // fetch data
  try {
    const response = await fetch(
      `http://localhost:3000/api/v2/subpage/${subpage}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    data = await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    // You might want to return some default metadata or throw an error
  }
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: data?.data?.title,
    description: data.data.description,
    openGraph: {
      title: data?.data?.title,
      description: data?.data?.description,
      images: [data?.data?.imgStory, ...previousImages],
    },
  };
}
export default function Subpage() {
  return (
    <DefaulrLayout>
      <div className="subpage-wrapper">
        <SubpagePage />
      </div>
    </DefaulrLayout>
  );
}
