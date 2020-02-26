import {Input, ColorModeProvider, CSSReset, Flex, Box, Stack, InputLeftElement, Icon, InputGroup, Button, FormControl, Divider, FormHelperText} from '@chakra-ui/core'
import React from "react"
import axios from "axios"
import {withRouter} from "react-router-dom"



class CreatedCardForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:"",
            createdCard:null
        }
    }
    handleChange=(event)=>{
       
        let { name, value } = event.target
        this.setState({
            [name]:value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        // on creating without axios it shows login screen bug
        // axios('/home/')
        this.props.history.push('')
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
                                    <Input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter title" />
                                </InputGroup>
                            </FormControl>
                            <Button type="submit" variant="solid" variantColor="blue" boxShadow="sm" _hover={{boxshadow : "md"}} _active={{boxshadow : "lg"}}>Create Card</Button>
                            
                        </Stack>
                    </form>
                    
                </Flex>
            </ColorModeProvider>    
        )
    
    }
}

export default withRouter(CreatedCardForm)