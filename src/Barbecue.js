import React from 'react';

import './Barbecue.css';
import CookingGrate from './CookingGrate';

class Barbecue extends React.Component {
    render() {
        return (
            <div className="bbq">
                <button>Grill aktualisieren</button>
                <div className="grid-container">
                    <CookingGrate number="1" />
                    <CookingGrate number="2" />
                </div>
            </div>
        );
    }
}
export default Barbecue;