const DeleteIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.25 7.37498V10.9166" stroke="#F47521" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.08398 7.37498V10.9166" stroke="#F47521" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 3.83333H12.3333" stroke="#F47521" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.41602 5.95833V11.625C2.41602 12.7986 3.36741 13.75 4.54101 13.75H8.791C9.96464 13.75 10.916 12.7986 10.916 11.625V5.95833" stroke="#F47521" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.54102 2.41666C4.54102 1.63426 5.17528 1 5.95768 1H7.37434C8.15677 1 8.79101 1.63426 8.79101 2.41666V3.83333H4.54102V2.41666Z" stroke="#F47521" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
};

export default DeleteIcon;

// import { useEffect, useMemo, useRef, useState } from "react";
// import PageMeta from "../../components/common/PageMeta";
// import AddIncentiveForm from "../../components/form/AddIncentiveForm/AddIncentiveForm";
// import { AddIncentivesValues } from "../../interface";
// import { deleteIncentivesApi, getIncentivesApi, updateIncentiveApi } from "../../../services/incentives";
// import { AxiosError } from "axios";
// import { useAuth } from "../../context/AuthContext";
// import AccendingArrow from "../../components/svg/AccendingArrow";
// import DescendingArrow from "../../components/svg/DescendingArrow";
// import EditIcon from "../../components/svg/EditIcon";
// import { toast } from "react-toastify";
// import SearchBarIcon from "../../components/svg/SearchBarIcon";
// import FilterIcon from "../../components/svg/FilterIcon";
// import debounce from "lodash/debounce";
// import CustomCheckbox from "../../components/reusableComponents/CustomCheckBox";
// import ToggleSwitchButton from "../../components/reusableComponents/ToggleSwitchButton";
// import DeleteIcon from "../../components/svg/DeleteIcon";

// const Incentives = () => {
//   const [loading, setLoading] = useState(false);
//   const [incentivesData, setAddIncentivesData] = useState<AddIncentivesValues[]>([]);
//   const { addIncentivesFormData } = useAuth();
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [filterValue, setFilterValue] = useState("");
//   const [debouncedFilter, setDebouncedFilter] = useState("");
//   const [editData, setEditData] = useState<AddIncentivesValues | null>(null);
//   const [editLoading, setEditLoading] = useState(false);
//   const formRef = useRef<HTMLDivElement | null>(null);

//   const debouncedSearch = useMemo(
//     () => debounce((value: string) => setDebouncedFilter(value), 300),
//     []
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFilterValue(value);
//     debouncedSearch(value);
//   };

//   const handleCheckboxChange = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (selectedIds.length === filteredIncentives.length) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(filteredIncentives.map((item) => item._id));
//     }
//   };

//   const handleSort = (order: "asc" | "desc") => {
//     setSortOrder(order);
//   };

//   const handleEditClick = (item: AddIncentivesValues) => {
//     setEditData(item);
//     setTimeout(() => {
//       formRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   const handlerDeleteIncentives = async () => {
//     try {
//       const response = await deleteIncentivesApi(selectedIds);
//       await getIncentivesData();
//       toast.success("Deleted successfully!");
//       setSelectedIds([]);
//       return response;
//     } catch (err) {
//       toast.error("Error deleting incentives");
//     }
//   };

//   const handlerBulkUpdate = async (field: string, value: any) => {
//     try {
//       await Promise.all(
//         selectedIds.map((id) => updateIncentiveApi(id, { [field]: value }))
//       );
//       toast.success("Updated successfully!");
//       setSelectedIds([]);
//       getIncentivesData();
//     } catch (error) {
//       toast.error("Error updating incentives");
//     }
//   };

//   const handlerUpdateIncentives = async (id: string, values: AddIncentivesValues) => {
//     setEditLoading(true);
//     try {
//       const response = await updateIncentiveApi(id, values);
//       toast.success("Incentive updated successfully!");
//       setEditData(null);
//       setEditLoading(false);
//       getIncentivesData();
//       return response;
//     } catch (err) {
//       toast.error("Error updating incentive");
//       setEditLoading(false);
//     }
//   };

//   const getIncentivesData = async () => {
//     setLoading(true);
//     try {
//       const response = await getIncentivesApi();
//       let sortedData = [...(response?.incentivesData || [])];
//       sortedData.sort((a, b) => {
//         const timeA = new Date(a.createdAt).getTime();
//         const timeB = new Date(b.createdAt).getTime();
//         return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
//       });
//       setAddIncentivesData(sortedData);
//     } catch (error) {
//       const axiosError = error as AxiosError<{ message: string }>;
//       console.log("Error fetching incentives:", axiosError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getIncentivesData();
//   }, [addIncentivesFormData, sortOrder]);

