import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import React from "react";

export const CKEditorConfig = ({ data, text }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={data || "<p>Bắt đầu viết ở đây...</p>"}
      // onReady={(editor) => {
      //   console.log("Editor is ready to use!", editor);
      // }}
      onChange={(event, editor) => {
        const editorData = editor.getData();
        if (typeof text === "function") {
          text(editorData); // Only call text if it is a function
        } else {
          console.error("text is not a function");
        }
      }}
    />
  );
};
