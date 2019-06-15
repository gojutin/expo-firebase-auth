import { createStackNavigator } from "react-navigation";
import { SignInScreen, SignUpScreen, ResetPasswordScreen } from "../screens";

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPassword: ResetPasswordScreen
  },
  {
    initialRouteName: "SignIn",
    mode: "modal"
  }
);

export default AuthStack;
