export type BetGroup = {
    id: string,
    createdAt: Date,
    twitchUsername: string,
    active: boolean,
    betOptions: BetOption[]
}

export type BetOption = {
    id: string,
    createdAt: Date,
    betGroupId: string,
    category: string,
    value: number,
    payoutMultiplier: number,
}

export type BetsPlaced = {
    category: string,
    value: number,
}

export type Bet = {
    id?: string
    twitchUsername?: string
    userId?: string
    betGroupId?: string
    totalBetAmount?: string
    gameTitle?: string
    winnings?: string
    status?: string
    createdAt?: Date
    betsPlaced?: BetsPlaced[]
}

export type Transaction = {
    id?: string;
    createdAt?: Date;
    userId?: string;
    amount?: string
    type?: string;
}