import React from "react";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
// import { Camera, Permissions } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      isFlashlightOn: Camera.Constants.FlashMode.on
    };
  }
  static navigationOption = {
    title: "Camera"
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  //flipcamera
  flipCamera = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };
  toggleFlash = () => {
    this.setState({
      isFlashlightOn:
        this.state.isFlashlightOn === Camera.Constants.FlashMode.off
          ? Camera.Constants.FlashMode.on
          : Camera.Constants.FlashMode.off
    });
  };

  //take photo
  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate("Home", { photo });
    }
  };

  render() {
    const { hasCameraPermission, type } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No Access to Camera</Text>
        </View>
      );
    } else if (hasCameraPermission === true) {
      return (
        <View style={styles.container}>
          <Camera
            type={type}
            flashMode={this.state.isFlashlightOn}
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.Camera}
          >
            <View style={styles.toggle}>
              <TouchableOpacity style={styles.iconHolder}>
                <FontAwesome
                  onPress={() => this.flipCamera()}
                  name="camera"
                  size={35}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconHolder}>
                <FontAwesome
                  onPress={() => this.takePicture()}
                  name="circle"
                  size={35}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.toggleFlash()}
                style={styles.iconHolder}
              >
                <FontAwesome name="flash" size={35} style={styles.icon}>
                  <Text>
                    {this.state.isFlashlightOn === Camera.Constants.FlashMode.on
                      ? "On"
                      : "Off"}
                  </Text>
                </FontAwesome>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Camera: {
    flex: 1
  },
  toggle: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  iconHolder: { flex: 1, alignItems: "center", alignSelf: "flex-end" },
  icon: {
    marginBottom: 10,
    color: "#fff"
  }
});
