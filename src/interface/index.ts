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
  // types/index.ts
export interface IBankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountTitle: string;
  openingBalance: number;
  currentBalance: number;
}

export interface ITransaction {
  id: number;
  date: string;
  bankAccountId: number;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  referenceNo?: string;
}

export interface ISite {
  id: number;
  siteName: string;
  location: string;
  clientName: string;
  startDate: string;
  expectedEndDate: string;
  status: "Ongoing" | "Completed" | "Hold";
  projectBudget: number;
  siteAdmin: string;
  documents: string[];
}

export interface IReceipt {
  id: number;
  date: string;
  siteId: number;
  siteName: string;
  amount: number;
  paymentMode: "Cash" | "Bank" | "Online";
  referenceNumber: string;
  remarks: string;
}

export interface IHeadOfficeExpense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMode: string;
  attachment?: string;
}

export interface IHomeExpense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMode: string;
}

export interface IPettyExpense {
  id: number;
  date: string;
  site: string;
  expenseHead: string;
  description: string;
  amount: number;
  bill?: string;
}

export interface ISiteAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
  assignedSites: string[];
  permissions: string[];
}

export interface IAuditLog {
  id: number;
  userId: number;
  userName: string;
  action: string;
  timestamp: string;
  ipAddress?: string;
  details?: string;
}