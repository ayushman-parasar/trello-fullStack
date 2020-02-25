import {Input, ThemeProvider, ColorModeProvider, CSSReset, Flex, Box, Stack, InputLeftElement, Icon, InputGroup, Button, FormControl, Divider, FormHelperText} from '@chakra-ui/core'
import React from "react"
import NavbarSp from "../navbars/specialNav"


function Register({h1, form}){
    return(
        <ColorModeProvider>
            <CSSReset />
            {/* <NavbarSp /> */}
            <Flex justify="center" align="center">
                
                <form mt={4} action="submit">
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
                                <Input type="email" placeholder="Enter Your Email" />
                            </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                            <InputGroup>
                                <InputLeftElement children={<Icon name="password" />} />
                                <Input type="password" placeholder="Enter Your Password" />
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

export default Register
