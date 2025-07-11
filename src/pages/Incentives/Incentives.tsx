import { useEffect, useMemo, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import AddIncentiveForm from "../../components/form/AddIncentiveForm/AddIncentiveForm";
import { AddIncentivesValues } from "../../interface";
import { deleteAllIncentivesApi, deleteIncentivesApi, getIncentivesApi, updateIncentiveApi } from "../../../services/incentives";
import { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import AccendingArrow from "../../components/svg/AccendingArrow";
import DescendingArrow from "../../components/svg/DescendingArrow";
import EditIcon from "../../components/svg/EditIcon";
import { toast } from "react-toastify";
import SearchBarIcon from "../../components/svg/SearchBarIcon";
import debounce from "lodash/debounce";
import CustomCheckbox from "../../components/reusableComponents/CustomCheckBox";
import ToggleSwitchButton from "../../components/reusableComponents/ToggleSwitchButton";
import DeleteIcon from "../../components/svg/DeleteIcon";
import TrashIcon from "../../components/svg/TrashIcon";



const Incentives = () => {
  const [loading, setLoading] = useState(false);
  const [incentivesData, setAddIncentivesData] = useState<AddIncentivesValues[]>([]);
  const { addIncentivesFormData } = useAuth();
  const [IncentivesIdsData, setIncentivesIdsData] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterValue, setFilterValue] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [editData, setEditData] = useState<AddIncentivesValues | null>(null);
  const [isActiveIncentives, setIsActiveIncentives] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [loadingDeleteAllIncentives, setLoadingDeletAllIncentives] = useState(false)
  const [statusMap, setStatusMap] = useState<Record<string, boolean>>({});
  // console.log("🚀 ~ Incentives ~ isActiveIncentives:", isActiveIncentives)
  const [editLoading, setEditLoading] = useState(false);

  const formRef = useRef<HTMLDivElement | null>(null);



  const toggleAccordionEdit = (key: string) => {
    // If we're in edit mode, ignore toggle
    if (editData) return;
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const handleSelectAll = () => {
    if (IncentivesIdsData.length === filteredIncentives.length) {
      setIncentivesIdsData([]);
    } else {
      setIncentivesIdsData(filteredIncentives.map((item) => item._id));
    }
  };



  const toggleAccordion = (key: string) => {
    setActiveAccordion(activeAccordion === key ? null : key);
  };

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setDebouncedFilter(value), 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterValue(value);
    debouncedSearch(value);
  };

  const handleCheckboxChange = (index: number) => {
    setIncentivesIdsData((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleEditClick = (item: AddIncentivesValues) => {
    console.log("🚀 ~ handleEditClick ~ item:", item)
    setEditData(item);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handlerDeleteIncentives = async (id: any) => {
    try {
      const response = await deleteIncentivesApi(id ? [id] : IncentivesIdsData);
      getIncentivesData();
      toast.success("Deleted successfully!");
      setIncentivesIdsData([]);
      return response;
    } catch (err) {
      console.log("Error deleting incentives:", err);
      toast.error("Error deleting incentives");
    }
  };

  

  const handlerUpdateIncentives = async (id: string, values: AddIncentivesValues) => {
    setEditLoading(true);
    try {
      const response = await updateIncentiveApi(id, values);
      toast.success("Incentive updated successfully!");
      setEditData(null);
      setEditLoading(false);
      getIncentivesData();
      return response;
    } catch (err) {
      console.log("Error updating incentive:", err);
      toast.error("Error updating incentive");
      setEditLoading(false);
    }
  };



  const getIncentivesData = async () => {
    setLoading(true);
    try {
      const response = await getIncentivesApi();
      let sortedData = [...(response?.incentivesData || [])];
      sortedData.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      });
      setAddIncentivesData(sortedData);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log("Error fetching incentives:", axiosError);
    } finally {
      setLoading(false);
    }
  };



  const deleteIncentivesData = async () => {
    setLoadingDeletAllIncentives(true);
    try {
      const response = await deleteAllIncentivesApi();
      toast.success("Incentives deleted successfully!");
      getIncentivesData();
      setLoadingDeletAllIncentives(false);
      return response;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log("Error fetching incentives:", axiosError);
    } finally {
      setLoadingDeletAllIncentives(false);
    }
  };


  const handlerBulkToggleStatus = async () => {
    const newStatus = !isActiveIncentives;

    // 1️⃣ Immediate UI feedback
    setIsActiveIncentives(newStatus);

    // 2️⃣ Run API after transition
    setTimeout(async () => {
      try {
        await Promise.all(
          IncentivesIdsData.map((id) =>
            updateIncentiveApi(id, { incentiveStatus: newStatus })
          )
        );
        toast.success("Status updated successfully!");
        setIsActiveIncentives(false);

        getIncentivesData();
      } catch (error) {
        toast.error("Error updating status");

        // 3️⃣ Optional: Revert toggle if API fails
        setIsActiveIncentives(!newStatus);
      }
    }, 300); // Wait for 300ms animation to complete
  };

  const handleToggleStatus = async (id: string) => {
    const current = statusMap[id];
    const updatedMap = { ...statusMap, [id]: !current };

    // 1. Immediate UI update
    setStatusMap(updatedMap);

    // 2. API call
    try {
      await updateIncentiveApi(id, { incentiveStatus: !current });
      toast.success("Status updated");
      getIncentivesData(); // optional if you want to refresh from server
    } catch (err) {
      toast.error("Error updating status");
      // 3. Revert toggle on error
      setStatusMap((prev) => ({ ...prev, [id]: current }));
    }
  };

  useEffect(() => {
    const initialMap: Record<string, boolean> = {};
    incentivesData.forEach((item) => {
      initialMap[item._id] = item.incentiveStatus;
    });
    setStatusMap(initialMap);
  }, [incentivesData]);


  // deleteAllIncentives
  useEffect(() => {
    getIncentivesData();
  }, [addIncentivesFormData, sortOrder]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);



  const filteredIncentives = incentivesData.filter((item) => {
    const searchText = debouncedFilter.toLowerCase().replace(/\s+/g, '');
    const fields = [
      item.incentives,
      item.gender,
      item.incentivesMood,
      item.incentivesNature,
    ];

    return fields.some(field =>
      field.toLowerCase().replace(/\s+/g, '').includes(searchText)
    );
  });



  return (
    <>
      <PageMeta title="FameOflame" description="FameOflame admin panel" />

      <div className="w-[90%] mx-auto space-y-6">
        <div ref={formRef}>
          <AddIncentiveForm
            editingData={editData}
            onEditSubmit={(data) => editData && handlerUpdateIncentives(editData._id, data)}
            editLoading={editLoading}
            setEditData={setEditData}
            activeAccordion={activeAccordion}
            setActiveAccordion={setActiveAccordion}
            toggleAccordion={toggleAccordion}
            getIncentivesData={getIncentivesData}
          />
        </div>



        <div className="bg-[#FFF6EB] px-6 flex items-center justify-between py-4 ">
          <div className="flex space-x-2">
            {/* <button type="button">
              <FilterIcon />
            </button> */}
            <p className="text-black text-lg">Filter</p>
          </div>



          <div className="flex bg-red-300 items-center justify-center space-x-4">
            <div className="flex-shrink-0 w-4/4 p-[2px] bg-gradient-to-r from-orange-600 to-orange-400">
              <div className="flex items-center bg-white overflow-hidden">
                <input
                  value={filterValue}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 focus:outline-none"
                />
                <button type="button" className="px-3 flex items-center justify-center">
                  <SearchBarIcon />
                </button>
              </div>
            </div>
          </div>
        </div>



        <div className="flex items-center justify-between mb-4">
          {/* Left side: Title */}
          <h3 className="text-lg font-semibold text-gray-800 w-40">All Incentives</h3>

          {/* Right side: Actions only if items selected */}
          {IncentivesIdsData.length > 0 && (
            <div className="flex items-center justify-between w-full">

              <div className="flex items-center space-x-3">
                {/* X Records Selected */}
                <p className="text-[#847E76] text-sm">
                  {IncentivesIdsData.length} Record{IncentivesIdsData.length > 1 && 's'} Selected
                </p>

                {/* Vertical Divider */}
                <div className="w-px h-5 bg-[#E0D4C4]" />

                {/* Select All */}
                <button
                  onClick={handleSelectAll}
                  className="bg-[#fde3d3] px-2 py-1 rounded"
                >
                  <p className="text-[#F47521] text-xs font-medium">
                    {IncentivesIdsData.length === filteredIncentives.length ? 'Unselect All' : 'Select All'}
                  </p>
                </button>


                {/* Export */}
                <button className="bg-[#dcfcd3] px-2 py-1 rounded">
                  <p className="text-[#43B925] text-xs font-medium">Export {IncentivesIdsData.length}</p>
                </button>

                {/* Optional Delete Button */}
              </div>



              <div className="flex items-center space-x-3">
                {/* X Records Selected */}
                <ToggleSwitchButton
                  value={isActiveIncentives}
                  onChange={handlerBulkToggleStatus}
                  label="Active"
                  className="w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300 "
                  classNameKnob="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 "
                />

                {/* Vertical Divider */}
                <div className="w-px h-5 bg-[#E0D4C4]" />
                {/* Select All */}
                {/* <button onClick={deleteIncentivesData} className="flex gap-2 items-center justify-center px-2 py-1 rounded">
                  <div className="bg-[#EF2222] w-6 h-6 rounded flex justify-center items-center ">
                    <TrashIcon />
                  </div>
                  <p className="text-[#F47521] text-xs font-medium">Delete All</p>
                </button> */}
                <button
                  onClick={deleteIncentivesData}
                  disabled={loadingDeleteAllIncentives}
                  className={`flex gap-2 items-center justify-center px-2 py-1 rounded ${loadingDeleteAllIncentives ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  <div className="bg-[#EF2222] w-6 h-6 rounded flex justify-center items-center">
                    {loadingDeleteAllIncentives ? (
                      // Replace this with any spinner component if you use one, or keep it simple
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                    ) : (
                      <TrashIcon />
                    )}
                  </div>
                  <p className="text-[#F47521] text-xs font-medium">
                    {loadingDeleteAllIncentives ? 'Deleting...' : 'Delete All'}
                  </p>
                </button>

                {/* Export */}
                {/* <button className="bg-[#FCE3D4] px-2 py-1 rounded">
                  <p className="text-[#43B925] text-xs font-medium">Export {IncentivesIdsData.length}</p>
                </button> */}

                {/* Optional Delete Button */}
              </div>
            </div>

          )}
        </div>

        {/* <button
                onClick={handlerDeleteIncentives}
                className="bg-red-500 px-3 py-1 rounded text-white text-sm hover:bg-red-600"
              >
                Delete
              </button> */}



        <div className="relative border border-[#E0D4C4] overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4]">
              <tr className="text-[#BB501C] text-sm font-semibold">
                <th className="px-4 py-3 w-28">
                  <CustomCheckbox className="w-4 h-4" checked={IncentivesIdsData.length === filteredIncentives.length} onChange={handleSelectAll} />
                </th>



                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-64">
                  <div className="flex items-center space-x-4">
                    <span>Incentive</span>
                    <div className="flex leading-none">
                      <button type="button" onClick={() => handleSort("asc")}><AccendingArrow /></button>
                      <button type="button" onClick={() => handleSort("desc")}><DescendingArrow /></button>
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
                  <td colSpan={5}>
                    <div className="flex justify-center py-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : incentivesData.length === 0 ? (
                // No data created yet 
                <tr>
                  <td colSpan={5}>
                    <div className="flex justify-center py-10">
                      <p className="text-[20px]">No Incentives Created Yet</p>
                    </div>
                  </td>
                </tr>
              ) : filteredIncentives.length === 0 ? (
                // Data exists but no match found
                <tr>
                  <td colSpan={5}>
                    <div className="flex justify-center py-10">
                      <p className="text-[20px]">No Incentives Found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredIncentives.map((item, index) => (
                  <tr key={index} className="border-b border-[#E0D4C4] text-sm text-gray-700 ">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <CustomCheckbox
                          className="w-4 h-4"
                          checked={IncentivesIdsData.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                      </div>
                    </td>


                    {/* <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={IncentivesIdsData.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        /> */}
                    {/* <CustomCheckbox
                          className="w-4 h-4"
                          checked={IncentivesIdsData.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        /> */}
                    {/* <button onClick={() => handleEditClick(item)}>
                          <EditIcon />
                        </button> */}



                    <td className="px-4 py-3 space-x-2">

                      <button onClick={() => handlerDeleteIncentives(item._id)}>
                        <DeleteIcon />
                      </button>

                      <button onClick={() => {
                        handleEditClick(item)
                        toggleAccordionEdit("addnew")
                      }}>
                        <EditIcon />
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <p className="w-[250px] break-words">{item?.incentives}</p>
                    </td>
                    <td className="px-4 py-3">{item?.gender}</td>
                    <td className="px-4 py-3">{item?.incentivesMood}</td>
                    <td className="px-4 py-3">{item?.incentivesNature}</td>
                    <td className="px-4 py-3">
                      <ToggleSwitchButton
                        value={statusMap[item._id]} // get initial or updated value
                        onChange={() => handleToggleStatus(item._id)}
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



      </div>
    </>
  );
};

export default Incentives;