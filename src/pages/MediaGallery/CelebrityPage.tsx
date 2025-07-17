// import { useEffect, useMemo, useRef, useState, useCallback } from "react";
// import PageMeta from "../../components/common/PageMeta";
// import { CelebritiesValuesSchema } from "../../interface";
// import {
//   deleteCelebritiesApi,
//   exportSelectedCelebritiesApi,
//   getCelebritiesApi,
//   updateCelebrityApi,
// } from "../../../services/celebrities";
// import { AxiosError } from "axios";
// import { useAuth } from "../../context/AuthContext";
// import AccendingArrow from "../../components/svg/AccendingArrow";
// import DescendingArrow from "../../components/svg/DescendingArrow";
// import EditIcon from "../../components/svg/EditIcon";
// import DeleteIcon from "../../components/svg/DeleteIcon";
// import TrashIcon from "../../components/svg/TrashIcon";
// import SearchBarIcon from "../../components/svg/SearchBarIcon";
// import CustomCheckbox from "../../components/reusableComponents/CustomCheckBox";
// import ToggleSwitchButton from "../../components/reusableComponents/ToggleSwitchButton";
// import debounce from "lodash/debounce";
// import { toast } from "react-toastify";
// import FilterDropdown from "../../components/input/FilterDropDown";
// import { genderOptions, professionOptions } from "../../data";
// import CustomPaginationItem from "../../components/reusableComponents/CustomPaginationIcon";
// import AddCelebrityForm from "../../components/form/addCelebrity-form/AddCelebrityForm";

// const CelebrityPage = () => {
//   const { addIncentivesFormData } = useAuth();
//   const formRef = useRef<HTMLDivElement | null>(null);

//   const [celebrities, setCelebrities] = useState<CelebritiesValuesSchema[]>([]);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   console.log("🚀 ~ CelebrityPage ~ selectedIds:", selectedIds)
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [loading, setLoading] = useState(false);
//   const [editLoading, setEditLoading] = useState(false);
//   const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [editData, setEditData] = useState<CelebritiesValuesSchema | null>(null);
//   const [isBulkActive, setIsBulkActive] = useState(false);
//   const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
//   const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
//   const [genderFilter, setGenderFilter] = useState("");
//   const [professionFilter, setProfessionFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const filtered = useMemo(() => {
//     return celebrities.filter(item => {
//       console.log("🚀 ~ filtered ~ item:", item)
//       console.log("🚀 ~ filtered ~ celebrities:", celebrities)
//       const text = filter.toLowerCase().replace(/\s+/g, "");
//       const matchesText = [item.celebrityName, item.celebrityGender, item.celebrityProfession]
//         .some(field => field.toLowerCase().replace(/\s+/g, "").includes(text));
//       const matchesGender = genderFilter ? item.celebrityGender === genderFilter : true;
//       const matchesProfession = professionFilter ? item.celebrityProfession === professionFilter : true;
//       const matchesStatus = statusFilter
//         ? (statusFilter === "Active" ? item.celebrityStatus : !item.celebrityStatus)
//         : true;
//       return matchesText && matchesGender && matchesProfession && matchesStatus;
//     });
//   }, [celebrities, filter, genderFilter, professionFilter, statusFilter]);

//   const debouncedSearch = useMemo(() => debounce(setFilter, 300), []);

//   const toggleAccordion = useCallback((key: string) => {
//     setActiveAccordion(prev => (prev === key ? null : key));
//   }, []);

//   const toggleAccordionEdit = useCallback((key: string) => {
//     if (editData) {
//       setActiveAccordion(key);
//       return;
//     }
//     setActiveAccordion(prev => (prev === key ? null : key));
//   }, [editData]);

//   const fetchCelebrities = useCallback(async (page = currentPage) => {
//     setLoading(true);
//     try {
//       const res = await getCelebritiesApi(page, 50);
//       const transformedDocs = res?.docs.map((doc: any) => ({
//         _id: doc._id,
//         celebrityImage: doc.images?.[0] || null,
//         celebrityName: doc.celebrityName,
//         celebrityGender: doc.celebrityGender,
//         celebrityProfession: doc.celebrityProfession,
//         celebrityStatus: doc.celebrityStatus,
//         createdAt: doc.createdAt,
//       })) || [];
//       const sorted = transformedDocs.sort((a: CelebritiesValuesSchema, b: CelebritiesValuesSchema) => {
//         const timeA = new Date(a.createdAt!).getTime();
//         const timeB = new Date(b.createdAt!).getTime();
//         return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
//       });

