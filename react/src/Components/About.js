import React from 'react';
import { Helmet } from 'react-helmet';

export default class About extends React.Component 
{
  render() {
    let desc = 'This is an example app using an Express API and React front end';
    return (
      <div>
      	<Helmet>
          <title>About - Example Express/React App</title>
          <meta name="description" content={desc} />
        </Helmet>
        <h1>About</h1>
        <p>{desc}</p>
      </div>
    );
  }
}