import React from "react"
import { Link, withRouter } from "react-router-dom"
import { Box, Button, Flex, Text } from "@chakra-ui/core"
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
                currentBoard:res.data.board,
               
                
            })
        )
    }
    
    render(){
        return(
            <Box >
                
                <Box bg="skyblue" width={120} rounded="lg" p={2} m={2} textAlign="center" >
                    <Link to={`/${this.props.match.params.userId}/${this.props.match.params.boardId}/list`}>Create List</Link>
                </Box>
                <Flex direction="row">
                    {
                        this.state.currentBoard ? this.state.currentBoard.lists.map(list=>{
                            return(<Box borderWidth="1px" rounded="lg" mr={4} height={300} textAlign="center" borderColor="black" key={list._id}>
                                    <Flex direction="row">
                                        <Box width="100%" >
                                            <Editable width="150px" defaultValue={`${list.title}`}>
                                                <EditablePreview />
                                                <EditableInput />
                                            </Editable>
                                            {
                                                list.cardId ? (list.cardId.map(card =>{
                                                    return(
                                                        <Editable width="130px" defaultValue={`${card.title}`}>
                                                            <EditablePreview />
                                                            <EditableInput />
                                                        </Editable>
                                                        )
                                                })):null
                                            }
                                            <Box fontSize="12px" >
                                                <a href={`/${this.props.match.params.userId}/${this.props.match.params.boardId}/${list._id}/card`}>Create Card</a>
                                            </Box>
                                        </Box>
                                    </Flex>
                            </Box>)
                        }

                        ):null
                    } 
                </Flex>
                
                
            </Box>
        )
        
    }

} 
export default withRouter(BoardDetail)