//       setCelebrities(sorted);
//       setTotalPages(res.totalPages || 1);
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Fetch Error:", error);
//       toast.error("Error fetching celebrities");
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, sortOrder]);

//   useEffect(() => {
//     fetchCelebrities();
//   }, [addIncentivesFormData, sortOrder, currentPage, fetchCelebrities]);

//   useEffect(() => {
//     const initialMap: Record<string, boolean> = {};
//     celebrities.forEach(item => (initialMap[item._id!] = item.celebrityStatus));
//     setStatusMap(initialMap);
//   }, [celebrities]);



//   useEffect(() => {
//     return () => debouncedSearch.cancel();
//   }, [debouncedSearch]);

//   const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(e.target.value);
//     debouncedSearch(e.target.value);
//   }, [debouncedSearch]);

//   const handleSelectAll = useCallback(() => {
//     setSelectedIds(prev => prev.length === filtered.length ? [] : filtered.map(item => item._id!));
//   }, [filtered]);

//   const handleEditClick = useCallback((item: CelebritiesValuesSchema) => {
//     setEditData(item);
//     toggleAccordionEdit("addnew");
//     setTimeout(() => {
//       formRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   }, [toggleAccordionEdit]);




//   const handlerUpdateCelebrity = useCallback(async (data: CelebritiesValuesSchema) => {
//     if (!editData?._id) return;
//     setEditLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append(
//         "entries",
//         JSON.stringify({
//           celebrityName: data.celebrityName,
//           celebrityGender: data.celebrityGender,
//           celebrityProfession: data.celebrityProfession,
//           celebrityStatus: data.celebrityStatus,
//         })
//       );

//       await updateCelebrityApi(editData._id, formData);
//       toast.success("Celebrity updated successfully!");
//       setEditData(null);
//       fetchCelebrities();
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Update Error:", error);
//       toast.error("Error updating celebrity");
//     } finally {
//       setEditLoading(false);
//     }
//   }, [editData, fetchCelebrities]);



//   const handleDelete = useCallback(async (id?: string) => {
//     setDeleteLoadingId(id ? id : null);
//     try {
//       await deleteCelebritiesApi(id ? [id] : selectedIds);
//       toast.success("Celebrity deleted successfully!");
//       setSelectedIds([]);
//       fetchCelebrities();
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Delete Error:", error);
//       toast.error("Error deleting celebrities");
//     } finally {
//       setDeleteLoadingId(null);
//     }
//   }, [selectedIds, fetchCelebrities]);


//   const handleDeleteAll = useCallback(async () => {
//     setLoadingDeleteAll(true);
//     try {
//       await deleteCelebritiesApi([]);
//       toast.success("All celebrities deleted");
//       fetchCelebrities();
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Delete All Error:", error);
//       toast.error("Failed to delete all celebrities");
//     } finally {
//       setLoadingDeleteAll(false);
//     }
//   }, [fetchCelebrities]);



//   const handleStatusToggle = useCallback(async (id: string) => {
//     const current = statusMap[id];
//     setStatusMap(prev => ({ ...prev, [id]: !current }));
//     try {
//       const formData = new FormData();
//       formData.append(
//         "entries",
//         JSON.stringify({
//           celebrityStatus: !current,
//         })
//       );
//       await updateCelebrityApi(id, formData);
//       toast.success("Status updated");
//       fetchCelebrities();
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Status Update Error:", error);
//       toast.error("Error updating status");
//       setStatusMap(prev => ({ ...prev, [id]: current }));
//     }
//   }, [statusMap, fetchCelebrities]);

//   const handleBulkToggle = useCallback(async () => {
//     const newStatus = !isBulkActive;
//     setIsBulkActive(newStatus);
//     try {
//       await Promise.all(
//         selectedIds.map(id => {
//           const formData = new FormData();
//           formData.append(
//             "entries",
//             JSON.stringify({
//               celebrityStatus: newStatus,
//             })
//           );
//           return updateCelebrityApi(id, formData);
//         })
//       );
//       toast.success("Bulk status updated");
//       setStatusMap(prev => {
//         const newMap = { ...prev };
//         selectedIds.forEach(id => (newMap[id] = newStatus));
//         return newMap;
//       });
//       fetchCelebrities();
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Bulk Status Update Error:", error);
//       toast.error("Error updating bulk status");
//       setIsBulkActive(!newStatus);
//     }
//   }, [isBulkActive, selectedIds, fetchCelebrities]);

