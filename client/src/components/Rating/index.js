import React from "react";
import "./style.css";
import { FaStar } from 'react-icons/fa';

const Rating = (props) => {
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => props.handleSetRating(ratingValue)}
                            disabled={props.rating ? true : false}
                        />
                        <FaStar
                            className="star"
                            color={ratingValue <= props.rating ? "#ffc107" : "#e4e5e9"}
                            size={40}
                        />
                    </label>
                );
            })}
        </div>
    )
}

export default Rating;