import {IAddress} from './loginType';

// Tabs navigator params (Bottom Tabs inside Stack)
export type TabsTypes = {
  Home: undefined;
  Expanses: undefined;
  InterVention: undefined;
  Invoice: undefined;
};

// Stack navigator params (inside Drawer)
export type StackTypes = {
  Login: undefined;
  SignUp: undefined;
  Forget: undefined;
  Otp: {params: {from: 'signup' | 'forget'; email?: string}};
  NewPassword: undefined;
  Tabs: undefined;
  CreateIntervention: undefined;
  UpdateIntervention: {
    params: {
      id: string;
      category: string;
      price: string;
      note: string;
      status: string;
    };
  };
  InterventionDetails: {params: {id: string}};
  CreateExpenses: undefined;
  UpdateExpenses: {
    params: {
      id: string;
      expenseName: string;
      expenseCategory: string;
      price: string;
      note: string;
    };
  };
  InvoiceDetails: {params: {id: string}};
  CreateInvoice: undefined;
  UpdateInvoice: {
    params: {
      id: string;
      address: IAddress;
      service: {selectedService: string; quantity: number; price: number}[];
      name: string;
      email: string;
      phone: string;
      nSiren: string;
      status: string;
    };
  };
  EditProfile: undefined;
  Subscription: undefined;
  InterventionCategory: undefined;
  UpdateInterventionCategory: {
    params: {id: string; name: string; price: string};
  };
  CreateInterventionCategory: undefined;
  Support: undefined;
  ChangePassword: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
};

// Drawer navigator params (root)
export type DrawerTypes = {
  MainStack: undefined;
  Profile: undefined;
};
