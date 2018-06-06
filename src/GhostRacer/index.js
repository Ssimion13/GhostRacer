import React, {Component} from "react"
import {Button} from "reactstrap"
import GhostRacerChoreList from "./GhostRacerChoreList"
import GhostRacerComponent from "./GhostRacerComponent"
import { handleReset, addSecond, clearCount, handleStop, handleCheckpoint, handleFinish } from "../redux"
import { connect } from 'react-redux';

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
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCheckpoint = this.handleCheckpoint.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearChores = this.clearChores.bind(this);
        this.addSecond = this.addSecond.bind(this);
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


    addSecond() {
        this.interval = setInterval(()=> {this.props.addSecond()}, 1000);
    }

    handleStop() {
        this.props.handleStop();
        clearInterval(this.interval);
    }

    handleReset() {
        clearInterval(this.interval);
        this.props.handleReset();
    }

    handleCheckpoint() {
        this.props.handleCheckpoint();
        ()=> {
            if(this.state.checkpointCounter === this.state.choreList.length){
                alert("You're done!")
                clearInterval(this.interval)
                this.handleFinish();
            }
   
        }
    }

    handleFinish() {
        this.setState({
            toggleStart: true,
            finishTime: this.state.seconds,
            finished: true,
            checkpointCounter: 0
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
                    {Math.round(this.props.seconds / 60)} : {this.props.seconds % 60}
                    </div>
                </div>
                <div className="GhostRacerButtonsMainDiv" >
                    {this.props.toggleStart ? 
                    <Button color="success" onClick={this.addSecond}> Start </Button>
                    : <Button color="danger" onClick={this.handleStop}> Stop </Button> }
                    {!this.props.toggleStart ?
                    <Button color="info" onClick={this.handleReset}> Reset </Button> : null }
                    {!this.props.toggleStart ?
                    <Button color="info" onClick={this.handleCheckpoint}> Checkpoint </Button> : null }
                </div>
                <div>
                    <GhostRacerComponent checkpoints={this.props.checkpoints} choreList={this.props.choreList} />
                </div>

                    
                

            </div>
            
        )
    }


}

export default connect(state => state, { handleReset, addSecond, clearCount, handleStop, handleCheckpoint, handleFinish })(GhostRacer);