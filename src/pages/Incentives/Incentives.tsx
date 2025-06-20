import PageMeta from "../../components/common/PageMeta";
// import { useState } from "react";
// import { AddIncentivesPayload } from "../../interface";
// import AddIncentiveForm from "../../components/form/AddIncentiveForm/AddIncentiveForm";




// type Incentive = {
//   text: string;
// };


const Incentives = () => {

  // const [incentives, setIncentives] = useState<Incentive[]>([
  //   { text: "" }
  // ]);

  // const handleInputChange = (index: number, value: string) => {
  //   const updated = [...incentives];
  //   updated[index].text = value;
  //   setIncentives(updated);
  // };



  // useEffect(() => {
  //   const getAllAdmins = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await getAdmins();
  //       setLoading(false);
  //       if (response) {
  //         setAdminsData(response.data?.admins)
  //       };

  //       console.log("🚀 ~ getAllAdmins ~ response:", response.data);
  //       return response;
  //     } catch (error) {
  //       setLoading(false);
  //       console.log("🚀 ~ getAdminsList ~ error:", error)
  //       throw error;
  //     }
  //   };
  //   getAllAdmins()
  // }, [deleteAdminData, adminRegisterFormData])


  // const addIncentivesData = async (values: AddIncentivesPayload) => {
  //   console.log("🚀 ~ addIncentivesData ~ values:", values);
  //   try {

  //   } catch (error) {
  //     console.log("🚀 ~ addIncentivesData ~ error:", error)
  //   }
  // }


  // const addIncentiveField = () => {
  //   setIncentives([...incentives, { text: "" }]);
  // };


  // const deleteIncentive = async (id: string) => {
  //   try {
  //     // const response = await deleteAdmin(id);
  //     // setDeleteAdminData(response.data);
  //     // console.log("🚀 ~ deletAdmin ~ response:", response);
  //     // return response;
  //   } catch (error) {
  //     console.log("🚀 ~ deleteIncentive ~ error:", error)
  //     throw error;
  //   }
  // };





  return (
    // <div className="flex justify-center items-center  h-screen w-full">
    //   <p className="text-[80px] text-center">Incentives Coming Soon</p>
    // </div>
    <>
      <PageMeta
        title="FameOflame"
        description="This is FameOflame admin panel where admin can make CRUD operations to sub admins and incentives and Images gallery as well"
      />

<div className="flex justify-center items-center  h-screen w-full">
        <p className="text-[80px] text-center">Incentives Coming Soon</p>
      </div>

      {/* <FormElements /> */}
      {/* <div className="grid grid-cols-1 gap-6 py-4">
        <div className="space-y-6">
          <AddIncentiveForm />

        </div>
      </div> */}


      {/* <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
         <div className="flex flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">All Incentives</h3>
          </div>
        </div>

         <div className="max-w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="px-6 py-3.5 border-y border-gray-100 bg-gray-50 dark:border-white/[0.05] dark:bg-gray-900">
              <tr>
                <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Incentives</td>
                <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Category</td>
                <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Created At</td>
                <td className="px-6 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 text-start">Badness level</td>
              </tr>
            </thead>


          </table>
        </div>
      </div> */}

    </>


)
}

export default Incentives;

            {/* <tbody>
              {
                loading ? (
                  <tr>
                    <td colSpan={4}>
                      <div className="w-10 h-10 mx-auto my-4 rounded-full bg-red-300 flex justify-center items-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  adminsData.length === 0 ?
                    <tr>
                      <td colSpan={4}>
                        <div className="flex justify-center py-10">
                          <p className="text-center text-[24px]">No sub admins created yet</p>
                        </div>
                      </td>
                    </tr>
                    :
                    adminsData?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 sm:px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-error-100 text-error-600">
                              <span className="text-sm font-medium">{item?.name[0].toUpperCase()}</span>
                            </div>
                            <div>
                              <span className="block font-medium text-theme-sm text-gray-700 dark:text-gray-400">{item?.name}</span>
                              <span className="text-theme-sm text-gray-500 dark:text-gray-400">{item?.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 sm:px-6 py-3.5">
                          <p className="text-theme-sm text-gray-700 dark:text-gray-400">
                            {moment(item?.createdAt).format('YYYY-MM-DD')}
                          </p>
                        </td>

                        <td className="px-4 sm:px-6 py-3.5">
                          <p className="text-theme-sm text-gray-700 dark:text-gray-400">{item?.role}</p>
                        </td>

                        <td className="px-4 sm:px-6 py-3.5">
                          <button
                            onClick={() => deleteSubAdmin(item._id)}
                          >
                            <svg
                              width="1em"
                              height="1em"
                              viewBox="0 0 20 20"
                              fill="none"
                              className="text-gray-700 cursor-pointer size-5 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.541 3.792c0-1.243 1.007-2.25 2.25-2.25h2.417c1.243 0 2.25 1.007 2.25 2.25V4.042h2.167h1.041a.75.75 0 010 1.5h-.291v10.667c0 1.243-1.008 2.25-2.25 2.25H5.875a2.25 2.25 0 01-2.25-2.25V5.542h-.291a.75.75 0 010-1.5h1.042h2.166V3.792z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                )
              }
            </tbody> */}