import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Box, Button, Flex, Text } from "@chakra-ui/core"
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import { DragDropContext } from "react-beautiful-dnd"
import axios from "axios"
import List from "./List"

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
                currentBoard:res.data.board,
               
                
            })
        )
    }
    onDragEnd =(result) =>{
        //to : reorder list

    }



    render(){
        return(
            <div>
            
                <Box >
                    <Box bg="skyblue" width={120} rounded="lg" p={2} m={2} textAlign="center" >
                        <Link to={`/${this.props.match.params.userId}/${this.props.match.params.boardId}/list`}>Create List</Link>
                    </Box>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                    <Flex direction="row">
                        {
                            this.state.currentBoard ? this.state.currentBoard.lists.map(list=>{
                                return(
                                <Box borderWidth="1px" rounded="lg" mr={4} height={300} textAlign="center" borderColor="black" key={list._id}>
                                    <Flex direction="row">
                                        <List list={list} userId={this.props.match.params.userId} boardId={this.props.match.params.boardId} />
                                    </Flex>
                                </Box>)
                            }
                            ):null
                        } 
                    </Flex>
                    </DragDropContext>
                </Box>
            
            </div>
        )
    }
} 
export default withRouter(BoardDetail)