// import { useEffect, useMemo, useRef, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
//  import { AddIncentivesValues, CelebritiesValuesSchema } from "../../interface";
// import { deleteCelebritiesApi, getCelebritiesApi } from "../../../services/celebrities";
// import { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { useGlobal } from "../../context/GlobalMainContext";
 
// import debounce from "lodash/debounce";

const CelebrityPage = () => {
  // const [loading, setLoading] = useState(false);
  // const [celebritiesData, setCelebritiesData] = useState<AddIncentivesValues[]>([]);
  // const [deleteIds, setDeleteIds] = useState<number[]>([]);
  // const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  // const [filterValue, setFilterValue] = useState("");
  // const [debouncedFilter, setDebouncedFilter] = useState("");
  // const [editCelebritiesData, setEditCelebritiesData] = useState<CelebritiesValuesSchema | null>(null);
  // const { celebritiesDataContext } = useGlobal();
  // const formRef = useRef<HTMLDivElement | null>(null);

  // const debouncedSearch = useMemo(() => debounce(setDebouncedFilter, 300), []);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   // setFilterValue(value);
  //   debouncedSearch(value);
  // };
 
 

  // const getCelebritiesData = async () => {
  //   // setLoading(true);
  //   try {
  //     const response = await getCelebritiesApi();
  //     const sortedData = [...(response?.data || [])].sort((a, b) => {
  //       const timeA = new Date(a.createdAt).getTime();
  //       const timeB = new Date(b.createdAt).getTime();
  //       return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
  //     });
  //     setCelebritiesData(sortedData);
  //   } catch (error) {
  //     const axiosError = error as AxiosError<{ message: string }>;
  //     console.error("Error fetching celebrities:", axiosError);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };



  // useEffect(() => {
  //   getCelebritiesData();
  // }, [celebritiesDataContext, sortOrder]);

  // useEffect(() => () => debouncedSearch.cancel(), []);

  // const filteredCelebrities = (celebritiesData || []).filter((item: any) => {
  //   const searchText = debouncedFilter.toLowerCase().replace(/\s+/g, "");
  //   const fields = [item.celebrityName, item.celebrityGender, item.professionNationality];
  //   return fields.some((field) => field?.toLowerCase().replace(/\s+/g, "").includes(searchText));
  // });



  return (
    <>
      <PageMeta title="FameOflame" description="FameOflame admin panel" />

      {/* <div className="w-[90%] mx-auto space-y-6">
        <AddCelebrityForm />

        <div className="bg-[#FFF6EB] px-6 flex items-center justify-between py-4 ">
          <div className="flex space-x-2">
            <button type="button"><FilterIcon /></button>
            <p className="text-black text-lg">Filter</p>
          </div>

          <div className="flex items-center justify-center space-x-4">
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

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">All Celebrities</h3>
          {deleteIds.length > 0 && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>

        <div className="relative border border-[#E0D4C4] overflow-x-auto min-h-[200px] max-h-[400px] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#FDF6EE] border-b border-[#E0D4C4]">
              <tr className="text-[#BB501C] text-sm font-semibold">
                <th className="px-4 py-3 w-12">Actions</th>
                <th className="px-4 py-3 w-24">
                  <div className="flex items-center space-x-4">
                    <span>Celebrity Image</span>
                    <div className="flex leading-none">
                      <button onClick={() => handleSort("asc")}><AccendingArrow /></button>
                      <button onClick={() => handleSort("desc")}><DescendingArrow /></button>
                    </div>
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
              ) : filteredCelebrities.length > 0 ? (
                filteredCelebrities.map((celebrity: any, index: number) => (
                  <tr key={celebrity._id || index} className="border-b border-[#E0D4C4] text-sm text-gray-700">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <CustomCheckbox
                          className="w-4 h-4"
                          checked={deleteIds.includes(celebrity._id)}
                          onChange={() => handleCheckboxChange(celebrity._id)}
                        />
                        <button onClick={() => handleEditClick(item)}>
                          <EditIcon />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {celebrity.images?.[0]?.url ? (
                        <img
                          src={celebrity.images[0].url}
                          alt={celebrity.images[0].filename}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{celebrity.celebrityName || '—'}</td>
                    <td className="px-4 py-3">{celebrity.celebrityGender || '—'}</td>
                    <td className="px-4 py-3">{celebrity.professionNationality || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="flex justify-center py-10">
                      <p className="text-[20px]">No Celebrities Found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}

      <div className="flex justify-center items-center  h-screen w-full">
        <p className="text-[80px] text-center">Celebrities Coming Soon</p>
      </div>

    </>
  );
};

export default CelebrityPage;