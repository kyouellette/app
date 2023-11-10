import styled from "styled-components/native"
import { Colors } from "../style/colors";
import { mFourteen } from "../style/fonts";

const LiveComponent = () => {
    return (
        <LiveWrapper>
            <LiveText>Live</LiveText>
        </LiveWrapper>

    )
}

const LiveWrapper = styled.View`
    border-radius: 4px;
    background-color: ${Colors.blackOne};
    padding: 2px 8px;
`;

const LiveText = styled.Text`
    color: ${Colors.greenOne};
    ${mFourteen};
`;

export default LiveComponent;