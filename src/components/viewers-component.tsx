import styled from "styled-components/native";
import Eye from '../../assets/icons/eye.svg';
import { Colors } from "../style/colors";
import { mFourteen } from "../style/fonts";

const Viewers = ({viewers}: {viewers?: number}) => {
    return (
        <ViewersWrapper>
            <Eye width={24} height={24} color={Colors.white}/>
            <ViewersText>{viewers}</ViewersText>
        </ViewersWrapper>

    )
}

const ViewersWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ViewersText = styled.Text`
    padding-left: 4px;
    ${mFourteen};
    color: ${Colors.white};
`;

export default Viewers