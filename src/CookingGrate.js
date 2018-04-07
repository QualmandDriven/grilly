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
            remainingTurns: [],
            selectedGrillKind: null,
            selectedGrillLevel: null,
        };
    }

    componentDidMount() {
        this.setGrillKind(barbequeData[0].name);
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
            this.setState({startTime: null, timer: null, remainingTime: this.state.neededTime});
            this.setGrillLevel(this.state.selectedGrillLevel.name);
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

        let turns = this.state.remainingTurns;
        turns[0] = turns[0] - elapsed / 1000;
        if(turns[0] <= 0) {
            turns = turns.slice(1, turns.length);
        }

        console.log(turns);
        this.setState({remainingTime: d, remainingTurns: turns});
    }

    onGrillKindChanged = (e) => {
        this.setGrillKind(e.target.value);
    }

    onGrillLevelChanged = (e) => {
        this.setGrillLevel(e.target.value);
    }

    setGrillKind = (name) => {
        let grillKind = barbequeData.find(b => b.name === name)
        let grillLevels = grillKind.cookingLevels;
        // this.setState({selectedGrillKind: grillKind});

        // Set a default grill level
        //this.setGrillLevel(grillLevels[0].name);
        let time = new Date(0, 0, 0, 0, 0, grillLevels[0].requiredSeconds);
        let turns = grillLevels[0].turns.map(t => t.turnAfterSeconds);
        this.setState({selectedGrillKind: grillKind, selectedGrillLevel: grillLevels[0], neededTime: time, remainingTime: time, remainingTurns: turns});
    } 

    setGrillLevel = (name) => {
        let grillLevel = this.state.selectedGrillKind.cookingLevels.find(gl => gl.name === name);
        let time = new Date(0, 0, 0, 0, 0, grillLevel.requiredSeconds);
        let turns = grillLevel.turns.map(t => t.turnAfterSeconds);
        this.setState({selectedGrillLevel: grillLevel, neededTime: time, remainingTime: time, remainingTurns: turns});
    }

    render() {
        let playStopButton = this.state.timer === null ? <button onClick={this.onStartClick}>Start</button> : <button onClick={this.onStopClick}>Stop</button>

        // Get all possible kinds (Wammerl, Steak, etc.)
        let grillKinds = barbequeData.map(b => <option key={b.name}>{b.name}</option>);

        // Get grill level of specific or default grill kind
        let grillLevels = null;
        if(this.state.selectedGrillKind !== null) {
            grillLevels = this.state.selectedGrillKind.cookingLevels.map(c => <option key={c.name}>{c.name}</option>);
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
                <select onChange={this.onGrillLevelChanged}>
                    {grillLevels}
                </select>
            </div>
            <div>
                <div>
                    <h4>{moment(this.state.remainingTime).format("HH:mm:ss")}</h4>
                    {this.state.remainingTurns}
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