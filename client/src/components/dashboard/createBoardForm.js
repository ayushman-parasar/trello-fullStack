import {Input, ColorModeProvider, CSSReset, Flex, Box, Stack, InputLeftElement, Icon, InputGroup, Button, FormControl, Divider, FormHelperText} from '@chakra-ui/core'
import React from "react"
import axios from "axios"
import {withRouter} from "react-router-dom"



class CreatedBoardForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:"",
            description:"",
            createdBoard:null
        }
    }
    handleChange=(event)=>{
       
        let { name, value } = event.target
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        axios(`/home/board/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.token || ""
            },
            data:{ title: this.state.title, description:this.state.description }
        }).then(res => {
            this.setState({
                createdBoard:res.data.createdBoard
            })
            this.props.history.push("/");
        })
            
        // console.log(this.props.user._id)
        
    }
    render(){
        return(
            <ColorModeProvider>
                <CSSReset />
                <Flex justify="center" align="center">
                    <form action="submit" onSubmit={this.handleSubmit}>
                        <Stack spacing={4} width={400}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="info" />} />
                                    <Input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter Your title" />
                                </InputGroup>
                            </FormControl>
                            
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="password" />} />
                                    <Input type="text" name="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter Your description" />
                                </InputGroup>
                            </FormControl>
                            <Button type="submit" variant="solid" variantColor="blue" boxShadow="sm" _hover={{boxshadow : "md"}} _active={{boxshadow : "lg"}}>Create Board</Button>
                            
                        </Stack>
                    </form>
                    
                </Flex>
            </ColorModeProvider>    
        )
    
    }
}

export default withRouter(CreatedBoardForm)