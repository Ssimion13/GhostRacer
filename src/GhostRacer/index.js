import React, {Component} from "react"
import {Button} from "reactstrap"



class GhostRacer extends Component {
    constructor(){
        super();
        this.state = {
            chore: "",
            choreList: [],
            toggleStart: true,
            seconds: 0,
            checkpoints: []
        }
        this.interval = null;
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCheckpoint = this.handleCheckpoint.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name] : [e.target.value]
        })
    }

    handleSubmit(e){
        this.setState({
            choreList: this.state.choreList.concat(this.state.chore)
        })
    }


    handleStart() {
        this.setState({toggleStart: false})
        this.interval = setInterval( () =>
            this.setState({
              seconds: this.state.seconds + 1
            }), 1000)
    }

    handleStop() {
        this.setState({toggleStart: true});
        clearInterval(this.interval);
    }

    handleReset() {
        clearInterval(this.interval);
        this.setState ({
            toggleStart: true,
            seconds: 0,
            chore: "",
            choreList: [],
            checkpoints: []
        })
    }

    handleCheckpoint() {
        this.setState({
            checkpoints: this.state.checkpoints.concat(this.state.seconds)
        })
    }

    handleFinish() {
        this.setState({
            finishTime: this.state.seconds,
            finished: true
        })
    }




    render(){
        var mappedChoreList = this.state.choreList.map((x,i) => {
            return(
                <div key={x+i + 100}>
                    <li> {x} </li>
                </div>
            )
        })
        return(
            <div>
            <form>
                <input name="chore" placeholder="Chores to do" onChange={this.handleChange} />
                <Button onClick={this.handleSubmit}> Submit </Button>
            </form>
                
            <div>
            Ghost Racer 
            {this.state.toggleStart ? 
            <Button color="primary" onClick={this.handleStart}> Start </Button>
            : <Button color="secondary" onClick={this.handleStop}> Stop </Button> }
            <Button onClick={this.handleReset}> Reset </Button>
            <Button onClick={this.handleCheckpoint}> Checkpoint </Button>
            <Button onClick={this.handleFinish}> Done! </Button>

                <div> 
                {Math.round(this.state.seconds / 60)} : {this.state.seconds % 60}
                </div>
            </div>
            {this.state.choreList.length > 0 ? 
                <div>
                    <h2> Current Chores </h2>
                    <ol>
                        {mappedChoreList}
                    </ol>
                </div>
            : null }
            <div>
                {this.state.checkpoints.map((x, i) => {
                    return (
                    <div key={x+i}> 
                       {this.state.choreList[i]} {x} 
                    </div>
                    )
                })}
            </div>
            </div>
        )
    }


}

export default GhostRacer