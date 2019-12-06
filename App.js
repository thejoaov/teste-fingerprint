import React, { useState } from "react";
import {
  Image,
  Button,
  Modal,
  TouchableOpacity,
  Platform,
  Text
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  padding: 30px;
  background-color: ${props => (props.modal ? "#b7b7b7" : "#fff")};
`;

const InnerContainer = styled.View`
  margin-top: 30%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalText = styled.Text`
  align-self: center;
  font-size: 22;
  padding-top: 20;
`;

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [failedCount, setFailedCount] = useState(0);

  function clearState() {
    setAuthenticated(false);
    setFailedCount(0);
  }

  async function scanFingerPrint() {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setModalVisible(false);
        setAuthenticated(true);
        setFailedCount(0);
      } else {
        setFailedCount(failedCount + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container modal={modalVisible}>
      <Button
        title={
          authenticated
            ? "Reset and begin Authentication again"
            : "Begin Authentication"
        }
        onPress={() => {
          clearState();
          if (Platform.OS === "android") {
            setModalVisible(!modalVisible);
          } else {
            scanFingerPrint();
          }
        }}
      />
      {authenticated && <Text>Authentication Successful! 🎉</Text>}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onShow={scanFingerPrint}
      >
        <InnerContainer>
          <ModalText>Sign in with fingerprint</ModalText>
          <Image
            style={{ width: 128, height: 128 }}
            source={require("./assets/fingerprint.png")}
          />
          {failedCount > 0 && (
            <Text style={{ color: "red", fontSize: 14 }}>
              Failed to authenticate, press cancel and try again.
            </Text>
          )}
          <TouchableOpacity
            onPress={async () => {
              setModalVisible(!modalVisible);
              await LocalAuthentication.cancelAuthenticate();
            }}
          >
            <Text style={{ color: "red", fontSize: 16, marginTop: 70 }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </InnerContainer>
      </Modal>
    </Container>
  );
}
