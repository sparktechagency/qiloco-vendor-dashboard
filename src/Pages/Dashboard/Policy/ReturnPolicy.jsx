import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { usePolicyQuery } from "../../../redux/apiSlices/policySlice";

function ReturnPolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("Return Policy");
  const { data: returnPolicy } = usePolicyQuery();

  // Set content when policy data is available
  useEffect(() => {
    if (returnPolicy?.data?.privacyPolicy) {
      setContent(returnPolicy.data.support);
    }
  }, [returnPolicy]); // Only run when `returnPolicy` changes

  const handleUpdate = (newContent) => {
    setContent(newContent);
  };

  const handleSave = () => {
    console.log(content); // Save logic should go here
    // Optionally, you can call an API to save the updated content.
  };

  return (
    <div className="px-3 py-4">
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={handleUpdate} // Changed from onChange to onBlur
        config={{
          theme: "dark",
          style: {
            background: "#000",
            color: "#ccc",
          },
          statusbar: false,
          showCharsCounter: false,
          showWordsCounter: false,
          toolbarAdaptive: true,
          toolbarSticky: true,
          enableDragAndDropFileToEditor: true,
          allowResizeX: false,
          allowResizeY: false,
          // Reduce button count to improve performance
          buttons: [
            "source",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "ul",
            "ol",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "table",
            "link",
            "|",
            "left",
            "center",
            "right",
            "justify",
            "|",
            "undo",
            "redo",
            "|",
            "hr",
            "eraser",
            "fullsize",
          ],
          // Add these performance settings
          useSearch: false,
          spellcheck: false,
          iframe: false,
        }}
      />
      <button
        className="w-full bg-quilocoD hover:bg-quilocoD/90 text-white text-[24px] rounded-lg h-12 my-4"
        onClick={() => console.log(content)}
      >
        Save
      </button>
    </div>
  );
}

export default ReturnPolicy;
