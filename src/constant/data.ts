import { IExpenses, IIntervention, IInterventionCategoryData, IInvoice, ISubscription } from '../types/DataTypes';
import { DrawerIcons } from './images';

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
export const DrawerLinksData = [
  { name: 'Edit Profile', href: 'EditProfile', icon: DrawerIcons.UserEdit },
  { name: 'Subscription', href: 'Subscription', icon: DrawerIcons.Crown },
  { name: 'Intervention Category', href: 'InterventionCategory', icon: DrawerIcons.Category },
  { name: 'Contact Support', href: 'Support', icon: DrawerIcons.Support },
  { name: 'Change Password', href: 'ChangePassword', icon: DrawerIcons.Shield },
  { name: 'Terms & Conditions', href: 'TermsAndConditions', icon: DrawerIcons.Terms },
  { name: 'Privacy Policy', href: 'PrivacyPolicy', icon: DrawerIcons.Privacy },
]

export const subscriptionsData: ISubscription[] = [
  {
    name: 'Monthly',
    type: 'Monthly',
    price: '30$',
    description: 'Cancel any time',
  },
  {
    name: 'Annually',
    type: 'Annually',
    price: '100$',
    description: 'Cancel any time',
  },

]

export const InterventionCategoryData: IInterventionCategoryData[] = [
  { name: 'PLP', price: "350.00$", id: '1' },
  { name: 'After sell service', price: "350.00$", id: '2' },
]