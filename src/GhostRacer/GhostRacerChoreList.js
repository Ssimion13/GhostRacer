import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
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
    var mappedChoreList = this.props.choreList.map((x,i) => {
        return(
            <div key={x+i + 100}>
                <li> {x} </li>
            </div>
        )
    })
    return (
      <div>
        <Button color="danger" onClick={this.toggle} > List</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Chore List</ModalHeader>
          <ModalBody>
                <div>  
                    <ol>
                        {mappedChoreList}
                    </ol>
                </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;