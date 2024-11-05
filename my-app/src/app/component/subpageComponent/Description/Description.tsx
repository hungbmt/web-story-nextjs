"use client";

import { typeGethome } from "@/type/story.type";
import "./Description.css";
import React from "react";

interface type {
  itemSubpage: typeGethome;
}

const Description: React.FC<type> = ({ itemSubpage }) => {
  return (
    <>
      <div className="desc-subpage">
        <h3>
          <i className="fa-solid fa-clipboard-list"></i> Mô tả:
        </h3>
        <div className="text-desc">
          <span
            dangerouslySetInnerHTML={{ __html: itemSubpage?.description }}
          ></span>
        </div>
      </div>
    </>
  );
};

export default Description;
