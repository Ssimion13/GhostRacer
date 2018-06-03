import React, {Component} from "react"
import {Button} from "reactstrap"
import GhostRacerChoreList from "./GhostRacerChoreList"
import GhostRacerComponent from "./GhostRacerComponent"


class GhostRacer extends Component {
    constructor(){
        super();
        this.state = {
            chore: "",
            choreList: [],
            toggleStart: true,
            seconds: 0,
            checkpoints: [],
            checkpointCounter: 0
        }
        this.interval = null;
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCheckpoint = this.handleCheckpoint.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearChores = this.clearChores.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name] : [e.target.value]
        })
    }

    handleSubmit(e){
        this.setState({
            choreList: this.state.choreList.concat(this.state.chore),
            chore: ""
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
        this.setState(prevstate => {
        return({
            checkpoints: this.state.checkpoints.concat(this.state.seconds),
            checkpointCounter: prevstate.checkpointCounter + 1
        })
        }, ()=> {
            if(this.state.checkpointCounter === this.state.choreList.length){
                alert("You're done!")
                clearInterval(this.interval)
            this.setState({
                toggleStart: true,
                finishTime: this.state.seconds,
                finished: true,
                checkpointCounter: 0
            })
            }
        })
        
    }

    clearChores() {
        this.setState ({
            chore: "",
            choreList: []
        })
    }



    render(){

        return(
            <div>
                <form className="choreFormMain">
                    <div className="choreFormHolderDiv">
                        <div>
                            <input  className="choreInput" name="chore" placeholder="Chores to do" value={this.state.chore} onChange={this.handleChange} />
                        </div>
                        <div className="choreFormButtons">
                        
                            <Button onClick={this.handleSubmit}> Submit </Button>
                            <Button onClick={this.clearChores}> Clear </Button>
                            <GhostRacerChoreList choreList={this.state.choreList} />
                        </div>
                    </div>
                </form>
                    
                <div>
                    <div className="timerDiv"> 
                    {Math.round(this.state.seconds / 60)} : {this.state.seconds % 60}
                    </div>
                </div>
                <div className="GhostRacerButtonsMainDiv" >
                    {this.state.toggleStart ? 
                    <Button color="success" onClick={this.handleStart}> Start </Button>
                    : <Button color="danger" onClick={this.handleStop}> Stop </Button> }
                    <Button color="info" onClick={this.handleReset}> Reset </Button>
                    <Button color="info" onClick={this.handleCheckpoint}> Checkpoint </Button>
                </div>
                <div>
                    <GhostRacerComponent checkpoints={this.state.checkpoints} choreList={this.state.choreList} />
                </div>

                    
                

            </div>
            
        )
    }


}

export default GhostRacer