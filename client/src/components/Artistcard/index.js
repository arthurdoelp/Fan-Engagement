import React, { useState } from "react";
import "./style.css";
import Rating from './../Rating/index';

function Artistcard(props) {
    const [rating, setRating] = useState(null);
    const [tip, setTip] = useState(null);
    // const [other_amount, setOtherAmount] = useState(null);

    // console.log(rating);
    const handleSetRating = i => {
        // console.log(i)
        setRating(i)
    }

    const handleSetTip = i => {
        console.log(i)
        setTip(i)
    }

    // const handleChange = e => {
    //     setOtherAmount(e.target.value)
    // }

    return (
        <div className="container artist-card">
            <div className="row">
                <div className="col-6">
                    <p className="artist-name">{props.artist_name}</p>
                </div>
                <div className="col-6">
                    {/* This where the social media icons will go */}
                </div>
            </div>

            {/* This is where the stars will go */}
            <div className="row mb-3">
                <div className="col text-center">
                    <h6>Rate Performance</h6>
                    <div className="stars-section">
                        <Rating
                            handleSetRating={handleSetRating}
                            rating={rating}
                        />
                    </div>
                </div>
            </div>

            {rating ?
                <div>
                    <div className="row">
                        <div className="col text-center">
                            <h6>Add a tip</h6>
                        </div>
                    </div>

                    <div className="row text-center mt-1 mb-3">
                        <div className="col">
                            <label
                                className="tip-option"
                            >
                                <input
                                    type="radio"
                                    name="tip"
                                    value="1"
                                    onClick={() => handleSetTip(1)}
                                />
                                $1
                            </label>
                        </div>
                        <div className="col">
                            <label
                                className="tip-option"
                            >
                                <input
                                    type="radio"
                                    name="tip"
                                    value="5"
                                    onClick={() => handleSetTip(5)}
                                />
                                $5
                            </label>
                        </div>
                        <div className="col">
                            <label
                                className="tip-option"
                            >
                                <input
                                    type="radio"
                                    name="tip"
                                    value="10"
                                    onClick={() => handleSetTip(10)}
                                />
                                $10
                            </label>
                        </div>
                    </div>

                    {/* <div className="row">
                        <div className="col text-center">
                            <span className="other-amount">Other Amount</span><br></br>
                            <input
                                type="number"
                                className="other-amount-input m-3"
                                name="other_amount"
                                value={other_amount}
                                onChange={handleChange}
                                placeholder="$0.00"
                            />
                        </div>
                    </div> */}

                    <div className="row mb-3">
                        <div className="col text-center">
                            <button
                                className="venmo-button"
                            >
                                Venmo
                            </button>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
}

export default Artistcard;