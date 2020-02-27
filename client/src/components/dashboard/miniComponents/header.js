import React from "react"
import { Icon, Flex, Box, Text, Input, InputGroup, InputRightElement, Button} from "@chakra-ui/core"
import { FaHome, FaPlus } from "react-icons/fa";
import {Link, withRouter} from "react-router-dom"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
    MenuItemOption,
  } from "@chakra-ui/core";

function Header(props){
    return(
        <>
            <Flex bg="#0067A3" mb={8}>
                <Box mr="3px" bg="#4D95BF" p="2px"><Link to="/"><FaHome size="30px" color="white" /></Link></Box>
                <Box mr="3px" bg="#4D95BF" p="2px" display="flex" alignItems="center">
                    <Link style={{color:"white"}} to={`/${props.user && props.user._id}/boards`}>Boards</Link>
                </Box>
                <Box mr="2px" bg="#4D95BF" p="2px">
                    <InputGroup>
                        <InputRightElement children={<Icon name="search" />} />
                        <Input width="200px" type="text" name="searchtext"/>
                    </InputGroup>
                </Box>
                <Box bg="#4D95BF" ml="65vw" p="2px" >
                    <Menu>
                        {({ isOpen }) => (
                            <React.Fragment>
                            <MenuButton isActive={isOpen} as={Button} rightIcon="chevron-down">
                                {isOpen ? "Close" : "Add"}
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={()=> console.log("it is just a placeholder")}>Add Board</MenuItem>
                                <MenuItem onClick={() => console.log("its just a placeholder ")}>Add Team</MenuItem>
                            </MenuList>
                            </React.Fragment>
                        )}
                        </Menu>
                    </Box>
                    {
                        props.user ?
                        <Box>
                            <Button ml={2} p={2} mt="2px" display="flex" alignItems="center" onClick={props.logout}>Logout</Button>
                        </Box>:null
                    }
            </Flex>
            
        </>
          )
}

export default withRouter(Header)