import React from "react";
import { Text, View } from "react-native";
import { CheckBox } from "react-native-elements";

export interface ListItemProps {
  item: any;
  onCheck: (id) => void;
}

const ListItem: React.SFC<ListItemProps> = ({ item, onCheck }) => {
  return (
    <View
      key={item.id}
      style={{
        height: 40,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row"
      }}
    >
      <CheckBox
        onPress={() => onCheck({ id: item.id, currentState: item.completed })}
        // title={task.value}
        checked={item.completed}
        containerStyle={{
          backgroundColor: "transparent",
          borderColor: "#fff",
          padding: 0,
          margin: 0
        }}
      />
      <Text style={{ fontSize: 18 }}>{item.body}</Text>
    </View>
  );
};

export default ListItem;
