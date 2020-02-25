import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Box, Button } from "@chakra-ui/core"
import axios from "axios"

class BoardDetail extends React.Component{
    constructor(){
        super()
        this.state={
            currentBoard:null,
            cards:[],
            lists:[]
        }
    }
    componentDidMount(){
        axios(`/home/board/${this.props.match.params.boardId}/view`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.token || ""
            }
        }).then(res=> 
            this.setState({
                currentBoard:res.data.board
            })
        )
    }
    
    addList=()=>{
        console.log("hello wd")
    }
    render(){
        return(
            <Box>
                {/* {this.state.currentBoard?(<h2>Something Exist</h2>):<h1>checking</h1>} */}
                {/* {this.state.currentBoard._id} */}
                <Button onClick={this.addList}>AddList</Button>
                
            </Box>
        )
        
    }

} 
export default withRouter(BoardDetail)