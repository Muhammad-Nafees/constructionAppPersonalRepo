import { useEffect, useMemo, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import AddIncentiveForm from "../../components/form/AddIncentiveForm/AddIncentiveForm";
import { AddIncentivesValues } from "../../interface";
import { deleteIncentivesApi, getIncentivesApi, updateIncentiveApi } from "../../../services/incentives";
import { AxiosError } from "axios";
import { useAuth } from "../../context/AuthContext";
import AccendingArrow from "../../components/svg/AccendingArrow";
import DescendingArrow from "../../components/svg/DescendingArrow";
import EditIcon from "../../components/svg/EditIcon";
import { toast } from "react-toastify";
import SearchBarIcon from "../../components/svg/SearchBarIcon";
import FilterIcon from "../../components/svg/FilterIcon";
import debounce from "lodash/debounce";
import AddCelebrityForm from "../../components/form/addCelebrity-form/AddCelebrityForm";

const CelebrityPage = () => {
  const [loading, setLoading] = useState(false);
  const [incentivesData, setAddIncentivesData] = useState<AddIncentivesValues[]>([]);
  const { addIncentivesFormData } = useAuth();
  const [deletenIncentivesIdsData, setDeletenIncentivesIdsData] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterValue, setFilterValue] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [editData, setEditData] = useState<AddIncentivesValues | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  console.log("🚀 ~ Incentives ~ editData:", editData)
  const formRef = useRef<HTMLDivElement | null>(null);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setDebouncedFilter(value), 300),
    []
  );

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setFilterValue(value);
  //   debouncedSearch(value);
  // };

  // const handleCheckboxChange = (index: number) => {
  //   setDeletenIncentivesIdsData((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );
  // };

  // const handleSort = (order: "asc" | "desc") => {
  //   setSortOrder(order);
  // };

  // const handleEditClick = (item: AddIncentivesValues) => {
  //   setEditData(item);
  //   setTimeout(() => {
  //     formRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 100);
  // };

  // const handlerDeleteIncentives = async () => {
  //   try {
  //     const response = await deleteIncentivesApi(deletenIncentivesIdsData);
  //     getIncentivesData();
  //     toast.success("Deleted successfully!");
  //     setDeletenIncentivesIdsData([]);
  //     return response;
  //   } catch (err) {
  //     console.log("Error deleting incentives:", err);
  //     toast.error("Error deleting incentives");
  //   }
  // };



  // const getIncentivesData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getIncentivesApi();
  //     let sortedData = [...(response?.incentivesData || [])];
  //     sortedData.sort((a, b) => {
  //       const timeA = new Date(a.createdAt).getTime();
  //       const timeB = new Date(b.createdAt).getTime();
  //       return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
  //     });
  //     setAddIncentivesData(sortedData);
  //   } catch (error: unknown) {
  //     const axiosError = error as AxiosError<{ message: string }>;
  //     console.log("Error fetching incentives:", axiosError);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getIncentivesData();
  // }, [addIncentivesFormData, sortOrder]);

  // useEffect(() => {
  //   return () => {
  //     debouncedSearch.cancel();
  //   };
  // }, []);



  // const filteredIncentives = incentivesData.filter((item) => {
  //   const searchText = debouncedFilter.toLowerCase().replace(/\s+/g, '');
  //   const fields = [
  //     item.incentives,
  //     item.gender,
  //     item.incentivesMood,
  //     item.incentivesNature,
  //   ];

  //   return fields.some(field =>
  //     field.toLowerCase().replace(/\s+/g, '').includes(searchText)
  //   );
  // });



  return (
    <>
      <PageMeta title="FameOflame" description="FameOflame admin panel" />

      <div className="w-[90%] mx-auto space-y-6">
        {/* <div ref={formRef}> */}
        <AddCelebrityForm />

        {/* <AddIncentiveForm
            editingData={editData}
            onEditSubmit={(data) => editData && handlerUpdateIncentives(editData._id, data)}
            editLoading={editLoading}
          /> */}
        {/* </div> */}

        <div className="bg-[#FFF6EB] px-6 flex items-center justify-between py-4 ">
          <div className="flex space-x-2">
            <button type="button">
              <FilterIcon />
            </button>
            <p className="text-black text-lg">Filter</p>
          </div>

          <div className="flex bg-red-300 items-center justify-center space-x-4">
            <div className="flex-shrink-0 w-4/4 p-[2px] bg-gradient-to-r from-orange-600 to-orange-400">
              <div className="flex items-center bg-white overflow-hidden">
                {/* <input
                  value={filterValue}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 focus:outline-none"
                />
                <button type="button" className="px-3 flex items-center justify-center">
                  <SearchBarIcon />
                </button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">All Celebrities</h3>
          {deletenIncentivesIdsData.length > 0 && (
            <div className="flex justify-end">
              {/* <button
                onClick={handlerDeleteIncentives}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button> */}
            </div>
          )}
        </div>



        <div className="relative border border-[#E0D4C4] overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4]">
              <tr className="text-[#BB501C] text-sm font-semibold">
                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-64">
                  <div className="flex items-center space-x-4">
                    <span>Celebrity Image</span>
                    <div className="flex leading-none">
                      {/* <button type="button" onClick={() => handleSort("asc")}><AccendingArrow /></button>
                      <button type="button" onClick={() => handleSort("desc")}><DescendingArrow /></button> */}
                    </div>
                  </div>
                </th>
                <th className="px-4 py-3 w-40">Celebrity Name</th>
                <th className="px-4 py-3 w-60">Celebrity Gender</th>
                <th className="px-4 py-3 w-40">Profession/Nationality</th>
              </tr>
            </thead>
            <tbody>

              <tr className="border-b border-[#E0D4C4] text-sm text-gray-700 ">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                    // checked={deletenIncentivesIdsData.includes(item._id)}
                    // onChange={() => handleCheckboxChange(item._id)}
                    />
                    <button
                    // onClick={() => handleEditClick(item)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="w-[250px] break-words">{'item?.incentives'}</p>
                </td>
                <td className="px-4 py-3">{'item?.CelebName'}</td>
                <td className="px-4 py-3">{'item?.CelebGender'}</td>
                <td className="px-4 py-3">{'item?.profession'}</td>
              </tr>

            </tbody>

          </table>
        </div>




        {/* <div className="relative border border-[#E0D4C4] overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4]">
              <tr className="text-[#BB501C] text-sm font-semibold">
                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-64">
                  <div className="flex items-center space-x-4">
                    <span>Celebrity Image</span>
                    <div className="flex leading-none">
                      {/* <button type="button" onClick={() => handleSort("asc")}><AccendingArrow /></button>
                      <button type="button" onClick={() => handleSort("desc")}><DescendingArrow /></button> */}
        {/* </div>
                  </div>
                </th>
                <th className="px-4 py-3 w-40">Celebrity Name</th>
                <th className="px-4 py-3 w-60">Celebrity Gender</th>
                <th className="px-4 py-3 w-40">Profession/Nationality</th>
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
              ) : incentivesData.length === 0 ? ( */}
        {/* // No data created yet  */}
        {/* <tr>
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
              ) : ( */}
        {/* filteredIncentives.map((item, index) => (
                  <tr key={index} className="border-b border-[#E0D4C4] text-sm text-gray-700 ">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        {/* <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={deletenIncentivesIdsData.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                        <button onClick={() => handleEditClick(item)}>
                          <EditIcon />
                        </button> */}
        {/* </div>
                    </td>
                      <td className="px-4 py-3">
                      <p className="w-[250px] break-words">{item?.incentives}</p>
                    </td>
                    <td className="px-4 py-3">{item?.gender}</td>
                    <td className="px-4 py-3">{item?.incentivesMood}</td>
                    <td className="px-4 py-3">{item?.incentivesNature}</td>  
                  </tr>
                ))
              )}
            </tbody> */}

        {/* </table> */}
        {/* </div>  */}
      </div>
    </>
  );
};

export default CelebrityPage;