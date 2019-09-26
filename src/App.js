import React, { Component, Fragment } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import Login from './containers/login';
import Signup from './containers/signup';
import Tasks from './containers/tasks';
import Nomatch from './containers/404';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  state = {
	  tasks: []
  }


  getUser(username) {
    this.setState({username, isLogged: true})
  }

  logout() {
    axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
		.then(user => {
			this.setState({isLogged: false});
		}).catch(err => {
			console.log(err)
		});
  }
  

  render() {

    return(
      <Fragment>

        {!this.state.isLogged ?
			<nav>
				<NavLink activeClassName="selected" to='/signup'>Signup</NavLink>
				<NavLink activeClassName="selected" to='/login'>Login</NavLink>
			</nav> :
			<nav className='auth'>
				<p>Hola {this.state.username.username}</p>
				<div>
					<NavLink activeClassName="selected" to='/tasks'>Tasks</NavLink>
					<NavLink activeClassName="selected" onClick={this.logout} to='/logout'>Logout</NavLink>
				</div>
			</nav>
        }
      
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/signup' />} />
          <Route path='/login' render={() => <Login getUser={this.getUser} />} />
          <Route path='/signup' render={() => !this.state.isLogged ? <Signup /> : <Redirect to='/tasks' />} />
          <Route path='/tasks' render={() => this.state.isLogged ? <Tasks user={this.state.username} /> : <Redirect to='/login' />} />
          <Route path='/logout' render={() => <Redirect to='/login' />} />
          <Route component={Nomatch} />
        </Switch>

      </Fragment>
    )
  }
}

export default App;
