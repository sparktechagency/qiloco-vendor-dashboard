// import React, { useEffect, useRef, useState } from "react";
// import JoditEditor from "jodit-react";
// import {
//   usePolicyQuery,
//   useUpdatePolicyMutation,
// } from "../../../redux/apiSlices/policySlice";

// function ReturnPolicy() {
//   const editor = useRef(null);
//   const [content, setContent] = useState("Return Policy");

//   // Fetch return policy data
//   const { data: policyData } = usePolicyQuery();

//   // Set initial content when policy data loads
//   useEffect(() => {
//     if (policyData?.data?.termsOfService) {
//       setContent(policyData.data.termsOfService);
//     }
//   }, [policyData]);

//   // Update state when editor content changes

//   // Handle save functionality

//   return (
//     <div className="px-3 py-4">
//       {/* <JoditEditor
//         ref={editor}
//         value={content}
//         onBlur={handleUpdate} // Update state on blur
//         config={{
//           theme: "dark",
//           style: {
//             background: "#000",
//             color: "#ccc",
//           },
//           statusbar: false,
//           showCharsCounter: false,
//           showWordsCounter: false,
//           toolbarAdaptive: true,
//           toolbarSticky: true,
//           enableDragAndDropFileToEditor: true,
//           allowResizeX: false,
//           allowResizeY: false,
//           buttons: [
//             "source",
//             "|",
//             "bold",
//             "italic",
//             "underline",
//             "|",
//             "ul",
//             "ol",
//             "|",
//             "font",
//             "fontsize",
//             "brush",
//             "paragraph",
//             "|",
//             "image",
//             "table",
//             "link",
//             "|",
//             "left",
//             "center",
//             "right",
//             "justify",
//             "|",
//             "undo",
//             "redo",
//             "|",
//             "hr",
//             "eraser",
//             "fullsize",
//           ],
//           useSearch: false,
//           spellcheck: false,
//           iframe: false,
//         }}
//       /> */}
//       {/* <button
//         className="w-full bg-quilocoD hover:bg-quilocoD/90 text-white text-[24px] rounded-lg h-12 my-4"
//         onClick={handleSave}
//         disabled={isLoading}
//       >
//         {isLoading ? "Saving..." : "Save"}
//       </button> */}
//       <p>{policyData}</p>
//     </div>
//   );
// }

// export default ReturnPolicy;

import React, { useEffect, useState } from "react";
import { usePolicyQuery } from "../../../redux/apiSlices/policySlice";

function ReturnPolicy() {
  const [content, setContent] = useState("Return Policy");

  // Fetch return policy data
  const { data: policyData } = usePolicyQuery();

  // Set initial content when policy data loads
  useEffect(() => {
    if (policyData?.data?.termsOfService) {
      setContent(policyData.data.termsOfService);
    }
  }, [policyData]);

  return (
    <div className="px-3 py-4">
      <div
        className="policy-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {/* {content} */}
    </div>
  );
}

export default ReturnPolicy;
