import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import PageMeta from "../../components/common/PageMeta";
import AddIncentiveForm from "../../components/form/AddIncentiveForm/AddIncentiveForm";
import { AddIncentivesValues } from "../../interface";
import {
  deleteAllIncentivesApi,
  deleteIncentivesApi,
  exportSelectedIncentivesApi,
  getIncentivesApi,
  updateIncentiveApi,
} from "../../../services/incentives";
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
import { genderOptions, incentivesMoodOptions, incentivesNatureOptions } from "../../data";
import CustomPaginationItem from "../../components/reusableComponents/CustomPaginationIcon";

const Incentives = () => {
  const { addIncentivesFormData } = useAuth();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [incentives, setIncentives] = useState<AddIncentivesValues[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
  const [filter, setFilter] = useState("");
  const [editData, setEditData] = useState<AddIncentivesValues | null>(null);
  const [isBulkActive, setIsBulkActive] = useState<null | boolean>(false);
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  const [natureFilter, setNatureFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearch = useMemo(() => debounce(setFilter, 300), []);

  const toggleAccordion = useCallback((key: string) => {
    setActiveAccordion(prev => (prev === key ? null : key));
  }, []);

  const toggleAccordionEdit = useCallback((key: string) => {
    setActiveAccordion(prev => (prev === key ? prev : key)); // Always open unless already open
  }, []);

  const fetchIncentives = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getIncentivesApi(page, 50);
      const sorted = [...(res?.docs || [])].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
      setIncentives(sorted);
      setTotalPages(res.totalPages);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Fetch Error:", error);
      toast.error("Error fetching incentives");
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortOrder]);



  useEffect(() => {
    fetchIncentives();
  }, [addIncentivesFormData, sortOrder, currentPage,]);

  useEffect(() => {
    const initialMap: Record<string, boolean> = {};
    incentives.forEach(item => (initialMap[item._id] = item.incentiveStatus));
    setStatusMap(initialMap);
  }, [incentives]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  const filtered = useMemo(() => {
    return incentives.filter(item => {
      const text = filter.toLowerCase().replace(/\s+/g, "");
      const matchesText = [item.incentives, item.gender, item.incentivesMood, item.incentivesNature]
        .some(field => field.toLowerCase().replace(/\s+/g, "").includes(text));
      const matchesGender = genderFilter ? item.gender === genderFilter : true;
      const matchesMood = moodFilter ? item.incentivesMood === moodFilter : true;
      const matchesNature = natureFilter ? item.incentivesNature === natureFilter : true;
      const matchesStatus = statusFilter
        ? (statusFilter === "Active" ? item.incentiveStatus : !item.incentiveStatus)
        : true;
      return matchesText && matchesGender && matchesMood && matchesNature && matchesStatus;
    });
  }, [incentives, filter, genderFilter, moodFilter, natureFilter, statusFilter]);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(prev => prev.length === filtered.length ? [] : filtered.map(item => item._id));
  }, [filtered]);

  const handleEditClick = useCallback((item: AddIncentivesValues) => {
    setEditData(item);
    toggleAccordionEdit("addnew");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [toggleAccordionEdit]);

  const handlerUpdateIncentives = useCallback(async (id: string, values: AddIncentivesValues) => {
    setEditLoading(true);
    try {
      await updateIncentiveApi(id, values);
      toast.success("Incentive updated successfully!");
      setEditData(null);
      fetchIncentives();
    } catch {
      toast.error("Error updating incentive");
    } finally {
      setEditLoading(false);
    }
  }, [fetchIncentives]);

  const handleDelete = useCallback(async (id?: number) => {
    setDeleteLoadingId(id ? id.toString() : null);
    try {
      await deleteIncentivesApi(id ? [id] : selectedIds);
      toast.success("Incentive deleted successfully!");
      setSelectedIds([]);
      fetchIncentives();
    } catch {
      toast.error("Error deleting incentives");
    } finally {
      setDeleteLoadingId(null);
    }
  }, [selectedIds, fetchIncentives]);

  const handleDeleteAll = useCallback(async () => {
    setLoadingDeleteAll(true);
    try {
      await deleteAllIncentivesApi();
      toast.success("All incentives deleted");
      // setSelectedIds([]);
      fetchIncentives();
    } catch {
      toast.error("Failed to delete all incentives");
    } finally {
      setLoadingDeleteAll(false);
    }
  }, [fetchIncentives]);

  const handleStatusToggle = useCallback(async (id: string) => {
    const current = statusMap[id];
    setStatusMap(prev => ({ ...prev, [id]: !current }));
    try {
      await updateIncentiveApi(id, { incentiveStatus: !current });
      setSelectedIds([]);
      fetchIncentives();
      toast.success("Status updated");
    } catch {
      toast.error("Error updating status");
      setStatusMap(prev => ({ ...prev, [id]: current }));
    }
  }, [statusMap]);



  const handleBulkToggle = useCallback(async () => {
    const newStatus = !isBulkActive;
    setIsBulkActive(newStatus);
    try {
      await Promise.all(selectedIds.map(id => updateIncentiveApi(id, { incentiveStatus: newStatus })));
      toast.success("Bulk status updated");
      setSelectedIds([]);
      fetchIncentives();
    } catch {
      toast.error("Error updating bulk status");
      setIsBulkActive(!newStatus);
    }
  }, [isBulkActive, selectedIds, fetchIncentives]);

  console.log("bulkActive", isBulkActive)

  const exportSelectedIncentives = useCallback(async (ids: string[]) => {

    if (!ids || ids.length === 0) {
      toast.warning("Please select at least one incentive to export.");
      return;
    };

    try {
      await exportSelectedIncentivesApi(ids);
      toast.success("Incentives CSV downloaded successfully!");
      setSelectedIds([]);
      fetchIncentives();
    } catch (error) {
      console.error("Export Error:", error);
      toast.error("Something went wrong");
    }
  }, [fetchIncentives]);

  const clearAllFilters = useCallback(() => {
    setFilter("");
    setGenderFilter("");
    setMoodFilter("");
    setNatureFilter("");
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
    };

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
    fetchIncentives(page);
  }, [fetchIncentives]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      fetchIncentives(currentPage - 1);
    }
  }, [currentPage, fetchIncentives]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      fetchIncentives(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchIncentives]);



  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsBulkActive(false);
      return;
    };

    const selectedStatuses = filtered
      .filter((item) => selectedIds.includes(item._id))
      .map((item) => item.incentiveStatus);

    const allTrue = selectedStatuses.every((status) => status === true);
    const allFalse = selectedStatuses.every((status) => status === false);

    if (allTrue) {
      setIsBulkActive(true);
    } else if (allFalse) {
      setIsBulkActive(false);
    } else {
      setIsBulkActive(null); // mixed case
    }
  }, [selectedIds, filtered]);


  return (
    <>
      <PageMeta title="FameOflame" description="FameOflame admin panel" />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div ref={formRef}>
          <AddIncentiveForm
            editingData={editData}
            onEditSubmit={data => editData && handlerUpdateIncentives(editData._id, data)}
            editLoading={editLoading}
            setEditData={setEditData}
            fetchIncentives={fetchIncentives}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            toggleAccordion={toggleAccordion}
            formRef={formRef}
          />
        </div>

        <div className="bg-[#FFF6EB] px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="text-black text-base sm:text-lg font-medium">Filter</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {(filter || genderFilter || moodFilter || natureFilter || statusFilter) && (
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
                name="genderFilter"
                values={genderFilter}
                onSelect={setGenderFilter}
                options={genderOptions}
                placeholder="Gender"
                buttonClassName="w-full sm:w-32 text-sm"
              />
              <FilterDropdown
                name="moodFilter"
                values={moodFilter}
                onSelect={setMoodFilter}
                options={incentivesMoodOptions}
                placeholder="Mood"
                buttonClassName="w-full sm:w-32 text-sm"
              />
              <FilterDropdown
                name="natureFilter"
                values={natureFilter}
                onSelect={setNatureFilter}
                options={incentivesNatureOptions}
                placeholder="Nature"
                buttonClassName="w-full sm:w-32 text-sm"
              />
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
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 w-full sm:w-40 mb-2 sm:mb-0">All Incentives</h3>
          {selectedIds.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
              <div className="flex items-center space-x-3">
                <p className="text-[#847E76] text-sm">{selectedIds.length} Record{selectedIds.length > 1 ? 's' : ''} Selected</p>
                <div className="w-px h-5 bg-[#E0D4C4]" />
                <button onClick={handleSelectAll} className="bg-[#fde3d3] px-2 py-1 rounded text-[#F47521] text-xs font-medium">
                  {selectedIds.length === filtered.length ? 'Unselect All' : 'Select All'}
                </button>

                <button
                  onClick={() => exportSelectedIncentives(selectedIds.map(String))}
                  className="bg-[#dcfcd3] px-2 py-1 rounded text-[#43B925] text-xs font-medium"
                >
                  Export {selectedIds.length}
                </button>

              </div>



              <div className="flex items-center space-x-3">
                <ToggleSwitchButton
                  value={isBulkActive === true}
                  onChange={handleBulkToggle}
                  label="Bulk Active"
                  className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                  classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                />

                {/* // disabled={isBulkActive === null} */}

                <div className="w-px h-5 bg-[#E0D4C4]" />
                <button
                  onClick={handleDeleteAll}
                  disabled={loadingDeleteAll}
                  className={`flex gap-2 items-center px-2 py-1 rounded ${loadingDeleteAll ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className="bg-[#EF2222] w-6 h-6 flex justify-center items-center rounded">
                    {loadingDeleteAll ? (
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                      </svg>
                    ) : <TrashIcon />}
                  </div>
                  <p className="text-[#F47521] text-xs font-medium">{loadingDeleteAll ? 'Deleting...' : 'Delete All'}</p>
                </button>
              </div>
            </div>
          )}
        </div>


        <div className="relative border border-[#E0D4C4] min-h-[200px] h-[400px] overflow-y-auto">
          {/* Desktop Table */}
          <table className="w-full text-left border-collapse hidden sm:table">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4] sticky top-0 z-10">
              <tr className="text-[#BB501C] text-sm font-semibold">
                <th className="px-4 py-3 w-20 sm:w-28">
                  <CustomCheckbox className="w-4 h-4" checked={selectedIds.length === filtered.length} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-40 sm:w-64">
                  <div className="flex items-center space-x-4">
                    <span>Incentive</span>
                    <div className="flex">
                      <button onClick={() => setSortOrder("asc")}> <AccendingArrow /> </button>
                      <button onClick={() => setSortOrder("desc")}> <DescendingArrow /> </button>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 w-24 sm:w-40">Gender</th>
                <th className="px-4 py-3 w-32 sm:w-60">Incentives Mood</th>
                <th className="px-4 py-3 w-24 sm:w-40">Incentives Nature</th>
                <th className="px-4 py-3 w-24 sm:w-40">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex justify-center items-center py-6 h-[400px]">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex flex-col items-center justify-center h-[400px] space-y-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-base text-gray-500">No Incentives Found</p>
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
                    <td className="px-4 py-3 w-[150px] sm:w-[250px] break-words">{item.incentives}</td>
                    <td className="px-4 py-3">{item.gender}</td>
                    <td className="px-4 py-3">{item.incentivesMood}</td>
                    <td className="px-4 py-3">{item.incentivesNature}</td>
                    <td className="px-4 py-3">
                      <ToggleSwitchButton
                        value={statusMap[item._id]}
                        onChange={() => handleStatusToggle(item._id)}
                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>


          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4 p-4">
            {loading ? (
              <div className="flex justify-center items-center py-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                </div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex justify-center py-6 text-base">No Incentives Found</div>
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
                    <p><span className="font-semibold">Incentive:</span> {item?.incentives}</p>
                    <p><span className="font-semibold">Gender:</span> {item?.gender}</p>
                    <p><span className="font-semibold">Mood:</span> {item?.incentivesMood}</p>
                    <p><span className="font-semibold">Nature:</span> {item?.incentivesNature}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Status:</span>
                      <ToggleSwitchButton
                        value={statusMap[item._id]}
                        onChange={() => handleStatusToggle(item._id)}
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

export default Incentives;

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