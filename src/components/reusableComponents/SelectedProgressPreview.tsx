// import { useFormikContext } from 'formik';
// import { useEffect } from 'react';


// const SelectedImagePreview = ({ selectedFile }: { selectedFile: File | null }) => {
//     const { setFieldValue } = useFormikContext<any>();
  
//     useEffect(() => {
//       if (selectedFile) {
//         setFieldValue('celebrityImage', selectedFile.name);
//       }
//     }, [selectedFile]);
  
//     if (!selectedFile) return null;
  
//     return (
//       <div className="mt-4 bg-white p-3 rounded border border-gray-300 shadow-sm">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img src="/images/imageIcon.png" alt="image" className="w-6 h-6" />
//             <div>
//               <p className="text-sm font-medium text-gray-800">{selectedFile.name}</p>
//               <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(1)}mb</p>
//             </div>
//           </div>
//           <button
//             onClick={() => setSelectedFile(null)}
//             className="bg-[#FF9B61] w-6 h-6 rounded flex justify-center items-center"
//           >
//             {/* Your SVG icon here */}
//           </button>
//         </div>
//       </div>
//     );
//   };
  

  