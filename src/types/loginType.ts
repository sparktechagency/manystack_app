export interface ILogin {
  email: string;
  password: string;
}
export interface IForget {
  email: string;
}
export interface ISignUp {
  "first name": string;
  "last name": string;
  email: string;
  contact: string;
  gender: string;
  "N°SIREN": string;
  address: string;
  password: string;
  confirmPassword: string;
}
export interface IAddress {
  streetNo: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface INewPassword {
  password: string;
  confirmPassword: string;
}