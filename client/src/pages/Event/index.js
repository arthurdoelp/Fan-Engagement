import React, { Component } from 'react';
// import './style.css';
// import axios from 'axios';
// import { Redirect, useHistory } from 'react-router-dom';
import Artistcard from './../../components/Artistcard/index';

class Event extends Component {
    constructor() {
        super()
        this.state = {
            alert: '',
            artists: [
                {
                    artist_name: "Elton John"
                }
            ]
        }
    }


    render() {

        // const { email, first_name, last_name, password, isPasswordShown, hasNum, hasSpecial, hasMin } = this.state


        // // Handle change from inputs
        // const handleChange = e => {
        //     this.setState({ [e.target.name]: e.target.value })
        // }

        // const handleAlert = e => {
        //     e.preventDefault()
        //     this.setState({alert: ''});
        // }

        return (
            <div>
                {/* {isAuth() ? <Redirect to='/' /> : null} */}
                <div className="container">
                    <div className="row mt-5">
                        <div className="col text-center">
                            <h2>Sofar Sounds Event</h2>
                            <h5>Boston, MA</h5>
                            <h5>Seats: 30</h5>
                            <h5>Wed Apr 14, 2020 8pm</h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <Artistcard
                            artist_name={this.state.artists[0].artist_name}
                            ></Artistcard>
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event;