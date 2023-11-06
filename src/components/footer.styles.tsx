import styled from "styled-components/native";
import { Colors } from '../style/colors';

export const FooterContainer = styled.View`
  margin-bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
  bottom: 0;
  position: absolute;
  left: 0;
  right: 0;
  background-color: ${Colors.blackTwo};
  border-radius: 51px;
`;


export const ContainerOption = styled.View<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? Colors.greenOne : 'transparent')};
  border-radius: 50%;
  padding: 3px;
`;


export const ContentContainer = styled.View`
  padding: 12px 12px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`