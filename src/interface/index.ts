export interface SignInValues {
  email: string;
  password: string;
};

export interface IUserData {
  name: string;
  email: string;
  _id: string;
  role: string
};


export interface ICreateAdminValues {
  name: string;
  email: string;
  password: string;
};

export type AddIncentivesPayload = {
  incentives: string;
  gender: string;
  incentivesMood: string;
  incentivesNature: string;
  incentiveStatus: boolean;
  // category: string;
  // badnessLevel: string;
};

export type AddIncentivesValues = {
  incentives: string;
  gender: string,
  incentivesMood: string,
  incentivesNature: string;
  incentiveStatus: boolean;
  _id?: any
};


export interface CelebritiesValuesSchema {
  _id?: string;
  celebrityImage?: { url: string; filename: string; _id?: string } | null;
  celebrityName: string;
  celebrityGender: string;
  celebrityProfession: string;
  celebrityStatus: boolean;
  createdAt?: string;
  updatedAt?: string;
  isBulkUploaded?: boolean;
};

export interface MusicValuesSchema {
  _id?: string;
  musicName?: string;
  musicStatus: boolean;
  musicFile?: { url: string; filename: string } | null;
  createdAt?: string;
}