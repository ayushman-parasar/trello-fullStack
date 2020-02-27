import React from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom"
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
import CreateListForm from './components/dashboard/CreateListForm';
import CreateCardForm from './components/dashboard/CreateCardForm';

class App extends React.Component {
  constructor(){
    super()
    this.state={
      currentUser: null,
      boards:[]
    }
  }

  componentDidMount() {
    console.log("local",localStorage)
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
      // console.log(res)
      
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
  privateRoutes = () => {
    return (
      <>
        { console.log("checking privateRoute")}
        
        <Route path="/" exact >
          <DashBoard logout={this.logOutUser} user={this.state.currentUser && this.state.currentUser}/>
        </Route>
        <Route path="/dashboard/b/create">
            <CreatedBoardForm user={this.state.currentUser && this.state.currentUser}/> 
        </Route>
        <Route path="/:userId/boards" exact>
          <ShowBoard user={this.state.currentUser && this.state.currentUser} boards={this.state.boards}/>
        </Route>
        <Route path="/:userId/:boardId/view" exact>
          <BoardDetail />
        </Route>

        <Route path="/:userId/:boardId/list" exact>
          <CreateListForm />
        </Route>
        
        <Route exact path="/:userId/:boardId/:listId/card"  >
          <CreateCardForm />
        </Route>

        

      </>
    )
  }
  publicRoutes = () => {
    return (
      <>
        <Route path="/" component={LandingPage} exact/>
        <Route path="/users/login">
          <Login setUser={this.setUser}/>
        </Route>
        <Route path="/users/register" component={Register} />
        <Route>
          { console.log("checking")}
          <Redirect to="/users/login" />
        </Route>
      </>
    )
  }

  
  render(){
    return (
      <Router>
        {
          localStorage.token ? <Header /> : (
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
        <Switch>
          {
            localStorage.token  ? this.privateRoutes() : this.publicRoutes()
            
          }
        </Switch>
  
        
  
      </Router>
      )
  }
}

export default App;
