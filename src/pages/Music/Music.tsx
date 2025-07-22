import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import PageMeta from "../../components/common/PageMeta";
import { MusicValuesSchema } from "../../interface";
import { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import DeleteIcon from "../../components/svg/DeleteIcon";
import TrashIcon from "../../components/svg/TrashIcon";
import SearchBarIcon from "../../components/svg/SearchBarIcon";
import ToggleSwitchButton from "../../components/reusableComponents/ToggleSwitchButton";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import FilterDropdown from "../../components/input/FilterDropDown";
import CustomPaginationItem from "../../components/reusableComponents/CustomPaginationIcon";
import TickIcon from "../../components/svg/TickIcon";
import CrossIcon from "../../components/svg/CrossIcon";
import AddMusicForm from "../../components/form/addmusic-form/AddMusicForm";
import CustomCheckbox from "../../components/reusableComponents/CustomCheckBox";
import EditIcon from "../../components/svg/EditIcon";
import { deleteAllMusicApi, deleteSelectedMusicApi, getAllMusicApi } from "../../../services/music";


const MusicPage = () => {
  const { addIncentivesFormData } = useAuth();
  const formRef = useRef<HTMLDivElement | null>(null);

  const [musicList, setMusicList] = useState<MusicValuesSchema[]>([]);
  console.log("🚀 ~ MusicPage ~ musicList:", musicList)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [loadingDeleteAll, setLoadingDeleteAll] = useState(false);
  const [filter, setFilter] = useState("");
  const [editData, setEditData] = useState<MusicValuesSchema | null>(null);
  const [isBulkActive, setIsBulkActive] = useState<boolean | null>(false);
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentlyEditingId, setCurrentlyEditingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    console.log("🚀 ~ filtered ~ musicList:", musicList)
    return musicList?.filter(item => {
      const text = filter?.toLowerCase()?.replace(/\s+/g, "");
      const matchesText = item?.musicName?.toLowerCase().replace(/\s+/g, "")?.includes(text);
      const matchesStatus = statusFilter
        ? (statusFilter === "Active" ? item?.musicStatus : !item?.musicStatus)
        : true;
      return matchesText && matchesStatus;
    });
  }, [musicList, filter, statusFilter]);

  // const filtered = useMemo(() => {
  //   return musicList?.filter(item => {
  //     const text = filter?.toLowerCase()?.replace(/\s+/g, "");
  //     const matchesText = text
  //       ? item?.musicName?.toLowerCase().replace(/\s+/g, "")?.includes(text)
  //       : true;

  //     const matchesStatus = statusFilter
  //       ? (statusFilter === "Active" ? item?.musicStatus : !item?.musicStatus)
  //       : true;

  //     return matchesText && matchesStatus;
  //   });
  // }, [musicList, filter, statusFilter]);

 
  const debouncedSearch = useMemo(() => debounce(setFilter, 300), []);

  const toggleAccordion = useCallback((key: string) => {
    setActiveAccordion(prev => (prev === key ? null : key));
  }, []);

  const fetchMusic = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await getAllMusicApi(page, 50);
      console.log("🚀 ~ fetchMusic ~ res:", res)
      const transformedDocs = res?.docs.map((doc: any) => ({
        _id: doc._id,
        musicFile: doc.musicFile || null,
        musicName: doc.musicName,
        musicStatus: doc.musicStatus,
        createdAt: doc.createdAt,
      })) || [];
      console.log("🚀 ~ transformedDocs ~ transformedDocs:", transformedDocs)
      setMusicList(transformedDocs);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Fetch Error:", error);
      toast.error("Error fetching music");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);
  
  useEffect(() => {
    fetchMusic();
  }, [addIncentivesFormData, currentPage, fetchMusic]);

  useEffect(() => {
    const initialMap: Record<string, boolean> = {};
    musicList.forEach(item => (initialMap[item._id!] = item.musicStatus));
    setStatusMap(initialMap);
  }, [musicList]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    debouncedSearch(e.target.value);
  }, [debouncedSearch]);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(prev => prev.length === filtered.length ? [] : filtered.map(item => item._id!));
  }, [filtered]);

  // const handleEditClick = (item: MusicValuesSchema) => {
  //   setCurrentlyEditingId(item._id);
  //   setEditData(item);
  //   setActiveAccordion(null);
  // };

  // const handlerUpdateMusic = useCallback(async (data: MusicValuesSchema) => {
  //   if (!editData?._id) return;
  //   setEditLoading(true);
  //   try {
  //     const updatePayload = {
  //       musicName: data.musicName,
  //       musicStatus: data.musicStatus,
  //     };
  //     await updateMusicApi(editData._id, updatePayload);
  //     toast.success("Music updated successfully!");
  //     setEditData(null);
  //     setCurrentlyEditingId(null);
  //     fetchMusic();
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     console.error("Update Error:", error);
  //     toast.error("Error updating music");
  //   } finally {
  //     setEditLoading(false);
  //   }
  // }, [editData, fetchMusic]);

  const handleDelete = useCallback(async (id?: string) => {
    setDeleteLoadingId(id ? id : null);
    try {
      await deleteSelectedMusicApi(id ? [id] : selectedIds);
      toast.success("Music deleted successfully!");
      setSelectedIds([]);
      fetchMusic();
    } catch (err) {
      const error = err as AxiosError;
      console.error("Delete Error:", error);
      toast.error("Error deleting music");
    } finally {
      setDeleteLoadingId(null);
    }
  }, [selectedIds, fetchMusic]);

  const handleDeleteAll = useCallback(async () => {
    setLoadingDeleteAll(true);
    try {
      await deleteAllMusicApi();
      toast.success("All music deleted");
      setSelectedIds([]);
      fetchMusic();
    } catch (err) {
      const error = err as AxiosError;
      console.error("Delete All Error:", error);
      setSelectedIds([]);
      toast.error("Failed to delete all music");
    } finally {
      setLoadingDeleteAll(false);
    }
  }, [fetchMusic]);

  // const handleStatusToggle = useCallback((id: string) => {
  //   const current = statusMap[id];
  //   const newStatus = !current;
  //   setStatusMap(prev => ({ ...prev, [id]: newStatus }));
  //   updateMusicApi(id, { musicStatus: newStatus })
  //     .then(() => {
  //       toast.success("Status updated");
  //       fetchMusic();
  //     })
  //     .catch((err) => {
  //       toast.error("Error updating status");
  //       setStatusMap(prev => ({ ...prev, [id]: current }));
  //     });
  // }, [statusMap, fetchMusic]);

  // const exportSelectedMusic = useCallback(async (ids: string[]) => {
  //   if (!ids || ids.length === 0) {
  //     toast.warning("Please select at least one music file to export.");
  //     return;
  //   }
  //   try {
  //     const response = await exportDownloadMusicCSVApi(ids);
  //     if (!response || response.size === 0) {
  //       toast.warning("Exported file is empty.");
  //       return;
  //     }
  //     setSelectedIds([]);
  //     toast.success("Music CSV downloaded successfully!");
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     console.error("Export Error:", error);
  //     toast.error("Something went wrong");
  //   }
  // }, []);

  // const handleBulkToggle = useCallback(async () => {
  //   if (selectedIds.length === 0) {
  //     toast.warning("Please select at least one music file.");
  //     return;
  //   }
  //   const newStatus = !isBulkActive;
  //   setIsBulkActive(newStatus);
  //   try {
  //     await Promise.all(
  //       selectedIds.map(id => {
  //         const payload = { musicStatus: newStatus };
  //         return updateMusicApi(id, payload);
  //       })
  //     );
  //     toast.success("Bulk status updated");
  //     setStatusMap(prev => {
  //       const updatedMap = { ...prev };
  //       selectedIds.forEach(id => {
  //         updatedMap[id] = newStatus;
  //       });
  //       return updatedMap;
  //     });
  //     setSelectedIds([]);
  //     fetchMusic();
  //   } catch (err) {
  //     const error = err as AxiosError;
  //     console.error("Bulk Status Update Error:", error);
  //     toast.error("Error updating bulk status");
  //     setIsBulkActive(!newStatus);
  //   }
  // }, [isBulkActive, selectedIds, fetchMusic]);

  const clearAllFilters = useCallback(() => {
    setFilter("");
    setStatusFilter("");
  }, []);

  const getPaginationRange = useCallback((totalPages: number, currentPage: number): (number | "...")[] => {
    if (totalPages <= 1) {
      return totalPages === 0 ? [] : [1];
    }
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    let lastPage: number | undefined;

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
    fetchMusic(page);
  }, [fetchMusic]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      fetchMusic(currentPage - 1);
    }
  }, [currentPage, fetchMusic]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      fetchMusic(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchMusic]);

  useEffect(() => {
    if (selectedIds.length === 0) {
      setIsBulkActive(false);
      return;
    }
    const selectedStatuses = filtered
      .filter((item) => selectedIds.includes(item._id!))
      .map((item) => item.musicStatus);
    const allTrue = selectedStatuses.every((status) => status === true);
    const allFalse = selectedStatuses.every((status) => status === false);
    if (allTrue) {
      setIsBulkActive(true);
    } else if (allFalse) {
      setIsBulkActive(false);
    } else {
      setIsBulkActive(null);
    }
  }, [selectedIds, filtered]);

  return (
    <>
      <PageMeta title="Music Management" description="Music admin panel" />
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div ref={formRef}>
          <AddMusicForm
            fetchMusic={fetchMusic}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            toggleAccordion={toggleAccordion}
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
                placeholder="Search Music"
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
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 w-full sm:w-40 mb-2 sm:mb-0">All Music</h3>
          {selectedIds.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
              <div className="flex items-center space-x-3">
                <p className="text-[#847E76] text-sm">{selectedIds.length} Record{selectedIds.length > 1 ? 's' : ''} Selected</p>
                <div className="w-px h-5 bg-[#E0D4C4]" />
                <button onClick={handleSelectAll} className="bg-[#fde3d3] px-2 py-1 rounded text-[#F47521] text-xs font-medium">
                  {selectedIds.length === filtered.length ? 'Unselect All' : 'Select All'}
                </button>
                <button
                  // onClick={() => exportSelectedMusic(selectedIds)}
                  className="bg-[#dcfcd3] px-2 py-1 rounded text-[#43B925] text-xs font-medium"
                >
                  Export {selectedIds.length}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <ToggleSwitchButton
                  value={isBulkActive}
                  // onChange={handleBulkToggle}
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
                <th className="px-4 py-3 w-24 sm:w-40">Music Name</th>
                <th className="px-4 py-3 w-24 sm:w-40">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>
                    <div className="flex justify-center items-center py-6 h-[400px]">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="flex flex-col items-center justify-center h-[400px] space-y-2">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-base text-gray-500">No Music Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id} className="border-b border-[#E0D4C4] text-sm text-gray-700">
                    <td className="px-4 py-3">
                      <CustomCheckbox className="w-4 h-4" checked={selectedIds.includes(item._id!)} onChange={() => setSelectedIds(prev => prev.includes(item._id!) ? prev.filter(i => i !== item._id!) : [...prev, item._id!])} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-4 items-center">
                        <button onClick={() => handleDelete(item._id)} className="w-5 h-5 flex items-center justify-center">
                          {deleteLoadingId === item._id ? (
                            <svg className="animate-spin w-5 h-5 text-[#EB6622]" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                              <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75" />
                            </svg>
                          ) : <DeleteIcon />}
                        </button>
                        {currentlyEditingId === item._id ? (
                          <>
                            <button
                              // onClick={() => handlerUpdateMusic(editData!)}
                              disabled={editLoading}
                              className="text-green-600 hover:text-green-800"
                            >
                              <TickIcon />
                            </button>
                            <button
                              onClick={() => {
                                setCurrentlyEditingId(null);
                                setEditData(null);
                              }}
                              disabled={editLoading}
                              className="text-green-600 hover:text-green-800"
                            >
                              <CrossIcon />
                            </button>
                          </>
                        ) : (
                          <button
                          // onClick={() => handleEditClick(item)}
                          >
                            <EditIcon />
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 w-[150px] sm:w-[250px] break-words">
                      {/* {currentlyEditingId === item._id ? (
                        <CustomInput
                          label=""
                          name="musicName"
                          value={editData?.musicName}
                          onChange={(e) => setEditData((prev) => ({ ...prev!, musicName: e.target.value }))}
                          placeholder="Enter Music Name"
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                      ) : (
                      )} */}
                      {item.musicName}
                    </td>
                    <td className="px-4 py-3">
                      <ToggleSwitchButton
                        value={statusMap[item._id!]}
                        // onChange={() => handleStatusToggle(item._id!)}
                        className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300"
                        classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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

export default MusicPage;