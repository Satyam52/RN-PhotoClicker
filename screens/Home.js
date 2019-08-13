import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

export default class Home extends React.Component {
  static navigationOption = {
    title: "PhotoClicker"
  };
  render() {
    let photo = this.props.navigation.getParam("photo", "empty");
    return (
      <View style={styles.container}>
        <Image
          resizeMode="center"
          style={styles.imgPlace}
          source={photo === "empty" ? require("../assets/logo.png") : photo}
        />
        <Button
          style={styles.btn}
          title="Take a Photo"
          onPress={() => {
            this.props.navigation.navigate("Camera");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  imgPlace: {
    alignItems: "center",
    height: 450,
    margin: 5
  },
  btn: {
    marginBottom: 20
  }
});
