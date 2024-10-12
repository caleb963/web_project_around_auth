import React from 'react';
import '../blocks/infoTooltip.css';

function InfoTooltip({ isOpen, onClose, message, type}) {
    return (
            <div className={`tooltip ${isOpen ? 'tooltip__open' : ''}`}>
                <div className={`tooltip__content tooltip__content_${type}`}>
                    <p className="tooltip__message">{message}</p>
                    <button href='Close__Icon.png' className="tooltip__close" onClick={onClose}>Close</button>
                </div>
            </div>
        );
}

export default InfoTooltip;