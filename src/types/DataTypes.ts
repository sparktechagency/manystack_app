export interface ICreateInterVention {
  'intervention id'?: string;
  category: string;
  price: string;
  note: string;
  status: string;
}
export interface ICreateExpenses {
  'Expense Name': string;
  category: string;
  price: string;
  note: string;
  status: string;
}
export interface IIntervention {
  invoice_id: string;
  status: string;
  date: string;
  service: string;
  amount: number;
  description: string;
  images: string[];
}
export interface IExpenses {
  name: string;
  status: string;
  date: string;
  service: string;
  amount: number;
  description: string;
  images: string[];
}
export interface IInvoice {
  invoice_id: string;
  status: string;
  date: string;
  service: string;
  amount: number;
}
export interface ISubscription {
  name: string;
  type: string;
  price: string;
  description: string;
}
export interface IInterventionCategoryData {
  name: string;
  price: string;
  id: string;
}
export interface IInterventionCategory {
  'category Name': string;
  'category Price': string;
}
export interface IUserProfile {
  _id: string
  firstName: string
  lastName: string
  gender: string
  email: string
  contact: string
  isBlocked: boolean
  isEmailVerified: boolean
  profilePicture: string | null
  businessLogo: string | null
  role: string
  nSiren: string
  address: {
    streetNo: string
    streetName: string
    city: string
    postalCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
  __v: number
}