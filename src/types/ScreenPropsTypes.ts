export interface TabsTypes {
  Home: undefined;
  Drawer: {
    screen: string;
    params: {
      screen: string;
    };
  };
}
export interface StackTypes {
  Login: undefined;
  SignUp: undefined;
  Forget: undefined;
  Otp: { params: { from: string } };
  NewPassword: undefined;
}