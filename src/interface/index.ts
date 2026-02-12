export interface IAllCompanies{
    
      companyName:string,
      emailAddress:string,
      password:string,
      totalCapital:number
    
};

// interface/index.ts
export interface IAllSites {
    _id?: string;
    companyId: string;
    companyName: string;
    siteName: string;
    location: string;
    description: string;
    allocatedCapital: number;
    status: 'Active' | 'Inactive' | 'On Hold';
    createdAt?: Date;
    updatedAt?: Date;
  }