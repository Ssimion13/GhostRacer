import React from "react";
import { Jumbotron, Button } from 'reactstrap';
import {Link} from "react-router-dom"

function FrontPage () {
    return (
        <div>
            <div>
                <Jumbotron>
                    <h1 className="display-3">Ghost Racer</h1>
                    <p className="lead">Ghost Racer allows you to race against yourself every day in whatever things you want to get done ASAP!</p>
                    <hr className="my-2" />
                    <p>From waking up in the morning to getting chores done, race against yourself!</p>
                    <p className="lead">
                    <Link to="/GhostRacer">
                    <Button color="primary">
                    Get Racing!
                    </Button>
                    </Link>
                    </p>
                </Jumbotron>
            </div>
        </div>
    )
}

export default FrontPage;