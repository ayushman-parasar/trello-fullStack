import React from "react"
import { Editable, EditableInput, EditablePreview, Box } from "@chakra-ui/core";
import Card from "./Card"
import { Droppable } from "react-beautiful-dnd"



class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            lists:this.props.list
        }
    }
    render(){
        return(
            <Droppable id={this.props.list._id}>
                {(provided)=>{
                    return(<div ref={provided.innerRef} { ...provided.droppableProps } >
                        <Editable width="150px" defaultValue={`${this.props.list.title}`}  fontWeight={2} p={4}>
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                        {
                            this.props.list.cardId ? (this.props.list.cardId.map((card, index) =>{
                                return(
                                    <Card card={card}  index={index}/>
                                    )
                            })):null
                        }
                        <Box fontSize="12px" >
                            <a href={`/${this.props.userId}/${this.props.boardId}/${this.props.list._id}/card`}>Create Card</a>
                        </Box>
                    </div>)
                }}
            </Droppable>
        )
    }
}

export default List