import React, { Component } from 'react';
import { connect } from 'react-redux'

import io from 'socket.io-client'
import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUIRED, loginSuccess, loginError, loginRequired
} from '../../actions/login'

import './game.scss';
import { CREATE_GAME, CREATE_GAME_ERROR, CREATE_GAME_SUCCESS, createGameSuccess, createGameError, JOIN_GAME, JOIN_GAME_ERROR, JOIN_GAME_SUCCESS, joinGameSuccess, joinGameError, LEAVE_GAME, LEAVE_GAME_SUCCESS, LEAVE_GAME_ERROR, leaveGameError, leaveGameSuccess } from '../../actions/game';

/**
 * Game Component
 * @augments {Component<Props, State>}
 */
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { socket: io.connect("http://tmr3:3001") };
        const { socket } = this.state;

        // login was successfully
        socket.on(LOGIN_SUCCESS, data => {
            Object.assign(data, { id: socket.id });
            this.props.dispatch(loginSuccess(data));
        });
        // login was not successfully
        socket.on(LOGIN_ERROR, data => {
            this.props.dispatch(loginError(data));
        });
        // login required
        socket.on(LOGIN_REQUIRED, data => {
            this.props.dispatch(loginRequired(data));
        });


        // create game was successfully
        socket.on(CREATE_GAME_SUCCESS, data => {
            this.props.dispatch(createGameSuccess(data));
        });
        // create game was not successfully
        socket.on(CREATE_GAME_ERROR, data => {
            this.props.dispatch(createGameError(data));
        });


        // join game was successfully
        socket.on(JOIN_GAME_SUCCESS, data => {
            this.props.dispatch(joinGameSuccess(data));
        });
        // join game was not successfully
        socket.on(JOIN_GAME_ERROR, data => {
            this.props.dispatch(joinGameError(data));
        });


        // leave game was successfully
        socket.on(LEAVE_GAME_SUCCESS, data => {
            this.props.dispatch(leaveGameSuccess(data));
        });
        // leave game was not successfully
        socket.on(LEAVE_GAME_ERROR, data => {
            this.props.dispatch(leaveGameError(data));
        });

        this.emit = this.emit.bind(this);
    }
    emit(event, data = {}) {
        const { socket } = this.state;
        Object.assign(data, { socketId: socket.id });
        socket.emit(event, data);
    }
    render() {
        if (this.props.login.isLogin) {
            if (this.props.game.isSuccess) {
                return <>
                    {this.props.game.id}<br />
                    <button onClick={() => { this.emit(LEAVE_GAME, { id: this.props.game.id }) }}>Leave</button>
                </>;
            }
            return <>
                logged in as {this.props.username}<br />
                <button onClick={() => { this.emit(CREATE_GAME) }}>Create</button>
                <button onClick={() => { this.emit(JOIN_GAME, { id: prompt() }) }}>Join</button><br />
                {this.props.game.isError ? this.props.game.errorText : ""}
            </>;
        } else if (this.props.login.isError) {
            return <>
                <button onClick={() => { this.emit(LOGIN, { username: prompt() }) }}>Login</button>
                ERROR: {this.props.login.errorText}
            </>;
        } else {
            return <><button onClick={() => { this.emit(LOGIN, { username: prompt() }) }}>Login</button></>;
        }
    }
};

function mapStateToProps(state) {
    const { game, login } = state;
    return {
        game,
        login: { ...login },
        username: login.username,
    }
}

export default connect(mapStateToProps)(Game)