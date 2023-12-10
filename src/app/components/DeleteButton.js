// import React, { useState } from "react";

// const DeleteButton = ({ label, onDelete }) => {
//   const [showConfirm, setShowConfirm] = useState(false);

//   if (showConfirm) {
//     return (
//       <div className="flex gap-2">
//         <div>
//           <button
//             type="button"
//             className="m-2"
//             onClick={() => setShowConfirm(false)}
//           >
//             Cancel
//           </button>
//         </div>
//         <div>
//           <button type="button" className="primary">
//             Yes, Delete
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <button type="button" onClick={() => setShowConfirm(true)}>
//       {label}
//     </button>
//   );
// };

// export default DeleteButton;
