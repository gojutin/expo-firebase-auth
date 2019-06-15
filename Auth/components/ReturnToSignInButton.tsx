import * as React from "react";
import { View, Button } from "react-native";
import { withNavigation } from "react-navigation";

const ReturnToSignInButton: React.FC = props => {
  return (
    <View style={{ alignItems: "center", paddingBottom: 30 }}>
      <Button
        title="Return to Sign In"
        // @ts-ignore
        onPress={() => props.navigation.navigate("SignIn")}
      />
    </View>
  );
};

export default withNavigation(ReturnToSignInButton);
