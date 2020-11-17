import React, { Component } from 'react';
// import { isAuth } from '../../helpers/auth';
import './style.css';
import axios from 'axios';
import Alert from '../../components/Alert/index';
// import { Redirect } from 'react-router-dom';

class Homenav extends Component {
    constructor() {
        super()
        this.state = {
            errorAlert: '',
            eventId: ''
        }
    }

    componentDidMount() {
        axios.post('/fan/api/event/details/all', {
        })
            .then(res => {
                console.log(res.data.events);
                this.setState({
                    eventId: res.data.events[0].id
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({ errorAlert: err.response.data.errors })
            })
    }


    render() {

        const { errorAlert, eventId } = this.state


        // Handle change from inputs
        // const handleChange = e => {
        //     this.setState({ [e.target.name]: e.target.value })
        // }

        // Handles removing the alert message inclucing the alert message text from state whenever user clicks the "x" button
        const handleErrorAlert = e => {
            this.setState({ errorAlert: '' });
        }

        const handleFans = e => {
            this.props.history.push(`/event/${eventId}`)
        }

        const handleArtist = e => {
            this.props.history.push('/register/artist')
        }

        const handleAdmin = e => {
            this.props.history.push('/register/admin')
        }

        return (
            <div>
                {/* This will redirect the user if they are logged in to go to the home page, otherwise nothing */}
                {/* {isAuth() ? null : <Redirect to='/login/admin' />} */}
                <div className="container">

                    <Alert
                        errorAlert={errorAlert}
                        handleErrorAlert={handleErrorAlert}
                    />

                    <div className="row">
                        <div className="col-lg-3 col-md-1"></div>
                        <div className="col-lg-6 col-md-10">
                            <div className="register-form mt-5 pb-4">
                                {/* Title section */}
                                <div className="row">
                                    <div className="col text-center">
                                        <h6>Home</h6>
                                        <h3>
                                            Navigation
                                        </h3>
                                    </div>
                                </div>

                                {/* Register form inputs */}
                                <div className="row">
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                    <div className="col-lg-8 col-md-10 col-sm-10">
                                        <div className="row text-center">
                                            <div className="col">
                                                <button
                                                    onClick={handleFans}
                                                    className="home-nav-button"
                                                >
                                                    Fans
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row text-center">
                                            <div className="col">
                                                <button
                                                    onClick={handleArtist}
                                                    className="home-nav-button"
                                                >
                                                    Artist
                                                </button>
                                            </div>
                                        </div>

                                        <div className="row text-center">
                                            <div className="col">
                                                <button
                                                    onClick={handleAdmin}
                                                    className="home-nav-button"
                                                >
                                                    Admin
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homenav;