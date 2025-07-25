// import { useEffect, useState } from "react";
// import { deleteAdmin, getAllAdminsApi } from "../../../services/admin";
// import PageMeta from "../../components/common/PageMeta";
// import moment from 'moment';
// import AdminRegisterForm from "../../components/form/AdminRegisteredForm.tsx/AdminRegisterForm.tsx";
// import { useAuth } from "../../context/AuthContext.tsx";

// export default function BasicTables() {

//   const [adminsData, setAdminsData] = useState([]);
//   const [deleteAdminData, setDeleteAdminData] = useState({})
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1)
//   const { adminRegisterFormData } = useAuth();

//   useEffect(() => {
//     const getAllAdmins = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllAdminsApi(page, 10);
//         setLoading(false);
//         if (response) {
//           setAdminsData(response.data?.admins)
//         };

//         console.log("🚀 ~ getAllAdmins ~ response:", response.data);
//         return response;
//       } catch (error) {
//         setLoading(false);
//         console.log("🚀 ~ getAdminsList ~ error:", error)
//         throw error;
//       }
//     };
//     getAllAdmins()
//   }, [deleteAdminData, adminRegisterFormData])


//   const deleteSubAdmin = async (id: string) => {
//     try {
//       const response = await deleteAdmin(id);
//       setDeleteAdminData(response.data);
//       console.log("🚀 ~ deletAdmin ~ response:", response);
//       return response;
//     } catch (error) {
//       console.log("🚀 ~ delete ~ error:", error)
//       throw error;
//     }
//   };


//   return (
//     <>
//       <PageMeta
//         title="FameOflame"
//         description="This is FameOflame admin panel where admin can make CRUD operations to sub admins and incentives and Images gallery as well"
//       />

//       {/* <FormElements /> */}
//       <div className="grid grid-cols-1 gap-6 py-4">
//         <div className="space-y-6">

//           <AdminRegisterForm />

//           {/* <ComponentCard className="w-[100%]" title="Create Sub admin">
//             <div className="space-y-6 flex space-x-4  item-center ">
//               <div className="w-[33.5%]">
//                 <Label htmlFor="input">Name</Label>
//                 <Input type="text" id="input" />
//               </div>
//               <div className="w-[33.5%]">
//                 <Label htmlFor="inputTwo">Email</Label>
//                 <Input type="text" id="inputTwo" placeholder="info@gmail.com" />
//               </div>

//               <div className="w-[33.5%]">
//                 <Label>Password for sub admin</Label>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
//                   >
//                     {showPassword ? (
//                       <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                     ) : (
//                       <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
//                     )}
//                   </button>
//                 </div>
//               </div>

//             </div>

         
//             <div className="flex justify-end">
//               <Button className="w-[8%] flex items-center justify-center " size="sm" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <Spinner />
//                     saving...
//                   </>
//                 ) : (
//                   "Save"
//                 )}
//               </Button>
//             </div>



//           </ComponentCard> */}
//         </div>
//       </div>


//       <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
//         {/* Header */}
//         <div className="flex flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Sub Admins</h3>
//           </div>
//           {/* <div className="flex items-center gap-3">
//             <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            
//               <svg className="stroke-current fill-white dark:fill-gray-800" width="20" height="20" viewBox="0 0 20 20" fill="none">
//                 <path d="M2.29 5.904h15.417" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M17.708 14.096H2.291" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                 <path d="M12.083 3.333c1.42 0 2.571 1.151 2.571 2.571s-1.151 2.571-2.571 2.571S9.512 7.324 9.512 5.904 10.663 3.333 12.083 3.333z" strokeWidth="1.5" />
//                 <path d="M7.917 11.525c-1.42 0-2.571 1.151-2.571 2.571s1.151 2.571 2.571 2.571 2.571-1.151 2.571-2.571-1.151-2.571-2.571-2.571z" strokeWidth="1.5" />
//               </svg>
//               Filter
//             </button>
//             <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
//               See all
//             </button>
//           </div> */}
//         </div>

//         {/* Table */}
//         <div className="max-w-full overflow-x-auto">
//           <table className="min-w-full">
//             <thead className="px-6 py-3.5 border-y border-gray-100 bg-gray-50 dark:border-white/[0.05] dark:bg-gray-900">
//               <tr>
//                 <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Sub admin</td>
//                 <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Created Date</td>
//                 <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Role</td>
//                 <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Action</td>
//               </tr>
//             </thead>


//             <tbody>
//               {
//                 loading ? (
//                   <tr>
//                     <td colSpan={4}>
//                       <div className="w-10 h-10 mx-auto my-4 rounded-full bg-red-300 flex justify-center items-center">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   adminsData?.map((item: any, index: number) => (
//                     <tr key={index}>
//                       <td className="px-4 sm:px-6 py-3.5">
//                         <div className="flex items-center gap-3">
//                           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-100 text-error-600">
//                             <span className="text-sm font-medium">{item?.name[0].toUpperCase()}</span>
//                           </div>
//                           <div>
//                             <span className="block font-medium text-theme-sm text-gray-700 dark:text-gray-400">{item?.name}</span>
//                             <span className="text-theme-sm text-gray-500 dark:text-gray-400">{item?.email}</span>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-4 sm:px-6 py-3.5">
//                         <p className="text-theme-sm text-gray-700 dark:text-gray-400">
//                           {moment(item?.createdAt).format('YYYY-MM-DD')}
//                         </p>
//                       </td>

//                       <td className="px-4 sm:px-6 py-3.5">
//                         <p className="text-theme-sm text-gray-700 dark:text-gray-400">{item?.role}</p>
//                       </td>

//                       <td className="px-4 sm:px-6 py-3.5">
//                         <button
//                           onClick={() => deleteSubAdmin(item._id)}
//                         >
//                           <svg
//                             width="1em"
//                             height="1em"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             className="text-gray-700 cursor-pointer size-5 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M6.541 3.792c0-1.243 1.007-2.25 2.25-2.25h2.417c1.243 0 2.25 1.007 2.25 2.25V4.042h2.167h1.041a.75.75 0 010 1.5h-.291v10.667c0 1.243-1.008 2.25-2.25 2.25H5.875a2.25 2.25 0 01-2.25-2.25V5.542h-.291a.75.75 0 010-1.5h1.042h2.166V3.792z"
//                               fill="currentColor"
//                             />
//                           </svg>
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )
//               }
//             </tbody>

//           </table>
//         </div>
//       </div>

//     </>
//   );
// };