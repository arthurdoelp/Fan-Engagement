import React, { Component } from 'react';
import './style.css';
import { isAuth } from '../../helpers/auth';
import axios from 'axios';
import Alert from '../../components/Alert/index';
import { Redirect } from 'react-router-dom';

class Createevent extends Component {
    constructor() {
        super()
        this.state = {
            errorAlert: '',
            userId: '',
            date: '',
            city: '',
            address: '',
            seats: '',
            artists: [],
            showArtists: false,
            performer: '',
            performers: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user');
            const id = JSON.parse(user).id;
            this.setState({ userId: id });

            axios.post('/fan/api/artist/names/all', {
            })
                .then(res => {
                    console.log(res.data.artists);
                    this.setState({
                        artists: res.data.artists
                    });
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ errorAlert: err.response.data.errors })
                })
        }
    }


    render() {

        const { errorAlert, userId, city, performer, date, address, seats, showArtists, performers } = this.state

        // Handle change from inputs
        const handleChange = e => {
            this.setState({ [e.target.name]: e.target.value })
        }

        const handlePerformerChange = e => {
            this.setState({ showArtists: true })
            this.setState({ [e.target.name]: e.target.value })
        }

        const handleBlur = e => {
            if (performer === "") {
                this.setState({ showArtists: false })
            }
        }

        // Handles removing the alert message inclucing the alert message text from state whenever user clicks the "x" button
        const handleErrorAlert = e => {
            this.setState({ errorAlert: '' });
        }

        let filteredArtists = this.state.artists.filter(artist => {
            return artist.name.toLowerCase().includes(this.state.performer.toLowerCase());
        });

        const handleSelectArtist = name => {
            this.setState({ showArtists: false })
            if (performers.includes(name) != 1) {
                performers.push(name)
                this.setState({
                    performers: performers,
                    performer: ''
                })
            }
        }

        const removePerformer = i => {
            var filteredPerformers = performers.filter(performer => performer !== i);
            this.setState({ performers: filteredPerformers })
        }

        // Submit data to backend
        const handleSubmit = e => {

            e.preventDefault()
            // This if statement is a fallback for if for some reason the user is able to click the disabled button,
            // in order to post the same conditions of all fields and validations need to apply
            if (userId && date && city && address && seats && performers) {
                axios.post('/fan/api/event/create', {
                    userId, date, city, address, seats, performers
                }).then(res => {
                    console.log(res.data)
                    const id = res.data.event.id
                    // this.setState({
                    //     password: ''
                    // });

                    // Direct the page to the event page
                    this.props.history.push(`/event/${id}`);
                })
                    .catch(err => {
                        // Display the error if there is an error
                        this.setState({ errorAlert: err.response.data.errors })
                    });
            } else {
                // Display the error if there is an error
                this.setState({ errorAlert: "Please fill all fields" })
            }
        }

        return (
            <div>
                {/* This will redirect the user if they are logged in to go to the home page, otherwise nothing */}
                {isAuth() ? null : <Redirect to='/login/admin' />}
                <div className="container">

                    <Alert
                        errorAlert={errorAlert}
                        handleErrorAlert={handleErrorAlert}
                    />

                    <div className="row">
                        <div className="col-lg-3 col-md-1"></div>
                        <div className="col-lg-6 col-md-10">
                            <div className="register-form mt-5 pb-4">
                                {/* Title section w/ logo */}
                                <div className="row">
                                    <div className="col text-center">
                                        <h3>
                                            Create Event
                                        </h3>
                                    </div>
                                </div>

                                {/* Register form inputs */}
                                <div className="row mt-4">
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                    <form className="col-lg-8 col-md-10 col-sm-10" onSubmit={handleSubmit} autoComplete="off">
                                        <div>

                                            {/* Event Date Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Event Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter date"
                                                            name="date"
                                                            onChange={handleChange}
                                                            value={date}
                                                            autoFocus
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* City Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter city"
                                                            name="city"
                                                            onChange={handleChange}
                                                            value={city}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Address Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Address</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter address"
                                                            name="address"
                                                            onChange={handleChange}
                                                            value={address}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Seats Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Seats</label>
                                                        <input
                                                            type="number"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter number of seats"
                                                            name="seats"
                                                            onChange={handleChange}
                                                            value={seats}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Performers Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Performers</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Add performers"
                                                            name="performer"
                                                            onChange={handlePerformerChange}
                                                            onBlur={handleBlur}
                                                            value={performer}
                                                            disabled={performers.length <= 2 ? false : true}
                                                            required
                                                        />
                                                        <small>Add up to 3 performers</small>
                                                    </div>
                                                </div>
                                            </div>

                                            {showArtists ?
                                                <div className="vertical-menu">
                                                    {filteredArtists.map(artist =>
                                                        <div key={artist.name}>
                                                            <button
                                                                className="text-center"
                                                                onClick={() => handleSelectArtist(artist.name)}
                                                            >
                                                                {artist.name}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                : null}

                                            <div className="row">
                                                <div className="col">
                                                    {performers.map(performer =>
                                                        <div key={performer}>
                                                            <button
                                                                className="performer-button"
                                                                onClick={() => removePerformer(performer)}
                                                            >
                                                                {performer}
                                                                <span style={{ marginLeft: "10px", cursor: "pointer", color: "#039842" }}>&times;</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Submit button - This will only be enabled when all of the conditions of the form are met */}
                                            <div className="form-row mt-5">
                                                <div className="col text-center">
                                                    <button
                                                        type="submit"
                                                        className="submit-button"
                                                        disabled=
                                                        {userId &&
                                                            date &&
                                                            city &&
                                                            address &&
                                                            seats &&
                                                            performers.length > 0 ?
                                                            false : true}>
                                                        Create Event
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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

export default Createevent;