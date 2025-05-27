export interface ICreateInterVention {
  "intervention id"?: string;
  category: string;
  price: string;
  note: string;
  status: string;
}
export interface ICreateExpenses {
  "Expense Name": string;
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