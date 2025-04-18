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
}

export type AddIncentivesPayload = {
  incentives: string;
  category: string;
  badnessLevel: string;
};