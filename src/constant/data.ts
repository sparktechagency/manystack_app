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
  { "label": "Lek ", "value": "L" },
  { "label": "Algerian Dinar ", "value": "د.ج" },
  { "label": "Kwanza ", "value": "Kz" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Armenian Dram ", "value": "֏" },
  { "label": "Florin ", "value": "ƒ" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Manat ", "value": "₼" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Bahraini Dinar ", "value": ".د.ب" },
  { "label": "Taka ", "value": "৳" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Ruble ", "value": "Br" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Ngultrum ", "value": "Nu." },
  { "label": "Boliviano ", "value": "Bs." },
  { "label": "Convertible Mark ", "value": "KM" },
  { "label": "Pula ", "value": "P" },
  { "label": "Real ", "value": "R$" },
  { "label": "Pound ", "value": "£" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Lev ", "value": "лв" },
  { "label": "Franc ", "value": "FBu" },
  { "label": "Riel ", "value": "៛" },
  { "label": "Dollar ", "value": "$" },
  { "label": "Escudo ", "value": "$" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "CFA Franc ", "value": "FCFA" },
  { "label": "Peso ", "value": "$" }, // Multiple currencies use this
  { "label": "Yuan ", "value": "¥" }, // Multiple currencies use this
  { "label": "Peso ", "value": "$" }, // Multiple currencies use this
  { "label": "Comorian Franc ", "value": "CF" },
  { "label": "Congolese Franc ", "value": "FC" },
  { "label": "Colón ", "value": "₡" },
  { "label": "Kuna ", "value": "kn" },
  { "label": "Peso ", "value": "$" }, // Multiple currencies use this
  { "label": "Koruna ", "value": "Kč" },
  { "label": "Krone ", "value": "kr" }, // Multiple currencies use this
  { "label": "Djiboutian Franc ", "value": "Fdj" },
  { "label": "Peso ", "value": "$" }, // Multiple currencies use this
  { "label": "Pound ", "value": "£" }, // Multiple currencies use this
  { "label": "Nakfa ", "value": "Nfk" },
  { "label": "Birr ", "value": "Br" },
  { "label": "Euro ", "value": "€" },
  { "label": "Pound ", "value": "£" }, // Multiple currencies use this
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Dalasi ", "value": "D" },
  { "label": "Lari ", "value": "₾" },
  { "label": "Cedi ", "value": "₵" },
  { "label": "Pound ", "value": "£" }, // Multiple currencies use this
  { "label": "Quetzal ", "value": "Q" },
  { "label": "Guinean Franc ", "value": "FG" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Gourde ", "value": "G" },
  { "label": "Lempira ", "value": "L" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Forint ", "value": "Ft" },
  { "label": "Króna ", "value": "kr" }, // Multiple currencies use this
  { "label": "Indian Rupee ", "value": "₹" },
  { "label": "Rupiah ", "value": "Rp" },
  { "label": "Rial ", "value": "﷼" }, // Multiple currencies use this
  { "label": "Iraqi Dinar ", "value": "ع.د" },
  { "label": "New Shekel ", "value": "₪" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Yen ", "value": "¥" }, // Multiple currencies use this
  { "label": "Jordanian Dinar ", "value": "د.ا" },
  { "label": "Tenge ", "value": "₸" },
  { "label": "Shilling ", "value": "Sh" }, // Multiple currencies use this
  { "label": "Kuwaiti Dinar ", "value": "د.ك" },
  { "label": "Som ", "value": "с" },
  { "label": "Kip ", "value": "₭" },
  { "label": "Lebanese Pound ", "value": "ل.ل" },
  { "label": "Loti ", "value": "L" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Libyan Dinar ", "value": "ل.د" },
  { "label": "Pataca ", "value": "P" },
  { "label": "Denar ", "value": "ден" },
  { "label": "Ariary ", "value": "Ar" },
  { "label": "Kwacha ", "value": "MK" }, // Multiple currencies use this
  { "label": "Ringgit ", "value": "RM" },
  { "label": "Rufiyaa ", "value": ".ރ" },
  { "label": "Ouguiya ", "value": "UM" },
  { "label": "Rupee ", "value": "₨" }, // Multiple currencies use this
  { "label": "Peso ", "value": "$" }, // Multiple currencies use this
  { "label": "Leu ", "value": "L" },
  { "label": "Tögrög ", "value": "₮" },
  { "label": "Dirham ", "value": "د.م." },
  { "label": "Metical ", "value": "MT" },
  { "label": "Kyat ", "value": "K" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Rupee ", "value": "₨" }, // Multiple currencies use this
  { "label": "Antillean Guilder ", "value": "ƒ" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Córdoba ", "value": "C$" },
  { "label": "Naira ", "value": "₦" },
  { "label": "Won ", "value": "₩" }, // Multiple currencies use this
  { "label": "Krone ", "value": "kr" }, // Multiple currencies use this
  { "label": "Rial ", "value": "ر.ع." },
  { "label": "Rupee ", "value": "₨" }, // Multiple currencies use this
  { "label": "Balboa ", "value": "B/." },
  { "label": "Kina ", "value": "K" },
  { "label": "Guaraní ", "value": "₲" },
  { "label": "Sol ", "value": "S/" },
  { "label": "Philippine Peso ", "value": "₱" },
  { "label": "Złoty ", "value": "zł" },
  { "label": "Riyal ", "value": "ر.ق" },
  { "label": "Leu ", "value": "lei" },
  { "label": "Ruble ", "value": "₽" },
  { "label": "Franc ", "value": "FRw" },
  { "label": "Pound ", "value": "£" }, // Multiple currencies use this
  { "label": "Tālā ", "value": "T" },
  { "label": "Dobra ", "value": "Db" },
  { "label": "Riyal ", "value": "ر.س" },
  { "label": "Dinar ", "value": "дин." },
  { "label": "Rupee ", "value": "₨" }, // Multiple currencies use this
  { "label": "Leone ", "value": "Le" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Shilling ", "value": "Sh" }, // Multiple currencies use this
  { "label": "Rand ", "value": "R" },
  { "label": "Won ", "value": "₩" }, // Multiple currencies use this
  { "label": "Pound ", "value": "£" }, // Multiple currencies use this
  { "label": "Rupee ", "value": "Rs" },
  { "label": "Pound ", "value": "ج.س." },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Lilangeni ", "value": "L" },
  { "label": "Krona ", "value": "kr" }, // Multiple currencies use this
  { "label": "Franc ", "value": "Fr" },
  { "label": "Pound ", "value": "£" }, // Multiple currencies use this
  { "label": "Somoni ", "value": "ЅМ" },
  { "label": "Shilling ", "value": "Sh" }, // Multiple currencies use this
  { "label": "Baht ", "value": "฿" },
  { "label": "Paʻanga ", "value": "T$" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Tunisian Dinar ", "value": "د.ت" },
  { "label": "Turkish Lira ", "value": "₺" },
  { "label": "Manat ", "value": "m" },
  { "label": "Shilling ", "value": "Sh" }, // Multiple currencies use this
  { "label": "Hryvnia ", "value": "₴" },
  { "label": "Dirham ", "value": "د.إ" },
  { "label": "Dollar ", "value": "$" }, // Multiple currencies use this
  { "label": "Peso ", "value": "$" }, // Multiple currencies use this
  { "label": "Soʻm ", "value": "so'm" },
  { "label": "Vatu ", "value": "Vt" },
  { "label": "Bolívar ", "value": "Bs F" },
  { "label": "Đồng ", "value": "₫" },
  { "label": "CFA Franc ", "value": "CFA" },
  { "label": "Rial ", "value": "﷼" }, // Multiple currencies use this
  { "label": "Kwacha ", "value": "ZK" },
  { "label": "Dollar ", "value": "$" } // Multiple currencies use this
];