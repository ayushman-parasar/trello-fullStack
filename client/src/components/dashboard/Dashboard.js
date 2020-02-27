import React from "react"
import { render } from "@testing-library/react"
import Header from "./miniComponents/header"
import { Link } from "react-router-dom"
import { Box, Heading, Icon, Flex, Divider, IconButton, Image, Text } from "@chakra-ui/core"
import axios from "axios"


class DashBoard extends React.Component {
    constructor() {
        super();
        this.state = {
            boards: []
        }
    }

    componentDidMount(){
        axios("/home",{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.token || ""
            }
        }).then(res => {
            this.setState({
                boards:res.data.boards.boardsCreated
            })
            
        })
        
    }

    render() {
        return(
            <div>
                <Flex>
                    <Box className="aside-container" width={200} ml={200}>
                        <Box className="aside-btn"  width={190} bg="transparent" m={2} p={1} >
                            <Flex align="center">
                                <Icon name="info"/>
                                <Heading as="h6" ml={2} fontSize="10px"><Link to={`/${this.props.user && this.props.user_id}/boards`}>Boards</Link></Heading>
                            </Flex>
                        </Box>
                        {/* ----Testing --- */}
                        
                        <Box className="aside-btn" width={190} bg="transparent" m={2} p={1}>
                            <Flex align="center">
                                <Icon name="info" />
                                <Heading as="h6" ml={2} fontSize="10px"><Link to="/">Home</Link></Heading>
                            </Flex>
                        </Box>
                        <Divider width="200px"/>
                        <Flex justify="space-between" align="center">
                            <Heading as="h6" fontSize="16px" ml={2}>Teams</Heading>
                            <IconButton aria-label="add button" icon="add" bg="transparent" p={0}/>
                        </Flex>
                        
                    </Box>
                    <Box className="hero-section" w="350px" borderWidth="1px" boxShadow="sm" rounded="sm" ml={20} mr={20}>
                        <Image   width="100%" src="https://a.trellocdn.com/prgb/dist/images/home/orientation/no-content.e25c676458c1f4cb280b.svg" />
                        <Box bg="white"  h={120} width="100%">
                            <Heading fontSize="13px" p={2} textAlign="center"  >Stay on track and up to date</Heading>
                            <Text fontSize="11px" textAlign="center" lineHeight="1.6" p={2} >Invite people to boards and cards, leave comments, add due dates, and we'll show the most important activity here.</Text>
                        </Box>
                    </Box>
                    <Box className="board-list">
                        <Box>
                            <Text>--------</Text>
                                {
                                    this.state.boards.map(board => {
                                        return (
                                            <Flex key={board._id}>
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

export default DashBoard

