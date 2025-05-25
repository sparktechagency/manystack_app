export interface ICreateInterVention {
  interventionId: string;
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
