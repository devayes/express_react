import React from "react";
import { Route } from "react-router-dom";
import { Grid, Row, Col } from 'react-bootstrap';
import Header from './Components/UI/Header';
import Home from './Components/Home';
import Items from './Components/Items';
import About from './Components/About';

const App = () => (
    <div>
      <Header/>
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/display/:itemId" component={Items} />
          </Col>
          </Row>
      </Grid>
    </div>
  
);

export default App;