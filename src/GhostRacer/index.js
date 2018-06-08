import React, {Component} from "react"
import {Button} from "reactstrap"
import GhostRacerChoreList from "./GhostRacerChoreList"
import GhostRacerComponent from "./GhostRacerComponent"
import { submitChore, handleReset, addSecond, clearCount, handleStop, handleCheckpoint, handleFinish, clearChores } from "../redux"
import { connect } from 'react-redux';

class GhostRacer extends Component {
    constructor(){
        super();
        this.state = {
            toggle: false,
            chore: ""
        }
        this.interval = null;
        this.handleStop = this.handleStop.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleCheckpoint = this.handleCheckpoint.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitChore = this.submitChore.bind(this);
        this.clearChores = this.clearChores.bind(this);
        this.addSecond = this.addSecond.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name] : [e.target.value]
        })
    }

    submitChore(e){
        this.props.submitChore(this.state.chore);
        this.setState({
            chore: "",
            toggle: true
        })
        setTimeout(() => {
            this.setState({
                toggle: false
            })
         }, 3000);
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
            if(this.props.checkpointCounter === this.props.choreList.length - 1){
                alert("You're done!")
                clearInterval(this.interval)
                this.handleFinish();
            }
   
    }

    handleFinish() {
        this.props.handleFinish();
    }

    clearChores() {
        this.props.clearChores();
    }



    render(){
        let placeholder = 0;
        if(this.props.seconds > 9){
            placeholder = null
        }
        return(
            <div>
                <form className="choreFormMain">
                    <div className="choreFormHolderDiv">
                        <div>
                            <input  className="choreInput" name="chore" placeholder="Chores to do" value={this.state.chore} onChange={this.handleChange} />
                        </div>
                        <div className="choreFormButtons">
                        
                            <Button onClick={this.submitChore}> Submit </Button>
                            <Button onClick={this.clearChores}> Clear </Button>
                            <GhostRacerChoreList choreList={this.props.choreList} />
                        </div>
                    </div>
                </form>
                <div className={this.state.toggle? 'emptyDivFadeIn':'emptyDivFadeOut'}>
                        <div className="currentChoreAnnouncement"> {this.props.currentChore} has been added to the chore list! </div>
                </div>
                <div>
                    <div className="timerDiv"> 
                    {Math.round(this.props.seconds / 60)} : {placeholder}{this.props.seconds % 60}
                    </div>
                </div>
                <div className="GhostRacerButtonsMainDiv" >
                    {this.props.toggleStart ? 
                        <div className="startButtonDivs">
                            <Button color="success" onClick={this.addSecond}> Start </Button>
                            <Button color="info" onClick={this.handleReset}> Reset </Button>
                        </div>
                    : <Button color="danger" onClick={this.handleStop}> Stop </Button> }
                    {!this.props.toggleStart ?
                    <Button color="info" onClick={this.handleReset}> Reset </Button> : null }
                    {!this.props.toggleStart && !this.props.finished ?
                    <Button color="info" onClick={this.handleCheckpoint}> Checkpoint </Button> : null }
                </div>
                <div>
                    {!this.props.toggleStart ?
                    <GhostRacerComponent finishTime={this.props.finishTime} checkpoints={this.props.checkpoints} choreList={this.props.choreList} />
                    : null }
                </div>

                    
                

            </div>
            
        )
    }


}

export default connect(state => state, { submitChore, handleReset, addSecond, clearCount, clearChores, handleStop, handleCheckpoint, handleFinish })(GhostRacer);