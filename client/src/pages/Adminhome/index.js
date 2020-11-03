import React, { Component } from 'react';
import { isAuth, authenticate } from '../../helpers/auth';
import axios from 'axios';
import Alert from '../../components/Alert/index';
// import { Redirect } from 'react-router-dom';

class Adminhome extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            password: '',
            isPasswordShown: false,
            hasNum: false,
            hasSpecial: false,
            hasMin: false,
            errorAlert: ''
        }
    }


    render() {

        const { errorAlert, search } = this.state


        // Handle change from inputs
        const handleChange = e => {
            this.setState({ [e.target.name]: e.target.value })
        }

        // Handles removing the alert message inclucing the alert message text from state whenever user clicks the "x" button
        const handleErrorAlert = e => {
            this.setState({ errorAlert: '' });
        }

        // Submit data to backend
        // const handleSubmit = e => {

        //     e.preventDefault()
        //     // This if statement is a fallback for if for some reason the user is able to click the disabled button,
        //     // in order to post the same conditions of all fields and validations need to apply
        //     if (email && password && hasNum && hasSpecial && hasMin) {
        //         axios.post('/fan/api/admin/login', {
        //             email, password
        //         }).then(res => {
        //             console.log(res.data.user)
        //             const id = res.data.user.id
        //             this.setState({
        //                 password: ''
        //             });

        //             authenticate(res, () => { })

        //             if (isAuth() && res.data.user.role === "admin") {
        //                 // Direct the page to the create artist profile page
        //                 this.props.history.push(`/admin/home`);
        //             }
        //         })
        //             .catch(err => {
        //                 // Display the error if there is an error
        //                 this.setState({ errorAlert: err.response.data.errors })
        //             });
        //     } else {
        //         // Display the error if there is an error
        //         this.setState({ errorAlert: "Please fill all fields" })
        //     }
        // }

        return (
            <div>
                {/* This will redirect the user if they are logged in to go to the home page, otherwise nothing */}
                {/* {isAuth() ? <Redirect to='/' /> : null} */}
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
                                        <h6>Admin</h6>
                                        <h3>
                                            Home
                                        </h3>
                                    </div>
                                </div>

                                {/* Register form inputs */}
                                <div className="row">
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                    <div className="col-lg-8 col-md-10 col-sm-10">
                                        <div>

                                            {/* Search Section */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Search</label>
                                                        <input
                                                            type="search"
                                                            className="form-control form-control-lg"
                                                            placeholder="Search Artists"
                                                            name="search"
                                                            onChange={handleChange}
                                                            value={search}
                                                            autoFocus
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Submit button - This will only be enabled when all of the conditions of the form are met */}
                                            <div className="form-row mt-4">
                                                <div className="col text-center">
                                                    <button
                                                        type="submit"
                                                        className="submit-button"
                                                    >
                                                        Create Event
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <p>Don't have an account? <a href='/register/admin'>Sign up!</a></p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-1"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Adminhome;