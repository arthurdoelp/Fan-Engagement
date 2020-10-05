import React, { useState } from "react";
import "./style.css";

function Eventcard(props) {
    // const [rating, setRating] = useState(null);
    // const [tip, setTip] = useState(null);
    // const [other_amount, setOtherAmount] = useState(null);

    // console.log(rating);
    // const handleSetRating = i => {
    //     setRating(i)
    //     props.handleAddRating(i, props.id)
    // }

    // const handleSetTip = i => {
    //     console.log(i)
    //     setTip(i)
    // }

    // const handleChange = e => {
    //     setOtherAmount(e.target.value)
    // }

    return (
        <div className="container event-card mt-5" key={props.id} onClick={() => props.handleSelectEvent(props.id)}>
            <div className="row">
                <div className="col-6 text-left">
                    <h5>{props.city}</h5>
                    <p className="mt-3">Seats: {props.seats}</p>
                </div>
                <div className="col-6 text-right">
                    <p>{props.date}</p>
                </div>
            </div>
        </div>
    );
}

export default Eventcard;