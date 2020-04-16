const LOGIN = 'LOGIN';
const LOGIN_REQUIRED = 'LOGIN_REQUIRED';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const CREATE_GAME = 'CREATE_GAME';
const CREATE_GAME_ERROR = 'CREATE_GAME_ERROR';
const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';

const JOIN_GAME = 'JOIN_GAME';
const JOIN_GAME_ERROR = 'JOIN_GAME_ERROR';
const JOIN_GAME_SUCCESS = 'JOIN_GAME_SUCCESS';

const LEAVE_GAME = 'LEAVE_GAME';
const LEAVE_GAME_ERROR = 'LEAVE_GAME_ERROR';
const LEAVE_GAME_SUCCESS = 'LEAVE_GAME_SUCCESS';

const PLAYER_READY = 'PLAYER_READY';
const PLAYER_READY_ERROR = 'PLAYER_READY_ERROR';
const PLAYER_READY_SUCCESS = 'PLAYER_READY_SUCCESS'; 

const PLAYER_NOT_READY = 'PLAYER_NOT_READY';
const PLAYER_NOT_READY_ERROR = 'PLAYER_NOT_READY_ERROR';
const PLAYER_NOT_READY_SUCCESS = 'PLAYER_NOT_READY_SUCCESS'; 

const UPDATE_PLAYERS = 'UPDATE_PLAYERS';                // {players: []}
const UPDATE_PLAYERS_ERROR = 'UPDATE_PLAYERS_ERROR';

const UPDATE_POT = 'UPDATE_POT';                        // {pot: n}
const UPDATE_POT_ERROR = 'UPDATE_POT_ERROR';

const HAND_OUT_CARDS = 'HAND_OUT_CARDS';                // {cards: []}
const HAND_OUT_CARDS_ERROR = 'HAND_OUT_CARDS_ERROR';

const SMALL_BLIND = 'SMALL_BLIND';                      // {}
const SMALL_BLIND_ERROR = 'SMALL_BLIND_ERROR';

const BIG_BLIND = 'BIG_BLIND';                          // {}
const BIG_BLIND_ERROR = 'BIG_BLIND_ERROR';

module.exports = {
    LOGIN, LOGIN_REQUIRED, LOGIN_ERROR, LOGIN_SUCCESS,
    CREATE_GAME, CREATE_GAME_ERROR, CREATE_GAME_SUCCESS,
    JOIN_GAME, JOIN_GAME_ERROR, JOIN_GAME_SUCCESS,
    LEAVE_GAME, LEAVE_GAME_ERROR, LEAVE_GAME_SUCCESS,
    PLAYER_READY, PLAYER_READY_ERROR, PLAYER_READY_SUCCESS,
    PLAYER_NOT_READY, PLAYER_NOT_READY_ERROR, PLAYER_NOT_READY_SUCCESS,
    UPDATE_PLAYERS, UPDATE_PLAYERS_ERROR,
    UPDATE_POT, UPDATE_POT_ERROR,
    HAND_OUT_CARDS, HAND_OUT_CARDS_ERROR,
    SMALL_BLIND, SMALL_BLIND_ERROR,
    BIG_BLIND, BIG_BLIND_ERROR
}