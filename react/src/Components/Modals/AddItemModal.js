import React from 'react';
import { ControlLabel, FormControl, FormGroup, Modal, Button, Clearfix } from 'react-bootstrap';
import axios from 'axios';

export default class AddItemModal extends React.Component 
{
  constructor(props, context) 
  {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      show: false,
      title: '',
      description: '',
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state, props) => ({
      [name]: value
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {title, description} = this.state;
    axios.post(`http://localhost:3001/content/create`, { title: title, description: description })
      .then(res => {
        this.setState((state, props) => ({
          show: false,
        }));
      })
    this.props.onInputChanged('/?added');
  }

  render() {
    return (
      <div>
          <Button className="pull-right" bsStyle="success" bsSize="small" onClick={this.handleShow}>
            Add Item
          </Button>
        <Clearfix/>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Example Item</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    name="title"
                    type="text"
                    required="required"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
              <Button type="submit" bsStyle="primary">Add item</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}