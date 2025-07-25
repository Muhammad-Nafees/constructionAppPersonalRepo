// import { useEffect, useState } from "react";
// import { deleteAdmin, getAdmins } from "../../../services/admin/index.ts";
// import PageMeta from "../../components/common/PageMeta.tsx";
// import moment from 'moment';
// import AdminRegisterForm from "../../components/form/AdminRegisteredForm.tsx/AdminRegisterForm.tsx";
// import { useAuth } from "../../context/AuthContext.tsx";

// const Settings = () => {

//   // const [adminsData, setAdminsData] = useState([]);
//   // const [deleteAdminData, setDeleteAdminData] = useState({})
//   // const [loading, setLoading] = useState(false);
//   // const { adminRegisterFormData } = useAuth();

//   // // useEffect(() => {
//   // const getAllAdmins = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await getAdmins();
//   //     setLoading(false);
//   //     if (response) {
//   //       setAdminsData(response.data?.admins)
//   //     };

//   //     console.log("🚀 ~ getAllAdmins ~ response:", response.data);
//   //     return response;
//   //   } catch (error) {
//   //     setLoading(false);
//   //     console.log("🚀 ~ getAdminsList ~ error:", error)
//   //     throw error;
//   //   }
//   // };
//   //   getAllAdmins()
//   // }, [deleteAdminData, adminRegisterFormData])


//   // useEffect(() => {
//   //   getAllAdmins()
//   // }, [deleteAdminData, adminRegisterFormData])

//   // const deleteSubAdmin = async (id: string) => {
//   //   try {
//   //     const response = await deleteAdmin(id);
//   //     setDeleteAdminData(response.data);
//   //     console.log("🚀 ~ deletAdmin ~ response:", response);
//   //     return response;
//   //   } catch (error) {
//   //     console.log("🚀 ~ delete ~ error:", error)
//   //     throw error;
//   //   }
//   // };


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
//         </div>
//       </div>

//       {/* <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-3xl font-bold text-center mt-10">Setting</h1>
//         <p className="text-center text-gray-600">coming soon...</p>
//       </div> */}

//       <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">

//         <div className="flex flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Sub Admins</h3>
//           </div>
//         </div>


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
//                   adminsData.length === 0 ?
//                     <tr>
//                       <td colSpan={4}>
//                         <div className="flex justify-center py-10">
//                           <p className="text-center text-[24px]">No sub admins created yet</p>
//                         </div>
//                       </td>
//                     </tr>
//                     :
//                     adminsData?.map((item: any, index: number) => (
//                       <tr key={index}>
//                         <td className="px-4 sm:px-6 py-3.5">
//                           <div className="flex items-center gap-3">
//                             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-100 text-error-600">
//                               <span className="text-sm font-medium">{item?.name[0].toUpperCase()}</span>
//                             </div>
//                             <div>
//                               <span className="block font-medium text-theme-sm text-gray-700 dark:text-gray-400">{item?.name}</span>
//                               <span className="text-theme-sm text-gray-500 dark:text-gray-400">{item?.email}</span>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-4 sm:px-6 py-3.5">
//                           <p className="text-theme-sm text-gray-700 dark:text-gray-400">
//                             {moment(item?.createdAt).format('YYYY-MM-DD')}
//                           </p>
//                         </td>

//                         <td className="px-4 sm:px-6 py-3.5">
//                           <p className="text-theme-sm text-gray-700 dark:text-gray-400">{item?.role}</p>
//                         </td>

//                         <td className="px-4 sm:px-6 py-3.5">
//                           <button
//                             onClick={() => deleteSubAdmin(item._id)}
//                           >
//                             <svg
//                               width="1em"
//                               height="1em"
//                               viewBox="0 0 20 20"
//                               fill="none"
//                               className="text-gray-700 cursor-pointer size-5 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 clipRule="evenodd"
//                                 d="M6.541 3.792c0-1.243 1.007-2.25 2.25-2.25h2.417c1.243 0 2.25 1.007 2.25 2.25V4.042h2.167h1.041a.75.75 0 010 1.5h-.291v10.667c0 1.243-1.008 2.25-2.25 2.25H5.875a2.25 2.25 0 01-2.25-2.25V5.542h-.291a.75.75 0 010-1.5h1.042h2.166V3.792z"
//                                 fill="currentColor"
//                               />
//                             </svg>
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                 )
//               }
//             </tbody>

