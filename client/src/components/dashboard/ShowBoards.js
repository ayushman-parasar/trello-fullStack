import React from "react"
import { render } from "@testing-library/react"
import Header from "./miniComponents/header"
import { Link } from "react-router-dom"
import { Box, Heading, Icon, Flex, Divider, IconButton, Image, Text } from "@chakra-ui/core"
import axios from "axios"


class ShowBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            colors:["yellow.500", "red.500", "blue.300", "skyblue", "green.800"]
        }
    }

    // componentDidMount(){
    //     // <h1>Hello world</h1>
        
    // }

    render() {
        return(
            <div>
                <Flex>
                    <Box className="aside-container" width={200} ml={200}>
                        <Box className="aside-btn"  width={190} bg="transparent" m={2} p={1} >
                            <Flex align="center">
                                <Icon name="info"/>
                                <Heading as="h6" ml={2} fontSize="10px"><Link to={`/${this.props.user._id}/boards`}>Boards</Link></Heading>
                            </Flex>
                        </Box>
                        {/* ----Testing --- */}
                        <Box className="aside-btn" width={190} bg="transparent" m={2} p={1}>
                            <Flex align="center">
                                <Icon name="info" />
                                <Heading as="h6" ml={2} fontSize="10px"><Link to="/dashboard/b">Home</Link></Heading>
                            </Flex>
                        </Box>
                        <Divider width="200px"/>
                        <Flex justify="space-between" align="center">
                            <Heading as="h6" fontSize="16px" ml={2}>Teams</Heading>
                            <IconButton aria-label="add button" icon="add" bg="transparent" p={0}/>
                        </Flex>
                        
                    </Box>
                    <Box>
                        <Box m={10}>
                            
                            {this.props.boards.map((board)=>{
                                return(
                                    <Flex >
                                        <Box key={board._id} width={100} height={70} border="1px solid" bg={this.state.colors[Math.floor(Math.random() * Math.floor(4))]} >
                                            <Link to={`/${this.props.user._id}/${board._id}/view`}>
                                                {board.title}
                                            </Link>
                                        </Box>
                                    </Flex> 
                                )
                            })}
                            
                        </Box>
                        {/* <Box>
                            <Flex>

                            </Flex>
                        </Box>
                        <Box>
                            <Flex>

                            </Flex>
                        </Box> */}
                    </Box>
                    <Box className="board-list">
                        <Box>
                            <Text>--------</Text>
                                {
                                    this.state.boards.map(board => {
                                        return (
                                            <Flex>
                                                <Box mr={2} className="small-board-box" w={8} h={8}  borderWidth="1px" borderColor="blue"></Box>
                                                <h3>{board.title}</h3>
                                            </Flex>
                                        )
                                    })
                                }
                            <Text>--------</Text>
                        </Box>
                        <Text>LINKS</Text>
                        <Link to="/dashboard/b/create" d="flex" alignItems="center" className="create-board-btn" rounded="md" width="15rem">
                            <IconButton aria-label="add button" icon="add" size="sm" p={0} color="grey.400"/>
                            <Text ml={2}>Create a Board</Text>
                        </Link>
                        
                    </Box>
                </Flex>
                <button onClick={this.props.logout}>LogOut</button>
            </div>
        )
    }
}

export default ShowBoard