//   useEffect(() => {
//     return () => {
//       debouncedSearch.cancel();
//     };
//   }, []);

//   const filteredIncentives = incentivesData.filter((item) => {
//     const searchText = debouncedFilter.toLowerCase().replace(/\s+/g, '');
//     const fields = [item.incentives, item.gender, item.incentivesMood, item.incentivesNature];
//     return fields.some(field => field.toLowerCase().replace(/\s+/g, '').includes(searchText));
//   });

//   return (
//     <>
//       <PageMeta title="FameOflame" description="FameOflame admin panel" />

//       <div className="w-[90%] mx-auto space-y-6">
//         <div ref={formRef}>
//           <AddIncentiveForm
//             editingData={editData}
//             onEditSubmit={(data) => editData && handlerUpdateIncentives(editData._id, data)}
//             editLoading={editLoading}
//           />
//         </div>

//         <div className="bg-[#FFF6EB] px-6 flex items-center justify-between py-4">
//           <div className="flex space-x-2">
//             <button type="button"><FilterIcon /></button>
//             <p className="text-black text-lg">Filter</p>
//           </div>

//           <div className="flex bg-red-300 items-center justify-center space-x-4">
//             <div className="flex-shrink-0 w-4/4 p-[2px] bg-gradient-to-r from-orange-600 to-orange-400">
//               <div className="flex items-center bg-white overflow-hidden">
//                 <input value={filterValue} onChange={handleInputChange} type="text" placeholder="Search" className="w-full px-4 py-2 focus:outline-none" />
//                 <button type="button" className="px-3 flex items-center justify-center"><SearchBarIcon /></button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold text-gray-800 mb-4">All Incentives</h3>
//           {selectedIds.length > 0 && (
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="text-gray-700">{selectedIds.length} Selected</span>
//               <button onClick={handleSelectAll} className="text-blue-600">Select All</button>
//               <button className="text-green-600">Export {selectedIds.length}</button>
//               <button onClick={() => handlerBulkUpdate("incentiveStatus", true)} className="text-orange-600">Activate All</button>
//               <button onClick={() => handlerBulkUpdate("gender", "Male")} className="text-purple-600">Edit Gender</button>
//               <button onClick={() => handlerBulkUpdate("incentivesMood", "Happy")} className="text-yellow-600">Edit Mood</button>
//               <button onClick={handlerDeleteIncentives} className="text-red-600">Delete All</button>
//             </div>
//           )}
//         </div>

//         <div className="relative border border-[#E0D4C4] overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4]">
//               <tr className="text-[#BB501C] text-sm font-semibold">
//                 <th className="px-4 py-3 w-28">
//                   <CustomCheckbox className="w-4 h-4" checked={selectedIds.length === filteredIncentives.length} onChange={handleSelectAll} />
//                 </th>
//                 <th className="px-4 py-3 w-12">Actions</th>
//                 <th className="px-4 py-3 w-64">
//                   <div className="flex items-center space-x-4">
//                     <span>Incentive</span>
//                     <div className="flex leading-none">
//                       <button type="button" onClick={() => handleSort("asc")}><AccendingArrow /></button>
//                       <button type="button" onClick={() => handleSort("desc")}><DescendingArrow /></button>
//                     </div>
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 w-40">Gender</th>
//                 <th className="px-4 py-3 w-60">Incentives Mood</th>
//                 <th className="px-4 py-3 w-40">Incentives Nature</th>
//                 <th className="px-4 py-3 w-40">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr><td colSpan={7}><div className="text-center py-4">Loading...</div></td></tr>
//               ) : filteredIncentives.length === 0 ? (
//                 <tr><td colSpan={7}><div className="text-center py-4">No Incentives Found</div></td></tr>
//               ) : (
//                 filteredIncentives.map((item) => (
//                   <tr key={item._id} className="border-b border-[#E0D4C4] text-sm text-gray-700">
//                     <td className="px-4 py-3">
//                       <CustomCheckbox className="w-4 h-4" checked={selectedIds.includes(item._id)} onChange={() => handleCheckboxChange(item._id)} />
//                     </td>
//                     <td className="px-4 py-3 space-x-2">
//                       <button onClick={handlerDeleteIncentives}><DeleteIcon /></button>
//                       <button onClick={() => handleEditClick(item)}><EditIcon /></button>
//                     </td>
//                     <td className="px-4 py-3"><p className="w-[250px] break-words">{item?.incentives}</p></td>
//                     <td className="px-4 py-3">{item?.gender}</td>
//                     <td className="px-4 py-3">{item?.incentivesMood}</td>
//                     <td className="px-4 py-3">{item?.incentivesNature}</td>
//                     <td className="px-4 py-3">
//                       <ToggleSwitchButton value={item?.incentiveStatus} />
//                     </td>
//                   </tr>

//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Incentives;
