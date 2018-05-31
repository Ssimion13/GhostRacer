import React from "react";

function GhostRacerComponent(props) {
    var checkpointsMap = props.checkpoints.map((x, i) => {
        return (
        <div key={x+i}> 
        {props.choreList[i]} {x} 
        </div>
        )
    })

    return(
        <div className="CheckpointsMainDiv">
            {checkpointsMap}
        </div>
    )
}

export default GhostRacerComponent