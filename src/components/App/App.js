import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../navbar/navbar';
import { Segment, Header, Icon } from 'semantic-ui-react';
import List from '../list/list';
import Details from '../details/details';
import Favourites from '../favourites/favourites';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch >
        <Route path="/"
          render={() => {
            return <List />
          }}
          exact />

        <Route path='/movie/:id'
          render={({ match }) => {
            const { id } = match.params;
            return <Details id={id} />
          }} />

        <Route path='/Favourites'
               component={Favourites}
        />
        <Route render={() => <h2>Page not found</h2>} />
      </Switch>
        <Segment attached='bottom' inverted padded='very' size='big' textAlign='center'>
          <Header as='h2'>Developed by <a href='https://www.instagram.com/sultan_sembek/' target="_blank">Sphinx</a></Header><Icon name='code'></Icon>
        </Segment>
    </Router>
  )
}



export default App;
