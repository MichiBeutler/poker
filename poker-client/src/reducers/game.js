import {
    ADD_PLAYER,
    REMOVE_PLAYER,
    ADD_ROUND,
    REMOVE_ROUND,
    ROUND_HAND_OUT_CARDS,
    ROUND_FLOP,
    ROUND_TURN,
    ROUND_RIVER
} from '../actions/game'
import { CLUBS, DIAMONDS, HEARTS, SPADES } from '../components/Card/constants'
export function games(
    state = {
        players: [],
        rounds: [{
            didHandOut: false,
            didFlop: false,
            didTurn: false,
            didRiver: false,
            playerCards: [],
            dealerCards: []
        }]
    },
    action
) {
    const { rounds } = state;
    switch (action.type) {
        case ADD_PLAYER:
            return Object.assign({}, state, {
                players: state.players.push(action.player)
            })
        case REMOVE_PLAYER:
            return Object.assign({}, state, {
                players: state.filter(player => { return player !== action.player })
            })
        case ADD_ROUND:
            return Object.assign({}, state, {
                rounds: state.rounds.push(action.round)
            })
        case REMOVE_ROUND:
            return Object.assign({}, state, {
                rounds: state.filter(rounds => { return rounds !== action.rounds })
            })
        case ROUND_HAND_OUT_CARDS:
            rounds[rounds.length - 1].didHandOut = true;
            rounds[rounds.length - 1].playerCards = action.cards;

            return Object.assign({}, state, {
                rounds,
            })
        case ROUND_FLOP:
            rounds[rounds.length - 1].didFlop = true;
            rounds[rounds.length - 1].dealerCards = action.cards;

            return Object.assign({}, state, {
                rounds
            })
        case ROUND_TURN:
            rounds[rounds.length - 1].didTurn = true;
            rounds[rounds.length - 1].dealerCards = action.cards;

            return Object.assign({}, state, {
                rounds
            })
        case ROUND_RIVER:
            rounds[rounds.length - 1].didRiver = true;
            rounds[rounds.length - 1].dealerCards = action.cards;

            return Object.assign({}, state, {
                rounds
            })
        default:
            return state
    }
}