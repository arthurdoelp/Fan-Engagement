import React, { Component } from 'react';
// import './style.css';
import axios from 'axios';
// import { Redirect, useHistory } from 'react-router-dom';
import Artistcard from './../../components/Artistcard/index';
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

    componentDidMount() {
        const eventId = this.props.match.params.id;
        this.setState({ eventId: eventId });
        axios.post('/fan/api/event/details/show', {
            eventId
        })
            .then(res => {
                console.log(res.data.artists)
                console.log(res.data.event)
                this.setState({
                    artists: res.data.artists,
                    event: res.data.event
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({ errorAlert: err.response.data.errors })
            })
    }

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

        const handleSelectArtist = id => {
            console.log(id);
            this.props.history.push(`/artist/${id}`)
        }

        const handleAddRating = (rating, artistId) => {
            axios.post('/fan/api/rating/new', {
                rating, eventId, artistId
            })
            .then(res => {
                console.log(res.data.ratingsAverage)
            })
            .catch(err => {
                console.log(err)
                this.setState({ errorAlert: err.response.data.errors })
            })
        }

        return (
            <div>
                {/* {isAuth() ? <Redirect to='/' /> : null} */}
                <div className="container">

                    <Alert
                        errorAlert={errorAlert}
                        handleErrorAlert={handleErrorAlert}
                    />

                    <div className="row mt-5">
                        <div className="col text-center">
                            <h2>Sofar Sounds Event</h2>
                            <h5>{event.city}</h5>
                            <h5>Seats: {event.seats}</h5>
                            <h5>{event.date}</h5>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            {artists.map(artist => (
                                <Artistcard
                                    id={artist.artist.userId}
                                    key={artist.artist.userId}
                                    name={artist.artist.name}
                                    venmo={artist.artist.venmo}
                                    facebook={artist.artist.facebook}
                                    instagram={artist.artist.instagram}
                                    twitter={artist.artist.twitter}
                                    spotify={artist.artist.spotify}
                                    soundcloud={artist.artist.soundcloud}
                                    handleSelectArtist={handleSelectArtist}
                                    handleAddRating={handleAddRating}
                                />
                            ))}
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Event;