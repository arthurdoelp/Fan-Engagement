import React, { useState } from "react";
import "./style.css";
import Rating from './../Rating/index';

function Artistcard(props) {
    const [rating, setRating] = useState(null);
    const [tip, setTip] = useState(null);
    // const [other_amount, setOtherAmount] = useState(null);

    // console.log(rating);
    const handleSetRating = i => {
        setRating(i)
        props.handleAddRating(i, props.id)
    }

    const handleSetTip = i => {
        console.log(i)
        setTip(i)
    }

    // const handleChange = e => {
    //     setOtherAmount(e.target.value)
    // }

    return (
        <div className="container artist-card mt-4" key={props.id}>
            <div className="row">
                <div className="col text-left">
                    <button className="artist-name" onClick={() => props.handleSelectArtist(props.id)}>{props.name}</button>
                </div>
            </div>

            <div className="row">
                <div className="col-1"></div>
                <div className="col-10">
                    {/* This where the social media icons will go */}
                    <a href={props.facebook}><img className="social-media-links" src="./../../../images/Facebook.png" alt="Facebook" /></a>
                    <a href={props.instagram}><img className="social-media-links" src="./../../../images/Instagram.png" alt="Instagram" /></a>
                    <a href={props.twitter}><img className="social-media-links" src="./../../../images/Twitter.png" alt="Twitter" /></a>
                    <a href={props.spotify}><img className="social-media-links" src="./../../../images/Spotify.png" alt="Spotify" /></a>
                    <a href={props.soundcloud}><img className="social-media-links" src="./../../../images/Soundcloud.png" alt="Soundcloud" /></a>
                </div>
                <div className="col-1"></div>
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
                                onClick={() => props.handleVenmoPayment(tip, props.venmo, props.id)}
                            >
                                Tip with Venmo
                            </button>
                        </div>
                    </div>
                </div>
                : null}
        </div>
    );
}

export default Artistcard;