//           </table>
//         </div>
//       </div>

//     </>
//   );

// }

// export default Settings;


import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import PageMeta from "../../components/common/PageMeta";
import AddUserForm from "../../components/form/add-user-form/AddUserForm";
import { SettingsValuesSchema } from "../../interface";
import {
  deleteAdminApi,
  deleteAllAdminsApi,
  // deleteAllIncentivesApi,
  // deleteIncentivesApi,
  // exportSelectedIncentivesApi,
  getAllAdminsApi,
  updateSubAdminApi,
  updateSuperAdminApi,
  // updateIncentiveApi,
} from "../../../services/admin";
import { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import AccendingArrow from "../../components/svg/AccendingArrow";
import DescendingArrow from "../../components/svg/DescendingArrow";
import EditIcon from "../../components/svg/EditIcon";
import DeleteIcon from "../../components/svg/DeleteIcon";
import TrashIcon from "../../components/svg/TrashIcon";
import SearchBarIcon from "../../components/svg/SearchBarIcon";
import CustomCheckbox from "../../components/reusableComponents/CustomCheckBox";
import ToggleSwitchButton from "../../components/reusableComponents/ToggleSwitchButton";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import FilterDropdown from "../../components/input/FilterDropDown";
import CustomPaginationItem from "../../components/reusableComponents/CustomPaginationIcon";

const Settings = () => {
  const { addIncentivesFormData } = useAuth();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [adminsData, setAllAdminsData] = useState<SettingsValuesSchema[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
  const [filter, setFilter] = useState("");
  const [editData, setEditData] = useState<SettingsValuesSchema | null>(null);
  const [isBulkActive, setIsBulkActive] = useState<null | boolean>(false);
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
  const [activeAccordion, setActiveAccordion] = useState<string | null>("myprofile");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useMemo(() => debounce(setFilter, 300), []);

  const toggleAccordion = useCallback((key: string) => {
    setActiveAccordion(prev => (prev === key ? null : key));
  }, []);

  const toggleAccordionEdit = useCallback((key: string) => {
    setActiveAccordion(prev => (prev === key ? prev : key));
  }, []);

  const fetchAllAdmins = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getAllAdminsApi(page, 50);
      const sorted = [...(res?.docs || [])].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
      setAllAdminsData(sorted);
      setTotalPages(res.totalPages);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Fetch Error:", error);
      toast.error("Error fetching admins");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder]);

  useEffect(() => {
    fetchAllAdmins();
  }, [addIncentivesFormData, sortOrder, currentPage]);

  useEffect(() => {
    const initialMap: Record<string, boolean> = {};
    adminsData.forEach(item => (initialMap[item._id] = item.userStatus));
    setStatusMap(initialMap);
  }, [adminsData]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  const filtered = useMemo(() => {
    return adminsData.filter(item => {
      const text = filter.toLowerCase().replace(/\s+/g, "");
      const matchesText = [item.name, item.email].some(field => field.toLowerCase().replace(/\s+/g, "").includes(text));
      const matchesStatus = statusFilter
        ? (statusFilter === "Active" ? item.userStatus : !item.userStatus)
        : true;
      return matchesText && matchesStatus;
    });
  }, [adminsData, filter, statusFilter]);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(prev => prev.length === filtered.length ? [] : filtered.map(item => item._id));
  }, [filtered]);

  const handleEditClick = useCallback((item: SettingsValuesSchema) => {
    setEditData(item);
    toggleAccordionEdit("addnewmanager");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [toggleAccordionEdit]);


  const handleEditSubmit = useCallback(async (data: SettingsValuesSchema) => {
    if (!editData) return;

    setEditLoading(true);
    try {
      const payload = { ...data, id: editData._id }; // 👈 ensure ID is passed
      await updateSubAdminApi(payload);
      toast.success("Admin updated successfully");
      setEditData(null);
      fetchAllAdmins();
    } catch {
      toast.error("Error updating sub-admin");
    } finally {
      setEditLoading(false);
    }
  }, [editData, fetchAllAdmins]);


  const handleDelete = useCallback(async (id?: number) => {
    setDeleteLoadingId(id ? id.toString() : null);
    try {
      await deleteAdminApi(id ? [id] : selectedIds);
      toast.success("Admin deleted successfully!");
      setSelectedIds([]);
      fetchAllAdmins();
    } catch {
      toast.error("Error deleting admin");
    } finally {
      setDeleteLoadingId(null);
    }
  }, [selectedIds, fetchAllAdmins]);

  const handleDeleteAll = useCallback(async () => {
    setLoadingDeleteAll(true);
    try {
      await deleteAllAdminsApi();
      toast.success("All admins deleted");
      setSelectedIds([]);
      fetchAllAdmins();
    } catch {
      toast.error("Failed to delete all admins");
    } finally {
      setLoadingDeleteAll(false);
    }
  }, [fetchAllAdmins]);



  // const handleStatusToggle = useCallback(async (id: string) => {
  //   const current = statusMap[id];
  //   setStatusMap(prev => ({ ...prev, [id]: !current }));
  //   try {
  //     await updateIncentiveApi(id, { userStatus: !current });
  //     setSelectedIds([]);
  //     fetchAllAdmins();
  //     toast.success("Status updated");
  //   } catch {
  //     toast.error("Error updating status");
  //     setStatusMap(prev => ({ ...prev, [id]: current }));
  //   }
  // }, [statusMap, fetchAllAdmins]);

  // const handleBulkToggle = useCallback(async () => {
  //   const newStatus = !isBulkActive;
  //   setIsBulkActive(newStatus);
  //   try {
  //     await Promise.all(selectedIds.map(id => updateIncentiveApi(id, { userStatus: newStatus })));
  //     toast.success("Bulk status updated");
  //     setSelectedIds([]);
  //     fetchAllAdmins();
  //   } catch {
  //     toast.error("Error updating bulk status");
  //     setIsBulkActive(!newStatus);
  //   }
  // }, [isBulkActive, selectedIds, fetchAllAdmins]);

  // const exportSelectedIncentives = useCallback(async (ids: string[]) => {
  //   if (!ids || ids.length === 0) {
  //     toast.warning("Please select at least one admin to export.");
  //     return;
  //   }
  //   try {
  //     await exportSelectedIncentivesApi(ids);
  //     toast.success("Admins CSV downloaded successfully!");
  //     setSelectedIds([]);
  //     fetchAllAdmins();
  //   } catch (error) {
  //     console.error("Export Error:", error);
  //     toast.error("Something went wrong");
  //   }
  // }, [fetchAllAdmins]);

  const clearAllFilters = useCallback(() => {
    setFilter("");
    setStatusFilter("");
  }, []);

  const getPaginationRange = useCallback((totalPages: number, currentPage: number): (number | "...")[] => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    let lastPage: number | undefined;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let page of range) {
      if (lastPage) {
        if (page - lastPage === 2) {
          rangeWithDots.push(lastPage + 1);
        } else if (page - lastPage > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(page);
      lastPage = page;
    }

    return rangeWithDots;
  }, []);

  const paginationRange = useMemo(() => getPaginationRange(totalPages, currentPage), [totalPages, currentPage, getPaginationRange]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    fetchAllAdmins(page);
  }, [fetchAllAdmins]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      fetchAllAdmins(currentPage - 1);
    }
  }, [currentPage, fetchAllAdmins]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      fetchAllAdmins(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchAllAdmins]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsBulkActive(false);
      return;
    }
    const selectedStatuses = filtered
      .filter((item) => selectedIds.includes(item._id))
      .map((item) => item.userStatus);
    const allTrue = selectedStatuses.every((status) => status === true);
    const allFalse = selectedStatuses.every((status) => status === false);
    if (allTrue) setIsBulkActive(true);
    else if (allFalse) setIsBulkActive(false);
    else setIsBulkActive(null);
  }, [selectedIds, filtered]);

  return (
    <>
      <PageMeta title="FameOflame" description="FameOflame admin panel" />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div ref={formRef}>
          <AddUserForm
            editingData={editData}
            onEditSubmit={handleEditSubmit}
            editLoading={editLoading}
            setEditData={setEditData}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            toggleAccordion={toggleAccordion}

            formRef={formRef}
          />
        </div>

        <div className="bg-[#FFF6EB] px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-black text-base sm:text-lg font-medium">Filter</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {(filter || statusFilter) && (
              <button
                onClick={clearAllFilters}
                className="text-[#665F56] underline text-sm hover:text-orange-700 transition-colors flex items-center gap-1"
              >
                Clear All Filters
              </button>
            )}
            <div className="border-2 border-orange-400 bg-white flex items-center w-full sm:w-64">
              <input
                value={filter}
                onChange={handleInputChange}
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 focus:outline-none placeholder:text-gray-500 text-sm"
              />
              <button type="button" className="px-3 py-2 text-orange-500">
                <SearchBarIcon />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <FilterDropdown
                name="statusFilter"
                values={statusFilter}
                onSelect={setStatusFilter}
                options={["Active", "Inactive"]}
                placeholder="Status"
                buttonClassName="w-full sm:w-32 text-sm"
              />
              <button className="w-10 h-10 flex items-center justify-center">
                <img src="./images/svgs/dotsmenu.svg" alt="Menu" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 w-full sm:w-40 mb-2 sm:mb-0">Manager</h3>
          {selectedIds.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
              <div className="flex items-center space-x-3">
                <p className="text-[#847E76] text-sm">{selectedIds.length} Record{selectedIds.length > 1 ? "s" : ""} Selected</p>
                <div className="w-px h-5 bg-[#E0D4C4]" />
                <button onClick={handleSelectAll} className="bg-[#fde3d3] px-2 py-1 rounded text-[#F47521] text-xs font-medium">
                  {selectedIds.length === filtered.length ? "Unselect All" : "Select All"}
                </button>
                <button
                  // onClick={() => exportSelectedIncentives(selectedIds.map(String))}
                  className="bg-[#dcfcd3] px-2 py-1 rounded text-[#43B925] text-xs font-medium"
                >
                  Export {selectedIds.length}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <ToggleSwitchButton
                  value={isBulkActive === true}
                  // onChange={handleBulkToggle}
                  label={isBulkActive === true ? "Active" : isBulkActive === false ? "Inactive" : "Toggle"}
                  className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                  classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                />
                <div className="w-px h-5 bg-[#E0D4C4]" />
                <button
                  onClick={handleDeleteAll}
                  disabled={loadingDeleteAll}
                  className={`flex gap-2 items-center px-2 py-1 rounded ${loadingDeleteAll ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="bg-[#EF2222] w-6 h-6 flex justify-center items-center rounded">
                    {loadingDeleteAll ? (
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                      </svg>
                    ) : <TrashIcon />}
                  </div>
                  <p className="text-[#F47521] text-xs font-medium">{loadingDeleteAll ? "Deleting..." : "Delete All"}</p>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative border border-[#E0D4C4] min-h-[200px] h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse hidden sm:table">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4] sticky top-0 z-10">
              <tr className="text-[#BB501C] text-sm font-semibold">
                <th className="px-4 py-3 w-20 sm:w-28">
                  <CustomCheckbox className="w-4 h-4" checked={selectedIds.length === filtered.length} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-40 sm:w-64">
                  <div className="flex items-center space-x-4">
                    <span>Name</span>
                    <div className="flex">
                      <button onClick={() => setSortOrder("asc")}><AccendingArrow /></button>
                      <button onClick={() => setSortOrder("desc")}><DescendingArrow /></button>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3">Email</th>
                {/* <th className="px-4 py-3">Password</th> */}
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex justify-center items-center py-6 h-[400px]">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center h-[400px] space-y-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-base text-gray-500">No Data Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id} className="border-b border-[#E0D4C4] text-sm text-gray-700">
                    <td className="px-4 py-3">
                      <CustomCheckbox className="w-4 h-4" checked={selectedIds.includes(item._id)} onChange={() => setSelectedIds(prev => prev.includes(item._id) ? prev.filter(i => i !== item._id) : [...prev, item._id])} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-4 items-center">
                        <button onClick={() => handleDelete(item._id)} className="w-5 h-5 flex items-center justify-center">
                          {deleteLoadingId === item._id.toString() ? (
                            <svg className="animate-spin w-5 h-5 text-[#EB6622]" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                            </svg>
                          ) : <DeleteIcon />}
                        </button>
                        <button onClick={() => handleEditClick(item)}>
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[150px] sm:w-[250px] break-words">{item.name}</td>
                    <td className="px-4 py-3">{item.email}</td>
                    <td className="px-4 py-3">{item.password}</td>
                    <td className="px-4 py-3">
                      <ToggleSwitchButton
                        value={statusMap[item._id]}
                        // onChange={() => handleStatusToggle(item._id)}
                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="sm:hidden space-y-4 p-4">
            {loading ? (
              <div className="flex justify-center items-center py-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex justify-center py-6 text-base">No Admins Found</div>
            ) : (
              filtered.map((item) => (
                <div key={item._id} className="border border-[#E0D4C4] rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-center mb-2">
                    <CustomCheckbox
                      className="w-4 h-4"
                      checked={selectedIds.includes(item._id)}
                      onChange={() => setSelectedIds(prev => prev.includes(item._id) ? prev.filter(i => i !== item._id) : [...prev, item._id])}
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(item._id)} className="w-5 h-5 flex items-center justify-center">
                        {deleteLoadingId === item._id.toString() ? (
                          <svg className="animate-spin w-5 h-5 text-[#EB6622]" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                            <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                          </svg>
                        ) : <DeleteIcon />}
                      </button>
                      <button onClick={() => handleEditClick(item)}>
                        <EditIcon />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-semibold">Name:</span> {item.name}</p>
                    <p><span className="font-semibold">Email:</span> {item.email}</p>
                    <p><span className="font-semibold">Password:</span> {item.password}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <ToggleSwitchButton
                        value={statusMap[item._id]}
                        // onChange={() => handleStatusToggle(item._id)}
                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <CustomPaginationItem type="arrow" direction="left" onClick={goToPrevious} />
          {paginationRange.map((item, index) => (
            item === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-gray-500">...</span>
            ) : (
              <CustomPaginationItem
                key={`page-${item}`}
                type="number"
                pageNumber={item}
                isActive={currentPage === item}
                onClick={() => goToPage(item as number)}
              />
            )
          ))}
          <CustomPaginationItem type="arrow" direction="right" onClick={goToNext} />
        </div>
      </div>
    </>
  );
};

export default Settings;

{/* <ImageUploader
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            values={values}
                            error={errors.celebrityImage}
                            touched={touched.celebrityImage}
                            name="celebrityImage"
                            errorClassName="h-4"
                            selectedFiles={selectedFiles}
                        //   onUploadSuccess={(url) => setFieldValue('celebrityImage', url)}
                        /> */}


//   <tr key={celebrity._id || index} className="border-b border-[#E0D4C4] text-sm text-gray-700">
//   <td className="px-4 py-3">
//     <div className="flex items-center gap-4">
//       {/* <CustomCheckbox
//         className="w-4 h-4"
//         checked={deleteIds.includes(celebrity._id)}
//         onChange={() => handleCheckboxChange(celebrity._id)}
//       /> */}
//       {/* <button onClick={() => handleEditClick(item)}>
//         <EditIcon />
//       </button> */}
//     </div>
//   </td>
//   <td className="px-4 py-3">
//     {celebrity.images?.[0]?.url ? (
//       <img
//         src={celebrity.images[0].url}
//         alt={celebrity.images[0].filename}
//         className="w-16 h-16 object-cover rounded"
//       />
//     ) : (
//       <span className="text-gray-400 italic">No image</span>
//     )}
//   </td>
//   <td className="px-4 py-3">{celebrity.celebrityName || '—'}</td>
//   <td className="px-4 py-3">{celebrity.celebrityGender || '—'}</td>
//   <td className="px-4 py-3">{celebrity.professionNationality || '—'}</td>
// </tr>