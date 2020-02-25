import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import Home from "./components/home/home"
import Login from "./components/signing/login"
import Register from "./components/signing/register"
import { ThemeProvider, Flex, List, ListItem } from "@chakra-ui/core"

import './App.css';
import LandingPage from './components/landingPage';
import DashBoard from './components/dashboard/Dashboard';

import Header from "./components/dashboard/miniComponents/header";
import axios from "axios";
import CreatedBoardForm from './components/dashboard/createBoardForm';
import ShowBoard from './components/dashboard/ShowBoards';
import BoardDetail from './components/dashboard/BoardDetail';

class App extends React.Component {
  constructor(){
    super()
    this.state={
      currentUser: null,
      boards:[]
    }
  }

  componentDidMount() {
    axios("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": localStorage.token || ""
      }
    }).then(res => {
      this.setState({
        currentUser: res.data.user
      });
    }).then(axios("/home",{
      method:"GET",
      headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.token || ""
      }
  }).then(res => {
      this.setState({
          boards:res.data.boards.boardsCreated
      })
      console.log(res);
  }))
  }

  setUser = (user) => {
    this.setState({
      currentUser: user
    });
  }

  logOutUser = () => {
    this.setState({
      currentUser: null
    })
    localStorage.clear();
  }

  publicRoutes = () => {
    return (
      <Switch>
        <Route path="/" component={LandingPage} exact/>
        <Route path="/users/login">
          <Login setUser={this.setUser}/>
        </Route>
        <Route path="/users/register" component={Register} />
        <Route>
          <Redirect to="/users/login" />
        </Route>
      </Switch>
    )
  }

  privateRoutes = () => {
    return (
      <Switch>
        <Route path="/dashboard/b" exact >
          <DashBoard logout={this.logOutUser} user={this.state.currentUser}/>
        </Route>
        <Route path="/dashboard/b/create">
            <CreatedBoardForm user={this.state.currentUser}/> 
        </Route>
        <Route path="/:userId/boards" exact>
          <ShowBoard user={this.state.currentUser} boards={this.state.boards}/>
        </Route>
        
        <Route path="/:userId/:boardId/view" exact>
          <BoardDetail />
        </Route>

        <Route path="/:userId/:boardId/card" exact>
          {/* <ShowBoard user={this.state.currentUser} boards={this.state.boards}/> */}
        </Route>
        <Route>
          <Redirect to="/dashboard/b" />
        </Route>
      </Switch>
    )
  }
  render(){
    return (
      <Router>
        {
          localStorage.token && this.state.currentUser ? <Header /> : (
            <div  className="header-primary">
              <nav>
                <List>
                  <Flex>
                  <ListItem m={4}><Link to ="/users/login">LogIn</Link></ListItem>
                  <ListItem m={4}><Link to ="/users/register">Register</Link></ListItem>
                  <ListItem m={4}><Link to ="/">Home</Link></ListItem>
                  </Flex>
                </List>
              </nav>
            </div>
          )
        }
  
        {
          localStorage.token && this.state.currentUser ? this.privateRoutes() : this.publicRoutes()
        }
  
      </Router>
      )
  }
}

export default App;
