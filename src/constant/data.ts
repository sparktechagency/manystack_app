import { IExpenses, IIntervention, IInvoice } from '../types/DataTypes';

export const genderData = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' },
];
export const paymentStatus = [
  { label: 'Paid', value: 'paid' },
  { label: 'Unpaid', value: 'unpaid' },
];
export const interventionFilter = [
  { label: 'PLP', value: 'PLP' },
  { label: 'After sell service', value: 'After sell service' },
];

export const intervention: IIntervention[] = [
  {
    invoice_id: 'INT-20250507-001',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    invoice_id: 'INT-20250507-002',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    invoice_id: 'INT-20250507-003',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    invoice_id: 'INT-20250507-004',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    invoice_id: 'INT-20250507-005',
    status: 'Paid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
];

export const Expenses: IExpenses[] = [
  {
    name: 'Fuel Refill for Service Van',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    name: 'Fuel Refill for Service Van',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    name: 'Fuel Refill for Service Van',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    name: 'Fuel Refill for Service Van',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
  {
    name: 'Fuel Refill for Service Van',
    status: 'Paid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
    description: 'Rich with spices, memories, and the',
    images: [],
  },
];

export const InvoiceData: IInvoice[] = [
  {
    invoice_id: 'INT-20250507-003',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
  },
  {
    invoice_id: 'INT-20250507-003',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
  },
  {
    invoice_id: 'INT-20250507-003',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
  },
  {
    invoice_id: 'INT-20250507-003',
    status: 'Unpaid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
  },
  {
    invoice_id: 'INT-20250507-003',
    status: 'Paid',
    date: '25,Feb 2025',
    service: 'After sales service',
    amount: 350.0,
  },
];
