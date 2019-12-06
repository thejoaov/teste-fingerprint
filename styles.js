import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
  padding: 30px;
  background-color: ${props => (props.modal ? "#b7b7b7" : "#fff")};
`;

export const InnerContainer = styled.View`
  margin-top: 30%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalText = styled.Text`
  align-self: center;
  font-size: 22;
  padding-top: 20;
`;
