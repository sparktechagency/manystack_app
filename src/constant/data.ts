import {
  IInterventionCategoryData,
  ISubscription
} from '../types/DataTypes';
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
  { label: 'after_sales_service', value: 'After sales service' },
];




export const DrawerLinksData = [
  { name: 'edit_profile', href: 'EditProfile', icon: DrawerIcons.UserEdit },
  { name: 'subscription', href: 'Subscription', icon: DrawerIcons.Crown },
  {
    name: 'intervention_category',
    href: 'InterventionCategory',
    icon: DrawerIcons.Category,
  },
  { name: 'contact_support', href: 'Support', icon: DrawerIcons.Support },
  { name: 'change_password', href: 'ChangePassword', icon: DrawerIcons.Shield },
  {
    name: 'terms_and_conditions',
    href: 'TermsAndConditions',
    icon: DrawerIcons.Terms,
  },
  { name: 'privacy_policy', href: 'PrivacyPolicy', icon: DrawerIcons.Privacy },
];

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
];

export const InterventionCategoryData: IInterventionCategoryData[] = [
  { name: 'PLP', price: '350.00$', id: '1' },
  { name: 'After sell service', price: '350.00$', id: '2' },
];