//   const exportSelectedCelebrities = useCallback(async (ids: string[]) => {
//     if (!ids || ids.length === 0) {
//       toast.warning("Please select at least one celebrity to export.");
//       return;
//     }
//     try {
//       const response = await exportSelectedCelebritiesApi(ids);
//       if (!response || response.size === 0) {
//         toast.warning("Exported file is empty.");
//         return;
//       }
//       toast.success("CSV file downloaded successfully!");
//     } catch (err) {
//       const error = err as AxiosError;
//       console.error("Export Error:", error);
//       toast.error("Something went wrong");
//     }
//   }, []);

//   const clearAllFilters = useCallback(() => {
//     setFilter("");
//     setGenderFilter("");
//     setProfessionFilter("");
//     setStatusFilter("");
//   }, []);

//   const getPaginationRange = useCallback((totalPages: number, currentPage: number): (number | "...")[] => {
//     if (totalPages <= 1) {
//       return totalPages === 0 ? [] : [1];
//     }
//     const delta = 1;
//     const range: number[] = [];
//     const rangeWithDots: (number | "...")[] = [];
//     let lastPage: number | undefined;

//     for (let i = 1; i <= totalPages; i++) {
//       if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
//         range.push(i);
//       }
//     }

//     for (let page of range) {
//       if (lastPage) {
//         if (page - lastPage === 2) {
//           rangeWithDots.push(lastPage + 1);
//         } else if (page - lastPage > 2) {
//           rangeWithDots.push("...");
//         }
//       }
//       rangeWithDots.push(page);
//       lastPage = page;
//     }

//     return rangeWithDots;
//   }, []);

//   const paginationRange = useMemo(() => getPaginationRange(totalPages, currentPage), [totalPages, currentPage, getPaginationRange]);

//   const goToPage = useCallback((page: number) => {
//     setCurrentPage(page);
//     fetchCelebrities(page);
//   }, [fetchCelebrities]);

//   const goToPrevious = useCallback(() => {
//     if (currentPage > 1) {
//       setCurrentPage(prev => prev - 1);
//       fetchCelebrities(currentPage - 1);
//     }
//   }, [currentPage, fetchCelebrities]);

//   const goToNext = useCallback(() => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prev => prev + 1);
//       fetchCelebrities(currentPage + 1);
//     }
//   }, [currentPage, totalPages, fetchCelebrities]);

//   return (
//     <>
//       <PageMeta title="FameOflame" description="FameOflame admin panel" />
//         <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
//         <div ref={formRef}>
//           <AddCelebrityForm
//             editingData={editData}
//             onEditSubmit={handlerUpdateCelebrity}
//             editLoading={editLoading}
//             setEditData={setEditData}
//             fetchCelebrities={fetchCelebrities}
//             activeAccordion={activeAccordion}
//             setActiveAccordion={setActiveAccordion}
//             toggleAccordion={toggleAccordion}
//           />
//         </div>

