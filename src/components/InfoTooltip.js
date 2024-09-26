import React from 'react';

function infoTooltip({ isOpen, onClose, message}) {
    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <p>{message}</p>
                </div>
            </div>
        )
    );
}

export default infoTooltip;