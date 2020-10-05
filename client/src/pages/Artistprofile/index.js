import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import moment from 'moment';
// import { Redirect, useHistory } from 'react-router-dom';
import Alert from './../../components/Alert/index';
import Eventcard from './../../components/Eventcard/index';

class Event extends Component {
    constructor() {
        super()
        this.state = {
            errorAlert: '',
            artistId: '',
            artist: [],
            events: [],
            bio: false
        }
    }

    componentDidMount() {
        const artistId = this.props.match.params.id;
        this.setState({ artistId: artistId });
        window.addEventListener('scroll', this.handleScrollToElement);
        axios.post('/fan/api/artist/details/show', {
            artistId
        })
            .then(res => {
                this.setState({
                    artist: res.data.artist,
                    events: res.data.events
                });
            })
            .catch(err => {
                console.log(err)
                this.setState({ errorAlert: err.response.data.errors })
            })
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollToElement);
    }

    handleScrollToElement(event) {
        if (event.currentTarget.scrollY > 0) {
            document.getElementsByClassName("artist-info")[0].style.paddingTop = "15px";
            document.getElementsByClassName("artist-info")[0].style.paddingBottom = "15px";
            document.getElementsByClassName("artist-summary")[0].style.paddingBottom = "15px";

        } else {
            document.getElementsByClassName("artist-info")[0].style.paddingTop = "50px";
            document.getElementsByClassName("artist-info")[0].style.paddingBottom = "40px";
            document.getElementsByClassName("artist-summary")[0].style.paddingBottom = "25px";
        }
    }

    render() {

        const { errorAlert, artist, events, bio } = this.state

        const handleErrorAlert = e => {
            e.preventDefault()
            this.setState({ errorAlert: '' });
        }

        const handleSelectEvent = id => {
            console.log(id)
            this.props.history.push(`/event/${id}`)
        }

        const handleBioToggle = e => {
            this.setState(prevState => ({
                bio: !prevState.bio
            }));
        }

        return (
            <div>
                {/* {isAuth() ? <Redirect to='/' /> : null} */}
                <div className="artist-summary">
                    <div className="artist-info">
                        <div className="row">
                            <div className="col text-center">
                                <h2><strong>{artist.name}</strong></h2>
                                <h5>{artist.genre}</h5>
                                <h5>{artist.city}</h5>
                                <button className="bio-btn" onClick={() => handleBioToggle()}>Bio</button>
                                <br></br>{bio ? artist.bio : null}
                                <a href={artist.merchandise}><h5>Merch</h5></a>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-10 text-center">
                                {/* This where the social media icons will go */}
                                <a href={artist.facebook}><img className="social-media-links" src="./../../../images/Facebook.png" alt="Facebook" /></a>
                                <a href={artist.instagram}><img className="social-media-links" src="./../../../images/Instagram.png" alt="Instagram" /></a>
                                <a href={artist.twitter}><img className="social-media-links" src="./../../../images/Twitter.png" alt="Twitter" /></a>
                                <a href={artist.spotify}><img className="social-media-links" src="./../../../images/Spotify.png" alt="Spotify" /></a>
                                <a href={artist.soundcloud}><img className="social-media-links" src="./../../../images/Soundcloud.png" alt="Soundcloud" /></a>
                            </div>
                            <div className="col-1"></div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8 text-right">
                            <h4>Timeline</h4>
                        </div>
                        <div className="col-4 mt-2">
                            <h6>Total: {events.length}</h6>
                        </div>
                    </div>
                </div>

                <div className="container">

                    <Alert
                        errorAlert={errorAlert}
                        handleErrorAlert={handleErrorAlert}
                    />

                    <div className="row timeline-section">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div>
                                {/* This is where the event timeline info will go */}
                                {events.map(event => (
                                    <Eventcard
                                        id={event.event.id}
                                        key={event.event.id}
                                        city={event.event.city}
                                        date={moment(event.event.date).format('MM/DD/YY')}
                                        seats={event.event.seats}
                                        handleSelectEvent={handleSelectEvent}
                                    />
                                ))}
                            </div>
                            <div className="text-center mt-4">
                                <h5>Joined: {moment(artist.createdAt).format('MM/DD/YY')}</h5>
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