import React, { useState } from "react";
import "./FormAddChapter.css";
interface typeAddChapter {
  HandleSubmitAddChapter: (
    e: React.FormEvent<HTMLFormElement>,
    slug_1: any,
    slug1: any
  ) => void;
  HandleCloseFormAddChapter: () => void;
  dataChapterStory: any;
  setTextContent: any;
}

import { CKEditorConfig } from "@/Helper/CKEditor";
const FormAddChapter: React.FC<typeAddChapter> = ({
  HandleSubmitAddChapter,
  HandleCloseFormAddChapter,
  dataChapterStory,
  setTextContent,
}) => {
  return (
    <form
      className="form-create-story"
      style={{ height: "96%" }}
      onSubmit={(e) =>
        HandleSubmitAddChapter(
          e,
          dataChapterStory.slug,
          dataChapterStory.slug_1
        )
      }
    >
      <div className="close-font" onClick={HandleCloseFormAddChapter}>
        <span>x</span>
      </div>
      <div className="title-joint">
        <span>add chapter</span>
      </div>
      <input
        type="text"
        defaultValue={dataChapterStory?.title || ""}
        placeholder="title"
        name="title"
      />
      <input
        type="text"
        defaultValue={dataChapterStory?.number_chapter || ""}
        placeholder="số chapter"
        name="number_chapter"
      />
      <input
        type="text"
        defaultValue={dataChapterStory?.name_chapter || ""}
        placeholder="name chapter"
        name="name_chapter"
      />
      <div className={"content-join"}>
        <CKEditorConfig
          data={dataChapterStory?.content}
          text={setTextContent}
        />
      </div>
      <button className="btn-submit" type="submit">
        submit
      </button>
    </form>
  );
};

export default FormAddChapter;
