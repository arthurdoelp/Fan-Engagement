import React, { Component } from 'react';
import { isAuth, authenticate } from '../../helpers/auth';
import axios from 'axios';
import Alert from '../../components/Alert/index';
// import { Redirect } from 'react-router-dom';

class Adminlogin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isPasswordShown: false,
            hasNum: false,
            hasSpecial: false,
            hasMin: false,
            errorAlert: ''
        }
    }


    render() {

        const { email, password, isPasswordShown, hasNum, hasSpecial, hasMin, errorAlert } = this.state

        // This toggles the visibility of the eye icon and the input type for the password whenever the eye icon is clicked
        const togglePasswordVisibility = () => {
            const { isPasswordShown } = this.state;
            this.setState({ isPasswordShown: !isPasswordShown })
        }

        // Handle change from inputs
        const handleChange = e => {
            this.setState({ [e.target.name]: e.target.value })
        }

        // Handle change from password inputs
        const handlePasswordChange = e => {
            this.setState({ [e.target.name]: e.target.value })

            // Validation if contains number
            let containsNumber = e.target.value.match(/\d+/g);
            if (containsNumber !== null) {
                this.setState({ hasNum: true })
            } else {
                this.setState({ hasNum: false })
            }

            // Validation if contains a special character
            let containsSpecial = e.target.value.match(/[\s~`!@#$%&*+=\-\]\\';,/{}|\\":<>()_]/g);
            if (containsSpecial !== null) {
                this.setState({ hasSpecial: true })
            } else {
                this.setState({ hasSpecial: false })
            }

            // Validation if the password contains at least 10 characters
            if (e.target.value.length >= 10) {
                this.setState({ hasMin: true })
            } else {
                this.setState({ hasMin: false })
            }
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
            if (email && password && hasNum && hasSpecial && hasMin) {
                axios.post('/fan/api/admin/login', {
                    email, password
                }).then(res => {
                    console.log(res.data.user)
                    const id = res.data.user.id
                    this.setState({
                        password: ''
                    });

                    authenticate(res, () => { })

                    if (isAuth() && res.data.user.role === "admin") {
                        // Direct the page to the create artist profile page
                        this.props.history.push(`/admin/home`);
                    }
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
                                            Login
                                        </h3>
                                    </div>
                                </div>

                                {/* Register form inputs */}
                                <div className="row">
                                    <div className="col-lg-2 col-md-1 col-sm-1"></div>
                                    <form className="col-lg-8 col-md-10 col-sm-10" onSubmit={handleSubmit}>
                                        <div>

                                            {/* Email Section */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter email"
                                                            name="email"
                                                            onChange={handleChange}
                                                            value={email}
                                                            autoFocus
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Password section */}
                                            <div className="form-row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label>Password</label>
                                                        <input
                                                            type={(isPasswordShown) ? "text" : "password"}
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter password"
                                                            name="password"
                                                            onChange={handlePasswordChange}
                                                            value={password}
                                                            maxLength="50"
                                                            required
                                                        />
                                                        <img className="password-icon"
                                                            src={(isPasswordShown) ? "./../../images/Eye-Icon-Hide.png" : "./../../images/Eye-Icon-Show.png"}
                                                            alt="Eye Icon"
                                                            width="25px"
                                                            onClick={togglePasswordVisibility}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Password validations */}
                                            <div className="form-row text-center">
                                                <div className="col">
                                                    <small className={hasMin ? "success" : null}>10 characters min</small>
                                                </div>
                                                <div className="col">
                                                    <small className={hasSpecial ? "success" : null}>1 special character</small>
                                                </div>
                                                <div className="col">
                                                    <small className={hasNum ? "success" : null}>1 number</small>
                                                </div>
                                            </div>

                                            {/* Strong password validation */}
                                            <div className="form-row mt-1">
                                                <div className="col text-center">
                                                    {(hasMin && hasSpecial && hasNum) ? <p className="success-complete">Strong password!</p> : null}
                                                </div>
                                            </div>

                                            {/* Submit button - This will only be enabled when all of the conditions of the form are met */}
                                            <div className="form-row mt-4">
                                                <div className="col text-center">
                                                    <button
                                                        type="submit"
                                                        className="submit-button"
                                                        disabled=
                                                        {email &&
                                                            hasMin &&
                                                            hasSpecial &&
                                                            hasNum ?
                                                            false : true}>
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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

export default Adminlogin;