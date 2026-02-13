export interface IAllCompanies{
    
      _id?: string,
      companyName:string,
      emailAddress:string,
      password?:string,
      sites:number,
      admins:number,
      totalCapital:number,
      totalExpenses:number
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