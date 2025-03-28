import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  usePolicyQuery,
  useUpdatePolicyMutation,
} from "../../../redux/apiSlices/policySlice";
import Loading from "../../../components/common/Loading";

function PrivacyPolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("Privacy Policy");

  // Fetch policy data
  const { data: policyData, isLoading } = usePolicyQuery();

  // Set initial content when policy data loads
  useEffect(() => {
    if (policyData?.data?.privacyPolicy) {
      setContent(policyData.data.privacyPolicy);
    }
  }, [policyData]);

  if (isLoading) return <Loading />; // Fixed missing return
  return (
    <div className="px-3 py-4">
      {/* <JoditEditor
        ref={editor}
        value={content}
        onBlur={handleUpdate} // Update state on blur
        config={{
          theme: "dark",
          style: {
            background: "#000",
            color: "#ccc",
          },
          showCharsCounter: false,
          showWordsCounter: false,
          toolbarAdaptive: true,
          toolbarSticky: true,
          enableDragAndDropFileToEditor: true,
          allowResizeX: false,
          allowResizeY: false,
          statusbar: false,
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
          useSearch: false,
          spellcheck: false,
          iframe: false,
        }}
      /> */}
      {/* <button
        className="w-full bg-quilocoD hover:bg-quilocoD/90 text-white text-[24px] rounded-lg h-12 my-4"
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button> */}
      <div className="px-3 py-4">
        <div
          // className="policy-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {/* {content} */}
      </div>
      );
    </div>
  );
}

export default PrivacyPolicy;
