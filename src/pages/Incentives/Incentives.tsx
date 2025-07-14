import { useEffect, useMemo, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import AddIncentiveForm from "../../components/form/AddIncentiveForm/AddIncentiveForm";
import { AddIncentivesValues } from "../../interface";
import {
  deleteAllIncentivesApi,
  deleteIncentivesApi,
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [editData, setEditData] = useState<AddIncentivesValues | null>(null);
  const [isBulkActive, setIsBulkActive] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  const [natureFilter, setNatureFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("🚀 ~ Incentives ~ currentPage:", currentPage)

  const goToPage = (page: number) => {
    console.log("🚀 ~ goToPage ~ page:", page)
    setCurrentPage(page);
    // fetchIncentives(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      fetchIncentives(currentPage - 1);
    }
  };

  const goToNext = () => {
    setCurrentPage(prev => prev + 1);
    fetchIncentives(currentPage + 1);
  };

  const debouncedSearch = useMemo(() => debounce(setDebouncedFilter, 300), []);

  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };


  const toggleAccordionEdit = (key: string) => {
    // If we're in edit mode, ignore toggle
    if (editData) return;
    setActiveAccordion(activeAccordion === key ? null : key);
  };



  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  useEffect(() => {
    const initialMap: Record<string, boolean> = {};
    incentives.forEach(item => initialMap[item._id] = item.incentiveStatus);
    setStatusMap(initialMap);
  }, [incentives]);



  // const fetchIncentives = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getIncentivesApi();
  //     const sorted = [...(res?.incentivesData || [])].sort((a, b) => {
  //       const timeA = new Date(a.createdAt).getTime();
  //       const timeB = new Date(b.createdAt).getTime();
  //       return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
  //     });
  //     setIncentives(sorted);
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     console.error("Fetch Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchIncentives = async (page = currentPage) => {
    console.log("🚀 ~ fetchIncentives ~ page:", page)
    setLoading(true);
    try {
      const res = await getIncentivesApi(page, 50);
      const sorted = [...(res?.docs || [])].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
      console.log("🚀 ~ fetchIncentives ~ res:", res)
      setIncentives(sorted);

    } catch (err) {
      const error = err as AxiosError;
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchIncentives();
  }, [addIncentivesFormData, sortOrder, currentPage]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map(item => item._id));
  };

  const handleEditClick = (item: AddIncentivesValues) => {
    console.log("🚀 ~ handleEditClick ~ item:", item)
    setEditData(item);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };


  const handlerUpdateIncentives = async (id: string, values: AddIncentivesValues) => {
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
  };

  const handleDelete = async (id?: number) => {
    setDeleteLoading(true);
    setDeleteLoadingId(id as any);
    try {
      await deleteIncentivesApi(id ? [id] : selectedIds);
      setDeleteLoading(false);
      toast.success("Incentive Deleted successfully!");
      setSelectedIds([]);
      fetchIncentives();
    } catch {
      toast.error("Error deleting incentives");
      setDeleteLoading(false);
      setDeleteLoadingId(null);
    }
  };

  const handleDeleteAll = async () => {
    setLoadingDeleteAll(true);
    try {
      await deleteAllIncentivesApi();
      toast.success("All incentives deleted");
      fetchIncentives();
    } catch {
      toast.error("Failed to delete all incentives");
    } finally {
      setLoadingDeleteAll(false);
    }
  };



  const handleStatusToggle = async (id: string) => {
    const current = statusMap[id];
    setStatusMap({ ...statusMap, [id]: !current });
    try {
      await updateIncentiveApi(id, { incentiveStatus: !current });
      toast.success("Status updated");
    } catch {
      toast.error("Error updating status");
      setStatusMap(prev => ({ ...prev, [id]: current }));
    }
  };

  const handleBulkToggle = async () => {
    const newStatus = !isBulkActive;
    setIsBulkActive(newStatus);
    try {
      await Promise.all(selectedIds.map(id => updateIncentiveApi(id, { incentiveStatus: newStatus })));
      toast.success("Bulk status updated");
      fetchIncentives();
    } catch {
      toast.error("Error updating bulk status");
      setIsBulkActive(!newStatus);
    }
  };

  const clearAllFilters = () => {
    setFilter("");
    setGenderFilter("");
    setMoodFilter("");
    setNatureFilter("");
    setStatusFilter("");
  };

  const filtered = incentives.filter(item => {
    const text = debouncedFilter.toLowerCase().replace(/\s+/g, "");
    const matchesText = [item.incentives, item.gender, item.incentivesMood, item.incentivesNature].some(field =>
      field.toLowerCase().replace(/\s+/g, "").includes(text)
    );
    const matchesGender = genderFilter ? item.gender === genderFilter : true;
    const matchesMood = moodFilter ? item.incentivesMood === moodFilter : true;
    const matchesNature = natureFilter ? item.incentivesNature === natureFilter : true;
    const matchesStatus = statusFilter
      ? (statusFilter === "Active" ? item.incentiveStatus : !item.incentiveStatus)
      : true;

    return matchesText && matchesGender && matchesMood && matchesNature && matchesStatus;
  });



  return (
    <>
      <PageMeta title="FameOflame" description="FameOflame admin panel" />
      <div className="w-[90%] mx-auto space-y-6">
        <div ref={formRef}>
          <AddIncentiveForm
            editingData={editData}
            onEditSubmit={data => editData && handlerUpdateIncentives(editData._id, data)}
            editLoading={editLoading}
            setEditData={setEditData}
            getIncentivesData={fetchIncentives}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            toggleAccordion={toggleAccordion}
          />
        </div>


        <div className="mx-auto space-y-6">
          <div className="bg-[#FFF6EB] px-6 py-4 flex gap-4 items-center justify-between">
            <p className="text-black text-lg font-medium">Filter</p>

            {/* Search Input with Orange Border */}

            {/* <div className="relative flex-1 max-w-sm"> */}
            <div className="flex space-x-3">
              {(filter || genderFilter || moodFilter || natureFilter || statusFilter) && (
                <button
                  onClick={clearAllFilters}
                  className="text-[#665F56] underline text-sm ml-auto hover:text-orange-700 transition-colors flex items-center gap-1"
                >
                  Clear All Filters
                </button>
              )}



              <div className="border-2 border-orange-400 bg-white flex items-center">
                <input
                  value={filter}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 focus:outline-none placeholder:text-gray-500"
                />
                <button type="button" className="px-3 py-2 text-orange-500">
                  {/* <Search className="w-5 h-5" /> */}
                  <SearchBarIcon />
                </button>
              </div>


              {/* </div> */}

              {/* Filter Dropdowns */}
              <FilterDropdown
                name="genderFilter"
                values={genderFilter}
                onSelect={setGenderFilter}
                options={genderOptions}
                placeholder="Select Gender"
                buttonClassName="w-[180px]"
              // className="bg-blue-400"
              />

              <FilterDropdown
                name="moodFilter"
                values={moodFilter}
                onSelect={setMoodFilter}
                options={incentivesMoodOptions}
                placeholder="Select Mood"
                buttonClassName="w-[180]"
              />

              <FilterDropdown
                name="natureFilter"
                values={natureFilter}
                onSelect={setNatureFilter}
                options={incentivesNatureOptions}
                placeholder="Select Nature"
                buttonClassName="w-[180px]"
              />

              <FilterDropdown
                name="statusFilter"
                values={statusFilter}
                onSelect={setStatusFilter}
                options={["Active", "Inactive"]}
                placeholder="Select Status"
                buttonClassName="w-[180px]"
              />

              <button>
                <img
                  src="./images/svgs/dotsmenu.svg"
                  alt="Logo"
                />
              </button>
              {/* Clear All Filters Button */}

            </div>
          </div>

        </div>




        {/* <CustomDropdown
                                                label="Gender"
                                                options={genderOptions}
                                                values={values.gender}
                                                onSelect={(gender) => setFieldValue("gender", gender)}
                                                className="w-full"
                                                placeholder="Select Gender"
                                                error={errors.gender}
                                                touched={touched.gender}
                                                name="gender"
                                                errorClassName="text-red-500 h-6"
                                            />  */}



        {/* 
                                                 <div className={`w-full ${className}`} ref={dropdownRef}>
                                            
                                                        {label && (
                                                            <label className="block text-md font-medium text-[#000000] mb-2">
                                                                {label}
                                                            </label>
                                                        )}
                                            
                                                        <div className="p-[2px] bg-gradient-to-r from-orange-600 to-orange-400 ">
                                                            <button
                                                                type="button"
                                                                onClick={handleToggle}
                                                                className="w-full px-4 py-2 text-left bg-white"
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <span className={values ? "text-gray-900" : "text-gray-500"}>
                                                                        {values || placeholder}
                                                                    </span>
                                            
                                                                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#EB6622]">
                                                                        <svg
                                                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                                                }`}
                                                                            fill="none"
                                                                            stroke="#FFF"
                                                                            strokeWidth={2}
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                                        </svg>
                                                                    </div>
                                            
                                                                </div>
                                                            </button>
                                                        </div>
                                            
                                                        {
                                                            error && touched ?
                                                                <ErrorMessage
                                                                    name={name}
                                                                    component="div"
                                                                    className="text-sm text-red-500 pt-1"
                                                                />
                                                                :
                                                                <div className={errorClassName} />
                                                        }
                                                        {isOpen && (
                                                            <div className="absolute w-[34%] z-50 mt-1 bg-white border border-gray-300 max-h-60 overflow-auto shadow-md rounded">
                                                                {options.map((option, index) => (
                                                                    <button
                                                                        key={index}
                                                                        type="button"
                                                                        onClick={() => handleSelect(option)}
                                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                                                                    >
                                                                        <span className="text-gray-900">{option}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                            
                                            
                                                    </div> */}

        {/* filterDropdown */}

        {/* <CustomDropdown
                                                label="Gender"
                                                options={genderOptions}
                                                values={values.gender}
                                                onSelect={(gender) => setFieldValue("gender", gender)}
                                                className="w-full"
                                                placeholder="Select Gender"
                                                error={errors.gender}
                                                touched={touched.gender}
                                                name="gender"
                                                errorClassName="text-red-500 h-6"
                                            /> */}


        <div className="flex">
          <h3 className="text-lg font-semibold text-gray-800 w-40">All Incentives</h3>
          {selectedIds.length > 0 && (
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center space-x-3">
                <p className="text-[#847E76] text-sm">{selectedIds.length} Record{selectedIds.length > 1 && 's'} Selected</p>
                <div className="w-px h-5 bg-[#E0D4C4]" />
                <button onClick={handleSelectAll} className="bg-[#fde3d3] px-2 py-1 rounded text-[#F47521] text-xs font-medium">
                  {selectedIds.length === filtered.length ? 'Unselect All' : 'Select All'}
                </button>
                <button className="bg-[#dcfcd3] px-2 py-1 rounded text-[#43B925] text-xs font-medium">Export {selectedIds.length}</button>
              </div>

              <div className="flex items-center space-x-3">
                <ToggleSwitchButton
                  value={isBulkActive}
                  onChange={handleBulkToggle}
                  label="Active"
                  className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                  classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                />
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
          )
          }
        </div>


        <div className="relative border border-[#E0D4C4] overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4]">
              <tr className="text-[#BB501C] text-sm font-semibold sticky top-0 z-10 bg-[#FDF6EE]">

                {/* <tr className="text-[#BB501C] text-sm font-semibold"> */}
                <th className="px-4 py-3 w-28">
                  <CustomCheckbox className="w-4 h-4" checked={selectedIds.length === filtered.length} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-64">
                  <div className="flex items-center space-x-4">
                    <span>Incentive</span>
                    <div className="flex">
                      <button onClick={() => setSortOrder("asc")}> <AccendingArrow /> </button>
                      <button onClick={() => setSortOrder("desc")}> <DescendingArrow /> </button>
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 w-40">Gender</th>
                <th className="px-4 py-3 w-60">Incentives Mood</th>
                <th className="px-4 py-3 w-40">Incentives Nature</th>
                <th className="px-4 py-3 w-40">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex justify-center items-center py-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7}><div className="flex justify-center py-6">No Incentives Found</div></td></tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#E0D4C4] text-sm text-gray-700">
                    <td className="px-4 py-3">
                      <CustomCheckbox className="w-4 h-4" checked={selectedIds.includes(item._id)} onChange={() => setSelectedIds(prev => prev.includes(item._id) ? prev.filter(i => i !== item._id) : [...prev, item._id])} />
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-4 items-center">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="w-5 h-5 flex items-center justify-center"
                        >
                          {deleteLoadingId === item._id ? (
                            <svg
                              className="animate-spin w-5 h-5 text-[#EB6622]"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                className="opacity-25"
                              />
                              <path
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                                className="opacity-75"
                              />
                            </svg>
                          ) : (
                            <DeleteIcon />
                          )}
                        </button>

                        <button
                          onClick={() => {
                            handleEditClick(item);
                            toggleAccordionEdit("addnew");
                          }}
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </td>

                    <td className="px-4 py-3 w-[250px] break-words">{item.incentives}</td>
                    <td className="px-4 py-3">{item.gender}</td>
                    <td className="px-4 py-3">{item.incentivesMood}</td>
                    <td className="px-4 py-3">{item.incentivesNature}</td>

                    <td className="px-4 py-3">
                      <ToggleSwitchButton
                        value={statusMap[item._id]} // get initial or updated value
                        onChange={() => handleStatusToggle(item._id)}
                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                      // onChange={setincentiveStatus}
                      />
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* <div className="bg-[#A86B63] w-8 h-8 rounded-lg flex items-center justify-center">
          <img
            src="./images/svgs/leftarrowpagination.svg"
            alt="Logo"
            width={10}
            height={10}
          />
        </div> */}



        <div className="flex space-x-2 items-center justify-center">
          <CustomPaginationItem type="arrow" direction="left" onClick={goToPrevious} />

          {[1, 2, 3, 4, 5,].map((page) => (
            <CustomPaginationItem
              key={page}
              type="number"
              pageNumber={page}
              isActive={currentPage === page}
              onClick={() => goToPage(page)}
            />
          ))}

          <CustomPaginationItem type="arrow" direction="right" onClick={goToNext} />
        </div>


      </div>
    </>
  );
};

export default Incentives;