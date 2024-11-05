import { typeGethome } from "@/type/story.type";
import React, { useEffect, useState } from "react";
import { CKEditorConfig } from "@/Helper/CKEditor";

interface typeFont {
  nameForm: string;
  HandleSubmitCreateStory: (e: React.FormEvent<HTMLFormElement>) => void;
  HandleCloseFormCreate: () => void;
  HandleAddChapter: () => void;
  data: typeGethome | "";
  setDataDescription: React.Dispatch<React.SetStateAction<string>>;
}
const FormCreateStory: React.FC<typeFont> = ({
  nameForm,
  HandleSubmitCreateStory,
  HandleCloseFormCreate,
  HandleAddChapter,
  data,
  setDataDescription,
}) => {
  // Ensure data is of type object (typeGethome) before accessing properties
  const isDataObject = typeof data === "object";
  const [ArrayGenre, setArrayGenre] = useState<string[]>([]);
  const [dataArrayGenre, setDataArrayGenre] = useState<string[]>([]);

  useEffect(() => {
    const dataGenres = isDataObject ? JSON.stringify(data?.genres) : ""; // Convert to JSON string if it’s an object
    try {
      const parsedGenres = dataGenres ? JSON.parse(dataGenres) : [];
      setArrayGenre(parsedGenres);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      setArrayGenre([]); // Set to empty array on error
    }
  }, [data, isDataObject]);
  useEffect(() => {
    if (isDataObject && ArrayGenre) {
      try {
        const parsedGenres = JSON.parse(ArrayGenre);
        setDataArrayGenre(parsedGenres);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        setDataArrayGenre([]); // Set to empty array on error
      }
    }
  }, [ArrayGenre, isDataObject]);
  console.log();
  const dataARrr = dataArrayGenre.map((data) => data?.genres);
  return (
    <>
      <form className="form-create-story" onSubmit={HandleSubmitCreateStory}>
        <div className="close-font" onClick={HandleCloseFormCreate}>
          <span>x</span>
        </div>
        <div className="title-joint">
          <span>{nameForm}</span>
        </div>
        <input
          type="text"
          placeholder="title"
          defaultValue={isDataObject ? data?.title : ""}
          name="title"
        />
        <input
          type="text"
          placeholder="author"
          defaultValue={isDataObject ? data?.author : ""}
          name="author"
        />
        <input
          type="text"
          placeholder="genres"
          defaultValue={isDataObject ? dataARrr : ""}
          name="genres"
        />
        <input
          type="text"
          placeholder="statusStory"
          defaultValue={isDataObject ? data?.statusStory : ""}
          name="statusStory"
        />
        <input
          type="text"
          placeholder="source"
          defaultValue={isDataObject ? data?.source : ""}
          name="source"
        />
        <div className={"description-join"}>
          <CKEditorConfig
            data={isDataObject ? data?.description : ""}
            text={setDataDescription}
          />
        </div>

        <input
          type="text"
          placeholder="imgStory"
          defaultValue={isDataObject ? data?.imgStory : ""}
          name="imgStory"
        />

        <button className="btn-submit" onClick={HandleAddChapter}>
          Next
        </button>
      </form>
    </>
  );
};

export default FormCreateStory;
