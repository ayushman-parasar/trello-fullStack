import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Box, Button, Flex } from "@chakra-ui/core"
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
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
            // console.log("hrio",res)
            this.setState({
                currentBoard:res.data.board
            })
        )
    }
    
    render(){
        return(
            <Box >
                {/* {this.state.currentBoard?(<h2>Something Exist</h2>):<h1>checking</h1>} */}
                {/* {this.state.currentBoard._id} */}
                {
                    this.state.currentBoard ? this.state.currentBoard.lists.map(list=>{
                        return(<Box key={list._id}>
                                <Flex direction="row">
                                    <Editable defaultValue={`${list.title}`}>
                                        <EditablePreview />
                                        <EditableInput />
                                    </Editable>
                                </Flex>
                        </Box>)
                    }

                    ):null
                } 
                <Box>
                    <Link to={`/${this.props.match.params.userId}/${this.props.match.params.boardId}/list`}>Create List</Link>
                </Box>
                
            </Box>
        )
        
    }

} 
export default withRouter(BoardDetail)