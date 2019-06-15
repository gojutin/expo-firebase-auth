import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Keyboard, Button } from "react-native";
import {
  AuthButton,
  AuthInput,
  GoogleButton,
  ReturnToSignInButton
} from "../components";
import OverlaySpinner from "../../components/OverlaySpinner";
import { signUpWithEmail, signUpWithGoogle } from "../api";

const SignUpScreen = props => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<{ code?: string; message?: string }>({});
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [password2, setPassword2] = useState("");
  const [isPassword2Valid, setIsPassword2Valid] = useState(false);

  useEffect(() => {
    const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsEmailValid(result);
  }, [email]);

  useEffect(() => {
    const result = password.length >= 6;
    setIsPasswordValid(result);
  }, [password]);

  useEffect(() => {
    const result = isPasswordValid && password === password2;
    setIsPassword2Valid(result);
  }, [password, password2]);

  const handleAsyncSignUp = async promise => {
    try {
      setError({});
      Keyboard.dismiss();
      setIsPending(true);
      await promise();
    } catch (error) {
      setError(error);
      setIsPending(false);
    }
  };

  const handleEmailSignUp = () => {
    return handleAsyncSignUp(() => signUpWithEmail(email, password));
  };

  // const handleGoogleSignUp = () => {
  //   return handleAsyncSignUp(signUpWithGoogle);
  // };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>Welcome</Text>

      <Text style={{ fontSize: 20, marginTop: 30 }}>Sign Up</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.formWrapper}>
          <AuthInput
            type="email"
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Email"
            valid={isEmailValid}
          />

          <AuthInput
            type="password"
            value={password}
            onChangeText={value => setPassword(value)}
            placeholder="Password"
            valid={isPasswordValid}
          />

          <AuthInput
            type="password"
            value={password2}
            onChangeText={value => setPassword2(value)}
            placeholder="Confirm Password"
            valid={isPassword2Valid}
          />

          <AuthButton
            disabled={
              !isEmailValid ||
              !isPasswordValid ||
              !isPassword2Valid ||
              isPending
            }
            onPress={handleEmailSignUp}
          >
            Sign Up with Email
          </AuthButton>

          {/* <Text style={{ margin: 10 }}>or</Text>
          <GoogleButton signUp onPress={handleGoogleSignUp} /> */}

          <Text style={{ fontSize: 16, margin: 20, color: "tomato" }}>
            {error.message}
          </Text>
        </View>

        <ReturnToSignInButton />
      </View>

      {isPending && <OverlaySpinner />}
    </View>
  );
};

SignUpScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 100
  },
  formWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    paddingTop: 80
  }
});

export default SignUpScreen;
