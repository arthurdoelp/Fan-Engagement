import React from "react";

function Alert(props) {
    return (
        <div>
            {/* This is for any alerts/errors */}
            {(props.errorAlert) ?
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {props.errorAlert}
                    <button type="button" className="close" onClick={() => props.handleErrorAlert()} data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                : null}
        </div>
    );
}

export default Alert;