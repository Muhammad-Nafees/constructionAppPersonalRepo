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


export type CelebritiesValuesSchema = {
  celebrityName: string;
  celebrityGender: string;
  celebrityProfession: string;
  celebrityImage: string;
};