import React from 'react';
import { Link } from "react-router-dom";
import EditItemModal from './Modals/EditItemModal';
import AddItemModal from './Modals/AddItemModal';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export default class Home extends React.Component 
{
  state = {
    items: []
  }

  // Load items on mount.
  componentDidMount = () => {
    axios.get(`http://localhost:3001/content`)
      .then(response => {
        const items = response.data;
        this.setState({ items });
      });
  }

  // Reload after changes.
  onInputChanged = (e) => {
    window.location.reload();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Example Express/React App</title>
        </Helmet>
        <AddItemModal onInputChanged={this.onInputChanged}/>
        <h1>Example Items</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            { this.state.items.map(item => 
              <tr key={item.content_id}>
                <td><Link to={`/display/${item.content_id}`}>{item.title}</Link></td>
                <td>{item.description}</td>
                <td><EditItemModal item={item} onInputChanged={this.onInputChanged}/></td>
              </tr>
            )}{ this.state.items.length === 0 ? <tr><td colSpan="3"><p className="text-center">No items found</p></td></tr> : null }
          </tbody>
        </Table>
      </div>
    )
  }
}