//         <div className="bg-[#FFF6EB] px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
//           <p className="text-black text-base sm:text-lg font-medium">Filter</p>
//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//             {(filter || genderFilter || professionFilter || statusFilter) && (
//               <button
//                 onClick={clearAllFilters}
//                 className="text-[#665F56] underline text-sm hover:text-orange-700 transition-colors flex items-center gap-1"
//               >
//                 Clear All Filters
//               </button>
//             )}
//             <div className="border-2 border-orange-400 bg-white flex items-center w-full sm:w-64">
//               <input
//                 value={filter}
//                 onChange={handleInputChange}
//                 type="text"
//                 placeholder="Search"
//                 className="w-full px-4 py-2 focus:outline-none placeholder:text-gray-500 text-sm"
//               />
//               <button type="button" className="px-3 py-2 text-orange-500">
//                 <SearchBarIcon />
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <FilterDropdown
//                 name="genderFilter"
//                 values={genderFilter}
//                 onSelect={setGenderFilter}
//                 options={genderOptions}
//                 placeholder="Select Gender"
//                 buttonClassName="w-full sm:w-32 text-sm"
//               />
//               <FilterDropdown
//                 name="professionFilter"
//                 values={professionFilter}
//                 onSelect={setProfessionFilter}
//                 options={professionOptions}
//                 placeholder="Select Profession"
//                 buttonClassName="w-full sm:w-32 text-sm"
//               />
//               <FilterDropdown
//                 name="statusFilter"
//                 values={statusFilter}
//                 onSelect={setStatusFilter}
//                 options={["Active", "Inactive"]}
//                 placeholder="Select Status"
//                 buttonClassName="w-full sm:w-32 text-sm"
//               />
//               <button className="w-10 h-10 flex items-center justify-center">
//                 <img src="./images/svgs/dotsmenu.svg" alt="Menu" />
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
//           <h3 className="text-base sm:text-lg font-semibold text-gray-800 w-full sm:w-40 mb-2 sm:mb-0">All Celebrities</h3>
//           {selectedIds.length > 0 && (
//             <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
//               <div className="flex items-center space-x-3">
//                 <p className="text-[#847E76] text-sm">{selectedIds.length} Record{selectedIds.length > 1 ? 's' : ''} Selected</p>
//                 <div className="w-px h-5 bg-[#E0D4C4]" />
//                 <button onClick={handleSelectAll} className="bg-[#fde3d3] px-2 py-1 rounded text-[#F47521] text-xs font-medium">
//                   {selectedIds.length === filtered.length ? 'Unselect All' : 'Select All'}
//                 </button>
//                 <button
//                   onClick={() => exportSelectedCelebrities(selectedIds)}
//                   className="bg-[#dcfcd3] px-2 py-1 rounded text-[#43B925] text-xs font-medium"
//                 >
//                   Export {selectedIds.length}
//                 </button>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <ToggleSwitchButton
//                   value={isBulkActive}
//                   onChange={handleBulkToggle}
//                   label="Active"
//                   className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
//                   classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
//                 />
//                 <div className="w-px h-5 bg-[#E0D4C4]" />
//                 <button
//                   onClick={handleDeleteAll}
//                   disabled={loadingDeleteAll}
//                   className={`flex gap-2 items-center px-2 py-1 rounded ${loadingDeleteAll ? 'opacity-60 cursor-not-allowed' : ''}`}
//                 >
//                   <div className="bg-[#EF2222] w-6 h-6 flex justify-center items-center rounded">
//                     {loadingDeleteAll ? (
//                       <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
//                         <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
//                       </svg>
//                     ) : <TrashIcon />}
//                   </div>
//                   <p className="text-[#F47521] text-xs font-medium">{loadingDeleteAll ? 'Deleting...' : 'Delete All'}</p>
//                 </button>


//               </div>
//             </div>
//           )}
//         </div>

