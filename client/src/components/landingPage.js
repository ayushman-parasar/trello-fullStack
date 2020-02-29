import React from "react"
import Login from "./signing/login"
import { Button, Heading, Text, Box, Image, Flex, Input, FormControl, Icon } from "@chakra-ui/core"
import axios from "axios"

class LandingPage extends React.Component{
    constructor(){
        super()
        this.state={
            email:""
        }
    }
    handleChange =(event) =>{
        // let {name, value} = event.target
        this.setState({
            // [name]:value
            email:event.target.email    
        })
    }
    handleSubmit =(event)=>{
        event.preventDefault()
        axios("/",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res =>
            console.log(res))
        
    }
    
    
    render(){
        return(
            <>
           <Box Width="54rem" background="rgb(12,119,192)" padding={4}>
               <Flex align='center' justify="center">
                    <Box size="sm" className="aside" color="white" >
                            <Heading as="h1" mb={6}> 
                            Trello lets you work more collaboratively and get more done.
                            </Heading>
                            <Text fontSize="xl" >Trello’s boards, lists, and cards enable you to organize and prioritize your projects in a fun, flexible, and rewarding way.</Text>
                            <form action="submit email">
                                <form onSubmit={this.handleSubmit}>
                                    <Flex className="flexify">
                                        <FormControl>
                                            <Input mt={12} name=""email placeholder="Enter your email" color="black" onChange={this.handleChange}/>
                                        </FormControl>
                                        <Button mt={12} ml={2} size="3lg" borderColor="red" variant="solid" variantColor="green" padding="4px" type="submit">Sign Up-It's Free</Button>
                                    </Flex>
                                </form>
                            </form>
                    </Box>
                    <section>
                            <Box size="sm">
                                <Image src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" alt="image"/>
                            </Box>
                    </section>
               </Flex>
           </Box>
            <Box Width="54rem" background="white" padding={4}>
            <Flex align='center' justify="center">
                 <Box size="sm" className="aside">
                         <Heading as="h5" size="lg"> 
                         Work with any Team
                         </Heading>
                         <Text fontSize="md" >Whether it’s for work, a side project or even the next family vacation, Trello helps your team stay organized.</Text>
                         <Button className="special-btn" mt={4} variant="solid" variantColor="rgb(109,142,162)">Start Doing <Icon name="arrow-forward" /></Button>
                 </Box>
                 <section>
                         <Box size="sm" >
                             <Image src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/308998dcb3ed5ab3d01217a4d24ffa03/hero-a.svg" alt="image"/>
                         </Box>
                 </section>
            </Flex>
        </Box>
        </>
        )
    }
}

export default LandingPage