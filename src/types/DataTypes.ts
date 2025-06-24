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
}
export interface IIntervention {
  _id: string;
  interventionId: string;
  status: string;
  createdAt: string;
  category: {
    name: string;
    _id: string;
  };
  price: number;
  note: string;
  images: [{
    createdAt: string
    url: string,
    location: string
  }] | [];
}
export interface IExpenses {
  createdAt: string;
  expenseCategory: string;
  expenseName: string;
  images: [{
    createdAt: string
    url: string,
    location: string
  }] | [];
  note: string;
  price: number;
  updatedAt: string;
  user: string
  _id: string
}
export interface IInvoice {
  "address": {
    "streetNo": string,
    "streetName": string,
    "city": string,
    "postalCode": string,
    "country": string
  },
  "services": {
    "selectedService": string,
    "quantity": number,
    "price": number
  },
  "_id": string,
  "name": string,
  "email": string
  "phone": string
  "nSiren": string
  "status": string
  "user": {
    "_id": string
    "email": string,
    "nSiren": string
  },
  "data": string,
  "createdAt": string,
  "updatedAt": string,
  "invoiceId": string,
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