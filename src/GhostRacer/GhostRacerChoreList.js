import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';




class GhostRacerChoreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    console.log(this.props.choreList);
        var mappedChoreList = this.props.choreList.map((x,i) => {
        return(
                <li key={x+ i + 100}> {x}  </li>
        )
    })
    return (
      <div>
        <Button color="danger" onClick={this.toggle} > List</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Chore List</ModalHeader>
          <ModalBody>
                <div>  
                      {this.props.choreList.length > 0 ?
                        <ol> {mappedChoreList}  </ol>
                        : "No Chores Here! Add some chores with the input box!" }
                </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}> Got it! </Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default GhostRacerChoreList