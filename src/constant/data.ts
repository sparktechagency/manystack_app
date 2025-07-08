import {
  IInterventionCategoryData
} from '../types/DataTypes';
import { DrawerIcons } from './images';

export const genderData = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Others', value: 'OTHERS' },
];
export const paymentStatus = [
  { label: 'Paid', value: 'PAID' },
  { label: 'Unpaid', value: 'UNPAID' },
];
export const interventionFilter = [
  { label: 'PLP', value: 'PLP' },
  { label: 'after_sales_service', value: 'After sales service' },
];




export const DrawerLinksData = [
  { name: 'edit_profile', href: 'EditProfile', icon: DrawerIcons.UserEdit },
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



export const InterventionCategoryData: IInterventionCategoryData[] = [
  { name: 'PLP', price: '350.00$', id: '1' },
  { name: 'After sell service', price: '350.00$', id: '2' },
];

export const currencyData = [
  { "label": "Afghani ", "value": "؋" },
  { "label": "Algerian Dinar ", "value": "د.ج" },
  { "label": "Kwanza ", "value": "Kz" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Armenian Dram ", "value": "֏" },
  { "label": "Bahraini Dinar ", "value": ".د.ب" },
  { "label": "Taka ", "value": "৳" },
  { "label": "Ngultrum ", "value": "Nu." },
  { "label": "Boliviano ", "value": "Bs." },
  { "label": "Convertible Mark ", "value": "KM" },
  { "label": "Real ", "value": "R$" },
  { "label": "Pound ", "value": "£" },
  { "label": "Lev ", "value": "лв" },
  { "label": "Franc ", "value": "FBu" },
  { "label": "Riel ", "value": "៛" },
  { "label": "CFA Franc ", "value": "FCFA" },
  { "label": "Comorian Franc ", "value": "CF" },
  { "label": "Congolese Franc ", "value": "FC" },
  { "label": "Colón ", "value": "₡" },
  { "label": "Kuna ", "value": "kn" },
  { "label": "Koruna ", "value": "Kč" },
  { "label": "Djiboutian Franc ", "value": "Fdj" },
  { "label": "Nakfa ", "value": "Nfk" },
  { "label": "Euro ", "value": "€" },
  { "label": "Dalasi ", "value": "D" },
  { "label": "Lari ", "value": "₾" },
  { "label": "Cedi ", "value": "₵" },
  { "label": "Quetzal ", "value": "Q" },
  { "label": "Guinean Franc ", "value": "FG" },
  { "label": "Gourde ", "value": "G" },
  { "label": "Forint ", "value": "Ft" },
  { "label": "Indian Rupee ", "value": "₹" },
  { "label": "Rupiah ", "value": "Rp" },
  { "label": "Iraqi Dinar ", "value": "ع.د" },
  { "label": "New Shekel ", "value": "₪" },
  { "label": "Jordanian Dinar ", "value": "د.ا" },
  { "label": "Tenge ", "value": "₸" },
  { "label": "Kuwaiti Dinar ", "value": "د.ك" },
  { "label": "Som ", "value": "с" },
  { "label": "Kip ", "value": "₭" },
  { "label": "Lebanese Pound ", "value": "ل.ل" },
  { "label": "Libyan Dinar ", "value": "ل.د" },
  { "label": "Denar ", "value": "ден" },
  { "label": "Ariary ", "value": "Ar" },
  { "label": "Kwacha ", "value": "MK" },
  { "label": "Ringgit ", "value": "RM" },
  { "label": "Rufiyaa ", "value": ".ރ" },
  { "label": "Ouguiya ", "value": "UM" },
  { "label": "Tögrög ", "value": "₮" },
  { "label": "Dirham ", "value": "د.م." },
  { "label": "Metical ", "value": "MT" },
  { "label": "Antillean Guilder ", "value": "ƒ" },
  { "label": "Córdoba ", "value": "C$" },
  { "label": "Naira ", "value": "₦" },
  { "label": "Rial ", "value": "ر.ع." },
  { "label": "Balboa ", "value": "B/." },
  { "label": "Guaraní ", "value": "₲" },
  { "label": "Sol ", "value": "S/" },
  { "label": "Philippine Peso ", "value": "₱" },
  { "label": "Złoty ", "value": "zł" },
  { "label": "Riyal ", "value": "ر.ق" },
  { "label": "Leu ", "value": "lei" },
  { "label": "Ruble ", "value": "₽" },
  { "label": "Franc ", "value": "FRw" },
  { "label": "Tālā ", "value": "T" },
  { "label": "Dobra ", "value": "Db" },
  { "label": "Riyal ", "value": "ر.س" },
  { "label": "Dinar ", "value": "дин." },
  { "label": "Leone ", "value": "Le" },
  { "label": "Rand ", "value": "R" },
  { "label": "Rupee ", "value": "Rs" },
  { "label": "Pound ", "value": "ج.س." },
  { "label": "Franc ", "value": "Fr" },
  { "label": "Somoni ", "value": "ЅМ" },
  { "label": "Baht ", "value": "฿" },
  { "label": "Paʻanga ", "value": "T$" },
  { "label": "Tunisian Dinar ", "value": "د.ت" },
  { "label": "Turkish Lira ", "value": "₺" },
  { "label": "Manat ", "value": "m" },
  { "label": "Hryvnia ", "value": "₴" },
  { "label": "Dirham ", "value": "د.إ" },
  { "label": "Soʻm ", "value": "so'm" },
  { "label": "Vatu ", "value": "Vt" },
  { "label": "Bolívar ", "value": "Bs F" },
  { "label": "Đồng ", "value": "₫" },
  { "label": "CFA Franc ", "value": "CFA" },
  { "label": "Kwacha ", "value": "ZK" }
]
