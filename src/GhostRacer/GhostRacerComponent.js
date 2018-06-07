import React from "react";

function GhostRacerComponent(props) {
    var checkpointsMap = props.checkpoints.map((x, i) => {
        let minutes = "";
        let seconds = "";
        if(x > 60){
        minutes = (x / 60) + ":";
        }
        seconds = x % 60;
        return (
        <div className="checkpoint" key={x+i}> 
        {props.choreList[i]} Finished at {minutes} {seconds} 
        </div>
        )
    })

    return(
        <div className="checkpointsMainDiv">
            {checkpointsMap}
        </div>
    )
}

export default GhostRacerComponent