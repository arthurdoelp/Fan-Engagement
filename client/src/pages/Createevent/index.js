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
            performerInputs: [],
            performer: '',
            performer1: '',
            performer2: '',

        }
    }

    componentDidMount() {
        if (localStorage.getItem('user')) {
            const user = localStorage.getItem('user');
            const id = JSON.parse(user).id;
            this.setState({ userId: id });
        }
    }


    render() {

        const { errorAlert, userId, name, city, genre, bio, venmo, facebook, twitter, instagram, spotify, soundcloud, merchandise, other, performerInputs, performer, date } = this.state

        // Handle change from inputs
        const handleChange = e => {
            this.setState({ [e.target.name]: e.target.value })
        }

        // Handles removing the alert message inclucing the alert message text from state whenever user clicks the "x" button
        const handleErrorAlert = e => {
            this.setState({ errorAlert: '' });
        }

        // This will create a new row of input fields to add another coworker in the form
        const renderPerformerInput = e => {
            e.preventDefault()
            // This will work as long as the total number of rows of inputs is less than 7
            if (performerInputs.length <= 1) {
                var newInput = performerInputs.length;
                // Here we just want to concatenate the number of the row of inputs to the coworker inputs
                this.setState(prevState => ({ performerInputs: prevState.performerInputs.concat([newInput]) }));
            }
        }

        // Handle removing the specific input values and input row tied to the "x" which the user clicked
        // Basically this handles deleting an input row
        const removeInput = i => {
            // this uses es6 filter method to remove the row that was clicked on so the only rows displayed are the rows that were not deleted
            var filteredInputs = performerInputs.filter(performerInput => performerInput !== i);
            // Set the state of the coworker inputs which is the array to the filtered inputs defined above. Also set those input values of
            // The deleted row back to an empty string so no random input values are sent to the backend
            this.setState({
                performerInputs: filteredInputs,
                [`performer${i}`]: ''
            });
        }

        // Submit data to backend
        const handleSubmit = e => {

            e.preventDefault()
            // This if statement is a fallback for if for some reason the user is able to click the disabled button,
            // in order to post the same conditions of all fields and validations need to apply
            if (userId && name && city && genre && bio && venmo) {
                axios.post('/fan/api/artist/create/profile', {
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
                                    <form className="col-lg-8 col-md-10 col-sm-10" onSubmit={handleSubmit}>
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

                                            {/* Performers Input */}
                                            <div className="form-row mt-4">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Performers</label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter performer"
                                                            name="performer"
                                                            onChange={handleChange}
                                                            value={performer}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Map out the rows of coworker Inputs */}
                                            {performerInputs.map(index =>
                                                <div key={index}>
                                                    <div className="form-row">
                                                        <div className="col-11">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control form-control-lg"
                                                                    placeholder="Enter performer"
                                                                    name={`performer${index.id}`}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-1" onClick={() => removeInput(index)}>
                                                            <span style={{ fontSize: "25px", cursor: "pointer" }}>&times;</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Add more performers Button */}
                                            <div className="row">
                                                <div className="col">
                                                    <button
                                                        type="button"
                                                        className="add-performer-button"
                                                        onClick={renderPerformerInput}
                                                        disabled={performerInputs.length <= 1 ? false : true}
                                                    >
                                                        + Add more performers
                                                    </button>
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
                                                            performer ?
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