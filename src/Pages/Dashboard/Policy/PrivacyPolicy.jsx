import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import {
  usePolicyQuery,
  useUpdatePolicyMutation,
} from "../../../redux/apiSlices/policySlice";

function PrivacyPolicy() {
  const editor = useRef(null);
  const [content, setContent] = useState("Privacy Policy");

  // Fetch the policy data using usePolicyQuery hook
  const { data: policyData } = usePolicyQuery();

  // Mutation hook to update the policy
  const [updatePolicy] = useUpdatePolicyMutation();

  // Set content when policy data is available
  useEffect(() => {
    if (policyData?.data?.privacyPolicy) {
      setContent(policyData.data.privacyPolicy);
    }
  }, [policyData]); // Only run when `policyData` changes

  const handleUpdate = (newContent) => {
    setContent(newContent);
  };

  const handleSave = async () => {
    try {
      const updatedData = { privacyPolicy: content };
      // Call the updatePolicy mutation with the new content
      const response = await updatePolicy({
        id: policyData?.data?.id,
        updatedData,
      }).unwrap();
      console.log(response);
      // Handle success or failure
      if (response.success) {
        console.log("Policy updated successfully");
      } else {
        console.error("Failed to update policy");
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <div className="px-3 py-4">
      <JoditEditor
        ref={editor}
        value={content}
        onBlur={handleUpdate} // Update content on blur
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
          useSearch: false,
          spellcheck: false,
          iframe: false,
        }}
      />
      <button
        className="w-full bg-quilocoD hover:bg-quilocoD/90 text-white text-[24px] rounded-lg h-12 my-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}

export default PrivacyPolicy;
