import React, { Component } from 'react';
import { isAuth } from '../../helpers/auth';
import axios from 'axios';
import Alert from '../../components/Alert/index';
import { Redirect } from 'react-router-dom';

class Editartist extends Component {
    constructor() {
        super()
        this.state = {
            errorAlert: '',
            userId: '',
            name: '',
            city: '',
            genre: '',
            bio: '',
            venmo: '',
            facebook: '',
            twitter: '',
            instagram: '',
            spotify: '',
            soundcloud: '',
            merchandise: '',
            other: '',
        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user');
            const id = JSON.parse(user).id;
            this.setState({ userId: id });

            axios.post('/fan/api/artist/details/profile', {
                id
            }).then(res => {
                console.log(res.data.artist)
                this.setState({
                    name: res.data.artist.name,
                    city: res.data.artist.city,
                    genre: res.data.artist.genre,
                    bio: res.data.artist.bio,
                    venmo: res.data.artist.venmo,
                    facebook: res.data.artist.facebook,
                    twitter: res.data.artist.twitter,
                    instagram: res.data.artist.instagram,
                    spotify: res.data.artist.spotify,
                    soundcloud: res.data.artist.soundcloud,
                    merchandise: res.data.artist.merchandise,
                    other: res.data.artist.otherLink
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }


    render() {

        const { errorAlert, userId, name, city, genre, bio, venmo, facebook, twitter, instagram, spotify, soundcloud, merchandise, other } = this.state

        // Handle change from inputs
        const handleChange = e => {
            this.setState({ [e.target.name]: e.target.value })
        }

        // Handles removing the alert message inclucing the alert message text from state whenever user clicks the "x" button
        const handleErrorAlert = e => {
            this.setState({ errorAlert: '' });
        }

        // Submit data to backend
        const handleSubmit = e => {

            e.preventDefault()
            // This if statement is a fallback for if for some reason the user is able to click the disabled button,
            // in order to post the same conditions of all fields and validations need to apply
            if (userId && name && city && genre && bio && venmo) {
                axios.post('/fan/api/artist/edit/profile', {
                    userId, name, city, genre, bio, venmo, facebook, twitter, instagram, spotify, soundcloud, merchandise, other
                }).then(res => {
                    console.log(res.data)
                    const id = res.data.artist.userId
                    // this.setState({
                    //     password: ''
                    // });

                    // Direct the page to the create artist profile page
                    this.props.history.push(`/artist/${id}`);
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

        const handleCancel = e => {
            this.props.history.push(`/artist/${userId}`);
        }

        return (
            <div>
                {/* This will redirect the user if they are logged in to go to the home page, otherwise nothing */}
                {isAuth() ? null : <Redirect to='/artist/login' />}
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
                                        {/* <img src="./../../images/Brits-Wine-Logo-200w.png" alt="Sofar Sounds Logo" width="100px" className="mt-3 mb-3" /> */}
                                        <h3>
                                            Create Artist Profile
                                        </h3>
                                    </div>
                                </div>

                                {/* Register form inputs */}
                                <div className="row">
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                    <form className="col-lg-8 col-md-10 col-sm-10" onSubmit={handleSubmit}>
                                        <div>

                                            {/* Artist Name Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Artist Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter artist name"
                                                            name="name"
                                                            onChange={handleChange}
                                                            value={name}
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
                                                        <small>Add the city you are mainly based</small>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Genre Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Genre</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter genre"
                                                            name="genre"
                                                            onChange={handleChange}
                                                            value={genre}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bio Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Bio</label>
                                                        <textarea
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter bio"
                                                            name="bio"
                                                            onChange={handleChange}
                                                            value={bio}
                                                            required
                                                            rows="3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Venmo Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Venmo</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter venmo handle"
                                                            name="venmo"
                                                            onChange={handleChange}
                                                            value={venmo}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Facebook Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Facebook</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter facebook page"
                                                            name="facebook"
                                                            onChange={handleChange}
                                                            value={facebook}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Twitter Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Twitter</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter twitter handle"
                                                            name="twitter"
                                                            onChange={handleChange}
                                                            value={twitter}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Instagram Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Instagram</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter instagram handle"
                                                            name="instagram"
                                                            onChange={handleChange}
                                                            value={instagram}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Spotify Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Spotify</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter spotify link"
                                                            name="spotify"
                                                            onChange={handleChange}
                                                            value={spotify}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Soundcloud Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Soundcloud</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter soundcloud link"
                                                            name="soundcloud"
                                                            onChange={handleChange}
                                                            value={soundcloud}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Merchandise Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Merchandise Link</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter link to merchandise"
                                                            name="merchandise"
                                                            onChange={handleChange}
                                                            value={merchandise}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Other Input */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Other Link</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter other link"
                                                            name="other"
                                                            onChange={handleChange}
                                                            value={other}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit button - This will only be enabled when all of the conditions of the form are met */}
                                            <div className="form-row mt-4">
                                                <div className="col-5 text-center">
                                                    <button
                                                        className="cancel-button"
                                                        onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div className="col-7 text-center">
                                                    <button
                                                        type="submit"
                                                        className="submit-button"
                                                        disabled=
                                                        {userId &&
                                                            name &&
                                                            city &&
                                                            genre &&
                                                            bio &&
                                                            venmo ?
                                                            false : true}>
                                                        Update Profile
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

export default Editartist;