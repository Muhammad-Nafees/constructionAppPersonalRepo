import { useState } from "react";
import AddCompanyModal from "../../components/sharedComponents/AddCompanyModal";
import { IAllCompanies } from "../../interface";
import CompanyCard from "../../components/reusableComponents/CompanyCard";


const Companies = () => {


  const [isOpenAddCompanyModal, setIsOpenAddCompanyModal] = useState<boolean>(false);
  const [addCompanyData, setIsAddCompanyData] = useState({
    companyName: "",
    emailAddress: "",
    password: "",
    totalCapital: ""
  });
  const [allCompanies, setAllCompanies] = useState<IAllCompanies[]>([]);
  console.log("🚀 ~ Companies ~ addCompanyData:", addCompanyData);



  return (
    <div className="min-h-screen">
      <div className="flex  gap-2 items-center justify-between">

        <div>
          <p className="text-black text-[30px] font-semibold">Companies</p>
          <p className="text-gray-500 text-sm mt-2">Manage construction companies and their details</p>
        </div>

        <div onClick={() => { setIsOpenAddCompanyModal(true) }} 
         className="flex px-4 py-2 bg-[#F47521] text-white rounded-lg hover:bg-[#E65024] transition-colors flex items-center gap-2"
         >
          <button className="flex items-center">
           <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
             <path d="M10 4V16M16 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
           </svg>
           Add New Company
         </button>

    
        </div>




        {
          isOpenAddCompanyModal && <AddCompanyModal
            isOpen={isOpenAddCompanyModal}
            onClose={() => setIsOpenAddCompanyModal(false)}
            addCompanyData={addCompanyData}
            setAddCompanyData={setIsAddCompanyData}
            allCompanies={allCompanies}
            setAllCompanies={setAllCompanies}
          />
        }




      </div>
      <div className="flex gap-10 mt-10 flex-wrap">
        {
          allCompanies?.map((item: IAllCompanies, index) => (
            <CompanyCard key={index} company={item} />
          ))
        }
      </div>


    </div>
  )
};

export default Companies;