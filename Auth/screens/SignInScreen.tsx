import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Keyboard, Button } from "react-native";
import { AuthButton, AuthInput, GoogleButton } from "../components";
import OverlaySpinner from "../../components/OverlaySpinner";
import { signInWithEmail, signInWithGoogle } from "../api";

const SignInScreen = props => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<{ code?: string; message?: string }>({});
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  useEffect(() => {
    const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsEmailValid(result);
  }, [email]);

  useEffect(() => {
    const result = password.length >= 6;
    setIsPasswordValid(result);
  }, [password]);

  const handleAsyncSignIn = async promise => {
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

  const handleEmailSignIn = () => {
    return handleAsyncSignIn(() => signInWithEmail(email, password));
  };

  // const handleGoogleSignIn = () => {
  //   return handleAsyncSignIn(signInWithGoogle);
  // };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>Welcome</Text>
      <Text style={{ fontSize: 20, marginTop: 30 }}>
        Please sign in to continue
      </Text>

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

          <AuthButton
            disabled={!isEmailValid || !isPasswordValid || isPending}
            onPress={handleEmailSignIn}
          >
            Sign In with Email
          </AuthButton>

          {/* <Text style={{ margin: 10 }}>or</Text>

          <GoogleButton onPress={handleGoogleSignIn} /> */}

          <Text style={{ fontSize: 16, margin: 20, color: "tomato" }}>
            {error.message}
          </Text>
        </View>

        <View style={{ alignItems: "center", paddingBottom: 30 }}>
          <Button
            title="Reset Password"
            onPress={() => props.navigation.navigate("ResetPassword")}
          />
          <Button
            title="Sign Up"
            onPress={() => props.navigation.navigate("SignUp")}
          />
        </View>
      </View>

      {isPending && <OverlaySpinner />}
    </View>
  );
};

SignInScreen.navigationOptions = {
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

export default SignInScreen;