//         <div className="relative border border-[#E0D4C4] min-h-[200px] h-[400px] overflow-y-auto">
//           <table className="w-full text-left border-collapse hidden sm:table">
//             <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4] sticky top-0 z-10">
//               <tr className="text-[#BB501C] text-sm font-semibold">
//                 <th className="px-4 py-3 w-20 sm:w-28">
//                   <CustomCheckbox className="w-4 h-4" checked={selectedIds.length === filtered.length} onChange={handleSelectAll} />
//                 </th>
//                 <th className="px-4 py-3 w-12">Actions</th>
//                 <th className="px-4 py-3 w-40 sm:w-64">
//                   <div className="flex items-center space-x-4">
//                     <span>Celebrity Image</span>
//                     <div className="flex">
//                       <button onClick={() => setSortOrder("asc")}> <AccendingArrow /> </button>
//                       <button onClick={() => setSortOrder("desc")}> <DescendingArrow /> </button>
//                     </div>
//                   </div>
//                 </th>
//                 <th className="px-4 py-3 w-24 sm:w-40">Celebrity Name</th>
//                 <th className="px-4 py-3 w-32 sm:w-60">Gender</th>
//                 <th className="px-4 py-3 w-24 sm:w-40">Profession</th>
//                 <th className="px-4 py-3 w-24 sm:w-40">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan={7}>
//                     <div className="flex justify-center items-center py-6 h-[400px]">
//                       <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={7}>
//                     <div className="flex flex-col items-center justify-center h-[400px] space-y-2">
//                       <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
//                       </svg>
//                       <p className="text-base text-gray-500">No Celebrities Found</p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((item) => (
//                   <tr key={item._id} className="border-b border-[#E0D4C4] text-sm text-gray-700">
//                     <td className="px-4 py-3">
//                       <CustomCheckbox className="w-4 h-4" checked={selectedIds.includes(item._id!)} onChange={() => setSelectedIds(prev => prev.includes(item._id!) ? prev.filter(i => i !== item._id!) : [...prev, item._id!])} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-4 items-center">
//                         <button onClick={() => handleDelete(item._id)} className="w-5 h-5 flex items-center justify-center">
//                           {deleteLoadingId === item._id ? (
//                             <svg className="animate-spin w-5 h-5 text-[#EB6622]" viewBox="0 0 24 24" fill="none">
//                               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
//                               <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
//                             </svg>
//                           ) : <DeleteIcon />}
//                         </button>
//                         <button onClick={() => handleEditClick(item)}>
//                           <EditIcon />
//                         </button>
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.celebrityImage?.url ? (
//                         <img
//                           src={item.celebrityImage.url}
//                           alt={item.celebrityName}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       ) : (
//                         <span className="text-gray-400 italic">No image</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 w-[150px] sm:w-[250px] break-words">{item.celebrityName}</td>
//                     <td className="px-4 py-3">{item.celebrityGender}</td>
//                     <td className="px-4 py-3">{item.celebrityProfession}</td>
//                     <td className="px-4 py-3">
//                       <ToggleSwitchButton
//                         value={statusMap[item._id!]}
//                         onChange={() => handleStatusToggle(item._id!)}
//                         className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
//                         classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//           <div className="sm:hidden space-y-4 p-4">
//             {loading ? (
//               <div className="flex justify-center items-center py-6">
//                 <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
//                 </div>
//               </div>
//             ) : filtered.length === 0 ? (
//               <div className="flex justify-center py-6 text-base">No Celebrities Found</div>
//             ) : (
//               filtered.map((item) => (
//                 <div key={item._id} className="border border-[#E0D4C4] rounded-lg p-4 bg-white">
//                   <div className="flex justify-between items-center mb-2">
//                     <CustomCheckbox
//                       className="w-4 h-4"
//                       checked={selectedIds.includes(item._id!)}
//                       onChange={() => setSelectedIds(prev => prev.includes(item._id!) ? prev.filter(i => i !== item._id!) : [...prev, item._id!])}
//                     />
//                     <div className="flex gap-2">
//                       <button onClick={() => handleDelete(item._id)} className="w-5 h-5 flex items-center justify-center">
//                         {deleteLoadingId === item._id ? (
//                           <svg className="animate-spin w-5 h-5 text-[#EB6622]" viewBox="0 0 24 24" fill="none">
//                             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
//                             <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
//                           </svg>
//                         ) : <DeleteIcon />}
//                       </button>
//                       <button onClick={() => handleEditClick(item)}>
//                         <EditIcon />
//                       </button>
//                     </div>
//                   </div>
//                   <div className="space-y-2 text-sm text-gray-700">
//                     <div>
//                       {item.celebrityImage?.url ? (
//                         <img
//                           src={item.celebrityImage.url}
//                           alt={item.celebrityName}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       ) : (
//                         <span className="text-gray-400 italic">No image</span>
//                       )}
//                     </div>
//                     <p><span className="font-semibold">Name:</span> {item.celebrityName}</p>
//                     <p><span className="font-semibold">Gender:</span> {item.celebrityGender}</p>
//                     <p><span className="font-semibold">Profession:</span> {item.celebrityProfession}</p>
//                     <div className="flex items-center gap-2">
//                       <span className="font-semibold">Status:</span>
//                       <ToggleSwitchButton
//                         value={statusMap[item._id!]}
//                         onChange={() => handleStatusToggle(item._id!)}
//                         className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300"
//                         classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="flex flex-wrap justify-center items-center gap-2">
//           <CustomPaginationItem type="arrow" direction="left" onClick={goToPrevious}
//           // disabled={currentPage === 1} 
//           />
//           {paginationRange.map((item, index) => (
//             item === "..." ? (
//               <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
//             ) : (
//               <CustomPaginationItem
//                 key={`page-${item}`}
//                 type="number"
//                 pageNumber={item}
//                 isActive={currentPage === item}
//                 onClick={() => goToPage(item as number)}
//               />
//             )
//           ))}
//           <CustomPaginationItem type="arrow" direction="right" onClick={goToNext}
//           // disabled={currentPage === totalPages} 
//           />
//         </div>
//       </div>  
       
//     </>
//   );
// };

// export default CelebrityPage;

const CelebrityPage = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-center mt-10">Celebrity</h1>
      <p className="text-center text-gray-600">coming soon...</p>
    </div>
  );
}
export default CelebrityPage;