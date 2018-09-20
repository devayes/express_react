import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default class Items extends React.Component 
{
  constructor(props, context) 
  {
    super(props, context);
    const { itemId } = props.match.params
    this.state = {
      content_id: itemId,
      item: {}
    };
  }

  // Load item on mount.
  componentDidMount(){
    axios.get(`http://localhost:3001/content/display/${this.state.content_id}`)
      .then(response => {
        const item = response.data;
        this.setState({ item });
      });
  }

  render() {
    return (
        <div>
          <Helmet>
            <title>{`${this.state.item.title}`} - Example Express/React App</title>
            <meta name="description" content={this.state.item.description} />
          </Helmet>
          <h1>{this.state.item.title}</h1>
          <p>{this.state.item.description}</p>
        </div>
    );
  }
}