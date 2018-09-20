import React from 'react';
import { Alert } from 'react-bootstrap';
import FlashMassage from 'react-flash-message';

export default class Flash extends React.Component 
{
  constructor(props, context) 
  {
    super(props, context);

    this.handleClose = this.handleClose.bind(this);
    const queryString = require('query-string');
    const qs = queryString.parse(window.location.search);

    this.state = {
      show: true,
      qs: qs
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  }


  render() {
    if (this.state.show) {
      if (typeof this.state.qs.added !== 'undefined') {
        return (<FlashMassage show={this.state.show} duration={4500} persistOnHover={true}><Alert bsStyle="success" onClick={this.handleClose}><p>Item added.</p></Alert></FlashMassage>)
      } else if(typeof this.state.qs.updated !== 'undefined') {
        return (<FlashMassage show={this.state.show} duration={4500} persistOnHover={true}><Alert bsStyle="success" onClick={this.handleClose}><p>Item updated.</p></Alert></FlashMassage>)
      } else if(typeof this.state.qs.deleted !== 'undefined') {
        return (<FlashMassage show={this.state.show} duration={4500} persistOnHover={true}><Alert bsStyle="warning" onClick={this.handleClose}><p>Item removed.</p></Alert></FlashMassage>)
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
}