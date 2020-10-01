import React, { Component } from 'react';
// import './style.css';
import axios from 'axios';
// import { Redirect, useHistory } from 'react-router-dom';
import Alert from './../../components/Alert/index';

class Event extends Component {
    constructor() {
        super()
        this.state = {
            errorAlert: '',
            eventId: '',
            artists: [],
            event: []
        }
    }

    // componentDidMount() {
    //     const eventId = this.props.match.params.id;
    //     this.setState({ eventId: eventId });
    //     axios.post('/fan/api/event/details/show', {
    //         eventId
    //     })
    //         .then(res => {
    //             console.log(res.data.artists)
    //             console.log(res.data.event)
    //             this.setState({
    //                 artists: res.data.artists,
    //                 event: res.data.event
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             this.setState({ errorAlert: err.response.data.errors })
    //         })
    // }

    render() {

        const { errorAlert, eventId, artists, event } = this.state

        // // Handle change from inputs
        // const handleChange = e => {
        //     this.setState({ [e.target.name]: e.target.value })
        // }

        const handleErrorAlert = e => {
            e.preventDefault()
            this.setState({ errorAlert: '' });
        }

        // const handleSelectArtist = id => {
        //     console.log(id);
        //     this.props.history.push(`/artist/${id}`)
        // }

        // const handleAddRating = (rating, artistId) => {
        //     axios.post('/fan/api/rating/new', {
        //         rating, eventId, artistId
        //     })
        //         .then(res => {
        //             console.log(res.data.ratingsAverage)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //             this.setState({ errorAlert: err.response.data.errors })
        //         })
        // }

        // const handleVenmoPayment = (tip, venmo, artistId) => {
        //     console.log("Tip Amount: " + tip);
        //     console.log("Venmo: " + venmo);
        //     axios.post('/fan/api/tip/new', {
        //         tip, eventId, artistId
        //     })
        //         .then(res => {
        //             console.log(res.data.record);

        //             window.location.href = `venmo://paycharge?txn=pay&amount=${tip}&recipients=${venmo}&note=Sofar%20Sounds%20Event`;
        //             // window.location.href = `https://venmo.com/${venmo}?txn=pay&amount=${tip}&note=Sofar%20Sounds%20Event`;
        //             // https://www.npmjs.com/package/venmo?activeTab=readme This could be something to look into more in the future
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        //     // window.location.href = `venmo://paycharge?txn=pay&amount=${tip}&recipients=${venmo}&note=Sofar%20Sounds%20Event`;
        // }

        return (
            <div>
                {/* {isAuth() ? <Redirect to='/' /> : null} */}
                <div className="container">

                    <Alert
                        errorAlert={errorAlert}
                        handleErrorAlert={handleErrorAlert}
                    />

                    <div className="row mt-5">
                        <div className="row">
                            <div className="col text-center">
                                <h2>Elton John</h2>
                                <h5>Pop/rock</h5>
                                <h5>Boston</h5>
                                <h5>Total Performances: 3</h5>
                                <h5>Sofar Sounds performer since: 2/20/20</h5>
                                <h5>Bio</h5>
                                <h5>Merch</h5>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                {/* This is where the social media links will go */}
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h5>Timeline</h5>
                            <div>
                               {/* This is where the event timeline info will go */}
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event;