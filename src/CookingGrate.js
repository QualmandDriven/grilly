import React from 'react';
import moment from 'moment';
import barbequeData from './barbequeData.json';

import './CookingGrate.css';

class CookingGrate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: null,
            startTime: null,
            remainingTime: new Date(0, 0, 0, 0, 8),
            neededTime: new Date(0, 0, 0, 0, 8),
            grillKind: null
        };
    }

    onStartClick = (e) => {
        console.log("Start timer");
        if(this.state !== null && this.state.timer !== null) {
            clearInterval(this.state.timer);
        }
        let timer = setInterval(this.tick, 300);
        this.setState({timer, startTime: new Date()});
    }

    onStopClick = (e) => {
        console.log("Stop timer");
        if(this.state !== null && this.state.timer !== null) {
            clearInterval(this.state.timer);
            this.setState({startTime: null, timer: null, remainingTime: new Date(0, 0, 0, 0, 8), neededTime: new Date(0, 0, 0, 0, 8)});
        }
    }

    onAddClick = (e) => {
        console.log("add click")
        let t = this.state.neededTime;
        t.setSeconds(t.getSeconds() + 30);
        let r = this.state.remainingTime;
        r.setSeconds(r.getSeconds() + 30);

        this.setState({neededTime: t, remainingTime: r});
    }

    onSubtractClick = (e) => {
        console.log("subtract click");
        let t = this.state.neededTime;
        t.setSeconds(t.getSeconds() - 30);
        let r = this.state.remainingTime;
        r.setSeconds(r.getSeconds() - 30);

        this.setState({neededTime: t, remainingTime: r});
    }

    tick = () => {
        let elapsed = Math.round(new Date() - this.state.startTime);
        let d = moment(this.state.neededTime).subtract(elapsed, "milliseconds");
        this.setState({remainingTime: d})
    }

    onGrillKindChanged = (e) => {
        this.setState({grillKind: e.target.value});
    }

    render() {
        let playStopButton = this.state.timer === null ? <button onClick={this.onStartClick}>Start</button> : <button onClick={this.onStopClick}>Stop</button>
        let d = moment(this.state.remainingTime).format("HH:mm:ss");

        let grillKinds = barbequeData.map(b => <option key={b.name}>{b.name}</option>);

        let grillLevels = null;
        if(this.state.grillKind !== null) {
            let grillKind = barbequeData.find(b => b.name === this.state.grillKind)
            grillLevels = grillKind.cookingLevels.map(c => <option key={c.name}>{c.name}</option>);
        } else {
            grillLevels = barbequeData[0].cookingLevels.map(c => <option key={c.name}>{c.name}</option>);
        }

        return (
        <div className="cg">
            <div className="cg-header">
                <h3>Grillrost #{this.props.number}</h3>
                <hr/>
            </div>
            <div>
                Art: 
                <select onChange={this.onGrillKindChanged}>
                    {grillKinds}
                </select>
            </div>
            <div>
                Grillpunkt:
                <select>
                    {grillLevels}
                </select>
            </div>
            <div>
                <div>
                    <h4>{d}</h4>
                </div>
                <div>
                    {playStopButton}<button onClick={this.onAddClick}>+</button><button onClick={this.onSubtractClick}>-</button>
                </div>  
                <div>
                    <button>Jetzt wenden</button>
                </div>
            </div>
            <div>
                <img height="250px" src="wammerl.jpg" alt="wammerl"/>
            </div>
        </div>);
    }
}
export default CookingGrate;

/* <div>
Art: 
<select>
    <option>Halsgrat</option>
    <option>Wammerl</option>
    <option>Käsegriller</option>
    <option>Schweinswürste</option>
    <option>Rindfleisch</option>
    <option>Schwammerl</option>
    <option>Gemüse</option>
    <option>Grillkäse</option>
</select>
</div>
<div>
Grillpunkt:
<select>
    <option>Blutig</option>
    <option>Medium</option>
    <option>Well done</option>
    <option>Hell</option>
    <option>Mittel</option>
    <option>Dunkel</option>
</select>
</div> */