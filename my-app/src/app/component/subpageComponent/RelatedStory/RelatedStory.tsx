import { typeGethome } from "@/type/story.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./RelatedStory.css";

interface typeRelated {
  dataRelatedStory: typeGethome[]; // This should be an array
}

const RelatedStory: React.FC<typeRelated> = ({ dataRelatedStory }) => {
  const localhost = "http://localhost:3000/";
  return (
    <>
      {dataRelatedStory.map((data) => (
        <Link
          key={Number(data.id)}
          className="related-story-box"
          href={`/story/${data.id}`}
        >
          <div className="img-related">
            <Image
              width={50}
              height={50}
              alt={data.title} // Use data.title for the alt attribute
              src={localhost + data.imgStory}
              onError={(e) => (e.currentTarget.srcset = "/img/bannerStory.png")}
            />
          </div>

          <h3>{data.title}</h3>
        </Link>
      ))}
    </>
  );
};

export default RelatedStory;
