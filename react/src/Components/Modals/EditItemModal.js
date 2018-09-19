import React from 'react';
import { ControlLabel, FormControl, FormGroup, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export default class EditItemModal extends React.Component 
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
      item: this.props.item,
      content_id: this.props.item.content_id,
      title: this.props.item.title,
      description: this.props.item.description,
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
      [name]: value, 
      item: {...state.item, [name]: value}
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {content_id, title, description} = this.state;
    // Copy object for update.
    // let item = Object.assign({}, this.state.item);
    // item.title = form.title;
    // item.description = form.description;
    // console.log('Item:', item)
    axios.put(`http://localhost:3001/content/update/${content_id}`, { title: title, description: description })
      .then(res => {
        this.setState((state, props) => ({
          show: false,
          item: {...state.item, title: title, description: description}
        }));
      })
    // Refresh or whatever.
    this.props.onInputChanged();
  }

  handleDelete = (e) => {
    e.preventDefault();
    const {content_id} = this.state;
    axios.delete(`http://localhost:3001/content/delete/${content_id}`)
      .then(res => {
        this.setState((state, props) => ({
          show: false,
          item: {}
        }));
      })
    // Refresh or whatever.
    this.props.onInputChanged();
  }

  render() {
    return (
      <div>
        <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
          Edit
        </Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Example Item</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.handleSubmit}>
            <Modal.Body>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Title</ControlLabel>
                  <FormControl
                    name="title"
                    type="text"
                    required="required"
                    value={this.state.item.title}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Description</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    name="description"
                    value={this.state.item.description}
                    onChange={this.handleChange}
                  />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <div className="pull-left">
                <a className="text-danger" onClick={this.handleDelete}>Delete</a>
              </div>
              <Button onClick={this.handleClose}>Close</Button>
              <Button type="submit" bsStyle="primary">Update Item</Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}