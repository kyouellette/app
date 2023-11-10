import styled from 'styled-components/native';
import { rEighteen, rFourteen, rSixteen, sbEighteen, sbFourteen, sbTwelve, sbTwenty, sbTwentyFour } from '../style/fonts';
import { Colors } from '../style/colors';
import Skull from '../../assets/icons/skull.svg';
import Placement from '../../assets/icons/user.svg'

type BetHistoryType = {
    gameTitle?: string
    totalBetAmount?: string
    winnings?: string
    betWon?: boolean
    status?: string
    betsPlaced?: BetPlacedType[]
}

type BetPlacedType = {
    category?: string;
    value?: string;
    won?: boolean
}

type BetType = {
    bet?: BetHistoryType
}

type IconMapType = {
    Kills: JSX.Element;
    Placement: JSX.Element
}

const iconMap: IconMapType = {
    Kills: <Skull height={24} width={24} color={Colors.white} />,
    Placement: <Placement height={24} width={24} fill={Colors.white} color={Colors.white} />,
}

const statusColorMap = {
    Pending: Colors.yellowOne,
    Lost: Colors.redOne,
    Won: Colors.greenOne,
}

const result = [{
        category: 'Kills',
        value: '15',
},{
    category: 'Placement',
    value: '15'
}
]

export const BetHistoryComponent = ({bet}: BetType) => {
  return (
    <BetContainer>
        <Title>{bet?.gameTitle}</Title>
        <BetDetailsContainer>
            <BetsPlacedContainer>
                <SubTitle>Bets Placed</SubTitle>
                <PlacedBetsResultContainer>
                {bet?.betsPlaced?.map((bet, index) => (
                    <BetCategoryContainer key={index}>
                    {iconMap[bet?.category as keyof typeof iconMap || 'Kills']}
                    <AchievedValueText>
                        {bet?.value}
                    </AchievedValueText>
                    </BetCategoryContainer>
                ))}  
                </PlacedBetsResultContainer>
            </BetsPlacedContainer>
            <ResultContainer>
                <SubTitle>Game Result</SubTitle>
                <ResultResultContainer>
                {result.map((result, index) => (
                    <BetCategoryContainer key={index}>
                    {iconMap[result.category as keyof typeof iconMap || 'Kills']}
                    <AchievedValueText>
                        {result?.value}
                    </AchievedValueText>
                    </BetCategoryContainer>
                ))}
                </ResultResultContainer>
            </ResultContainer>
        </BetDetailsContainer>
        <HorizontalLine />
        <BetSummaryContainer>
            <BetSummaryOptionContainer>
                <BetSummaryHeader>Wager</BetSummaryHeader>
                <BetSummaryValue>${bet?.totalBetAmount}</BetSummaryValue>
            </BetSummaryOptionContainer>
            <BetSummaryOptionContainer>
                <BetSummaryHeader>Prize</BetSummaryHeader>
                <BetSummaryValue>${bet?.winnings}</BetSummaryValue>
            </BetSummaryOptionContainer>
            <BetSummaryOptionContainer>
                <BetSummaryHeader>Status</BetSummaryHeader>
                <StatusText color={statusColorMap[bet?.status as keyof typeof statusColorMap || 'Pending']}>{bet?.status}</StatusText>
            </BetSummaryOptionContainer>
        </BetSummaryContainer>
    </BetContainer>
  );
}

const BetContainer = styled.View`
    border: 1px ${Colors.blackThree};
    border-radius: 16px;
    padding: 8px 8px;
    flex-direction: column;
`;

const PlacedBetsResultContainer = styled.View`
    padding-top: 8px;
    flex-direction: row;
    align-items: center;
`;

const AchievedValueText = styled.Text`
    ${sbFourteen};
    color: ${Colors.white};
    padding-top: 4px;
`;

const StatusText = styled.Text<{ color: string }>`
    ${sbFourteen}; 
    padding-top: 6px;
    color: ${(props) => (props.color)};
`;

const BetSummaryHeader = styled.Text`
    ${rSixteen};
    color: ${Colors.white};
`;

const BetSummaryValue = styled.Text`
    ${sbFourteen};
    color: ${Colors.white};
    padding-top: 6px;
`;

const BetSummaryOptionContainer = styled.View`
    flex-direction: column;
`;

const BetCategoryContainer = styled.View`
    flex-direction: column;
    padding-top: 8px;
    align-items: center;
`

const BetSummaryContainer = styled.View`
    flex-direction: row;
    padding-top: 12px;
    justify-content: space-between;
`;

const ResultContainer = styled.View`
    flex: 1;
    padding-top: 24px;
    flex-direction: column;
    align-items: flex-end;
    `;

const ResultResultContainer = styled.View`
    padding-top: 8px;
    flex-direction: row;
    align-items: center;
`;

const Title = styled.Text`
    ${sbTwenty}
    color: ${Colors.greenOne}
`;

const BetsPlacedContainer = styled.View`
    flex: 1;
    padding-top: 24px;
    flex-direction: column;
`;

const BetDetailsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const HorizontalLine = styled.View`
  flex: 1;
  margin-top: 16px;
  border-top-width: 1px;
  border-color: ${Colors.blackThree};
`;

const SubTitle = styled.Text`
    color: ${Colors.blackFour};
    ${rSixteen};
`;


export default BetHistoryComponent