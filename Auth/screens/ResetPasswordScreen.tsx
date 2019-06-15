import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Keyboard, Button } from "react-native";
import { AuthButton, AuthInput, ReturnToSignInButton } from "../components";
import OverlaySpinner from "../../components/OverlaySpinner";
import { sendPasswordResetEmail } from "../api";

const SignInScreen = props => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<{ code?: string; message?: string }>({});
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsEmailValid(result);
  }, [email]);

  const handleAsyncSignIn = async promise => {
    try {
      setError({});
      setEmailSent(false);
      Keyboard.dismiss();
      setIsPending(true);
      await promise();
      setIsPending(false);
      setEmailSent(true);
    } catch (error) {
      setError(error);
      setIsPending(false);
    }
  };

  const handleSendPasswordResetEmail = () => {
    return handleAsyncSignIn(() => sendPasswordResetEmail(email));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50 }}>Welcome</Text>

      <Text style={{ fontSize: 20, marginTop: 30 }}>Reset your password</Text>
      <View style={{ flex: 1 }}>
        <View style={styles.formWrapper}>
          <AuthInput
            type="email"
            value={email}
            onChangeText={value => setEmail(value)}
            placeholder="Email"
            valid={isEmailValid}
          />

          <AuthButton
            disabled={!isEmailValid || isPending}
            onPress={handleSendPasswordResetEmail}
          >
            Send Password Reset Email
          </AuthButton>

          <Text style={{ fontSize: 16, margin: 20, color: "tomato" }}>
            {error.message}
          </Text>

          {emailSent && (
            <Text style={{ fontSize: 16, margin: 20, color: "#333" }}>
              An email has been sent to {email}.
            </Text>
          )}
        </View>

        <ReturnToSignInButton />
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
