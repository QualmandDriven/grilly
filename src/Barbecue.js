import React from 'react';

import CookingGrate from './CookingGrate';

class Barbecue extends React.Component {
    render() {
        return (
            <div>
                <button>Grill aktualisieren</button>
                <CookingGrate number="1" />
                <CookingGrate number="2" />
            </div>
        );
    }
}
export default Barbecue;