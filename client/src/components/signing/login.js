import {Input, ThemeProvider, ColorModeProvider, CSSReset, Flex, Box, Stack, InputLeftElement, Icon, InputGroup, Button, FormControl, Divider, FormHelperText, MenuItemOption} from '@chakra-ui/core'
import React from "react"
import axios from "axios";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    
    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios("/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {email: this.state.email, password: this.state.password}
        }).then(res => {
            this.props.setUser(res.data.profile);
            localStorage.setItem("token", res.data.token);
            this.props.history.push(`/dashboard/b`)
        })
    }

    render() {
        return(
            <ColorModeProvider>
                <CSSReset />
                <Flex justify="center" align="center">
                    <form action="submit" onSubmit={this.handleSubmit}>
                        <Stack spacing={4} width={400}>
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="info" />} />
                                    <Input type="email" name="email" placeholder="Enter Your Email" value={this.state.email} onChange={this.handleChange} />
                                </InputGroup>
                            </FormControl>
                            
                            <FormControl isRequired>
                                <InputGroup>
                                    <InputLeftElement children={<Icon name="password" />} />
                                    <Input type="password" name="password" placeholder="Enter Your Password" value={this.state.password} onChange={this.handleChange} />
                                </InputGroup>
                            </FormControl>
                            <Button type="submit" variant="solid" variantColor="blue" boxShadow="sm" _hover={{boxshadow : "md"}} _active={{boxshadow : "lg"}}>Login</Button>
                            
                        </Stack>
                    </form>
                </Flex>
                
                
            </ColorModeProvider>    
        )
    }

}

export default withRouter(Login);