import React, { Component } from 'react';
import { connect } from 'react-redux'

import io from 'socket.io-client'
import { startGame, setGame, addPlayer, addRound, handOutCards } from '../../actions/game'

import Card, { BackCard } from '../Card';
import './game.scss';

/**
 * Game Component
 * @augments {Component<Props, State>}
 */
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { socket: io.connect("http://localhost:3001") };

        const { socket } = this.state;
        socket.on('SET_GAME', data => {
            this.props.dispatch(setGame(data.id, data.admin));
        });

        socket.on('SET_GAME_ERROR', data => {
            alert(`unable to join game\r\n${data.id}`)
        });

        socket.on('JOIN_GAME_ERROR', data => {
            console.error(data.text);
        });

        socket.on('GAME_START', () => {
            this.props.dispatch(startGame());
        });

        socket.on('ROUND_HAND_OUT_CARDS', data => {
            this.props.dispatch(handOutCards(data.cards));
        });

        socket.on('ROUND_START', data => {
            this.props.dispatch(addRound(data.round));
        });

        socket.on('ADD_PLAYER', data => {
            console.log(`player ${data.player.id} joined`);
            this.props.dispatch(addPlayer(data.player));
        });

        socket.on('reconnect', (attemptNumber) => {
            if (this.props.game.id) { socket.emit('JOIN_GAME', { id: this.props.game.id }) };
        });
    }
    render() {
        const { socket } = this.state;
        const { rounds, id, admin, players, didStart } = this.props.game;
        const currentRound = rounds[rounds.length - 1];
        return (
            <div className="game">
                {didStart && rounds.length > 0 ? <div className="poker-table">
                    <div className="poker-table-row poker-table-row-top">
                        <div className="margin-auto float-left poker-table-top-bottom-left poker-table-top-left transform-top-left">
                            <div className="card-container width-calc">
                                {players.length > 3 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                        <div className="float-left poker-table-top">
                        </div>
                        <div className="margin-auto float-right poker-table-top-bottom-right poker-table-top-right transform-top-right">
                            <div className="card-container width-calc">
                                {players.length > 2 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="poker-table-row">
                        <div className="float-left poker-table-center-left transform-center-left">
                            <div className="card-container width-calc">
                                {players.length > 1 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                        <div className="float-left poker-table-center">
                            <div className="card-container-center width-calc-center">
                                <div className="card card-back float-left"></div>
                                <div className="card card-back float-left"></div>
                                <div className="card card-back float-left"></div>
                                <div className="card card-back float-left"></div>
                                <div className="card card-back float-left"></div>
                            </div>
                        </div>
                        <div className="float-left poker-table-center-right transform-center-right">
                            <div className="card-container width-calc">
                                {players.length > 6 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="poker-table-row poker-table-row-bottom">
                        <div className="margin-auto float-left poker-table-top-bottom-left poker-table-bottom-left transform-top-right">
                            <div className="card-container width-calc">
                                {players.length > 4 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                        <div className="float-left poker-table-bottom-center">
                            <div className="card-container width-calc">
                                {players.length > 5 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                        <div className="float-left poker-table-bottom-center">
                            <div className="card-container width-calc">
                                {players.length > 0 && currentRound.didHandOut ? <>
                                    {rounds[rounds.length - 1].playerCards.map((card, index) => (
                                        <Card suit={card.suit} rank={card.rank} key={index} />
                                    ))}
                                </> : ""}
                            </div>
                        </div>
                        <div
                            className="margin-auto float-right poker-table-top-bottom-right poker-table-bottom-right transform-top-left">
                            <div className="card-container width-calc">
                                {players.length > 7 && currentRound.didHandOut ? <>
                                    <BackCard />
                                    <BackCard />
                                </> : ""}
                            </div>
                        </div>
                    </div>
                </div> : ""}
                <div className="poker-control">
                    {!didStart &&
                        <>
                            <button onClick={() => { socket.emit('CREATE_GAME') }}>Neu</button>
                            <button onClick={() => { socket.emit('JOIN_GAME', { id: prompt('id') }) }}>Beitreten</button>
                            <button onClick={() => { socket.emit('START_GAME', { id }) }} disabled={!admin}>Starten</button>
                        </>
                    }
                    {rounds.length > 0 &&
                        <>
                            <button onClick={() => { this.handOutCardsToPlayers(); }} disabled={rounds[rounds.length - 1].didHandOut}>Hand out</button>
                            <button onClick={() => { this.flop() }} disabled={rounds[rounds.length - 1].didFlop}>Flop</button>
                            <button onClick={() => { this.turn() }} disabled={rounds[rounds.length - 1].didTurn}>Turn</button>
                            <button onClick={() => { this.river() }} disabled={rounds[rounds.length - 1].didRiver}>River</button>
                        </>
                    }
                    {id ? id : "no game joined"} - <b>{admin ? "admin" : "user"}</b> - {didStart ? "started" : "not started yet"}
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    const { games } = state;
    return {
        game: games
    }
}

export default connect(mapStateToProps)(Game)