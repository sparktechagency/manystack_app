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
  Otp: { from: string };
  NewPassword: undefined;
  Tabs: undefined;
  CreateIntervention: undefined;
  UpdateIntervention: { params: { id: string } };
  InterventionDetails: { params: { id: string } };
  CreateExpenses: undefined;
  UpdateExpenses: { params: { id: string } };
  InvoiceDetails: { params: { id: string } };
  CreateInvoice: undefined;
  UpdateInvoice: { params: { id: string } };
};

// Drawer navigator params (root)
export type DrawerTypes = {
  MainStack: undefined;
  Profile: undefined;
};
