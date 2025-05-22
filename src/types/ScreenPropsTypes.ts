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
  Otp: { from: string }; // direct param, no nested params object
  NewPassword: undefined;
  Tabs: undefined; // tabs screen inside stack
};

// Drawer navigator params (root)
export type DrawerTypes = {
  MainStack: undefined; // stack navigator inside drawer
  Profile: undefined;
};
