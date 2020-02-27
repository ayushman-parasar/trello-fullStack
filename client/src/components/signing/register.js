import {Input, ThemeProvider, ColorModeProvider, CSSReset, Flex, Box, Stack, InputLeftElement, Icon, InputGroup, Button, FormControl, Divider, FormHelperText} from '@chakra-ui/core'
import React from "react"
import NavbarSp from "../navbars/specialNav"
import axios from "axios"
import { withRouter } from "react-router-dom";


class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:null,
            password:null,
        }
    }
    handleSubmit =(event) =>{
        event.preventDefault()
        axios('/users/register',{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
        },
          data:{ email: this.state.email, password:this.state.password}
        }).then(this.props.history.push('/users/login'))
    }
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    render(){
        return(
            <ColorModeProvider>
                <CSSReset />
                {/* <NavbarSp /> */}
                <Flex justify="center" align="center">
                    
                    <form mt={4} action="submit" onSubmit={this.handleSubmit}>
                        <Stack spacing={4} width={400}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="info" />} />
                                    <Input type="name" placeholder="Enter Your Name" />
                                </InputGroup>
                            </FormControl>
                            <Divider />
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="email" />} />
                                    <Input name="email" type="email"  placeholder="Enter Your Email" onChange={this.handleChange}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="password" />} />
                                    <Input name="password" type="password" placeholder="Enter Your Password" onChange={this.handleChange}/>
                                </InputGroup>
                            </FormControl>
                            {/* <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="info" />} />
                                    <Input type="name" placeholder="Enter Your Name" />
                                </InputGroup>
                            </FormControl> */}
                            
                            <Button type="submit" variant="solid" variantColor="blue" boxShadow="sm" _hover={{boxshadow : "md"}} _active={{boxshadow : "lg"}}>Register</Button>
                            <FormHelperText>
                                Your email is safe with us
                                <br />
                            </FormHelperText>
                        </Stack>
                    </form>
                </Flex>
                
                
            </ColorModeProvider>
        )
    }
}

export default withRouter(Register)
