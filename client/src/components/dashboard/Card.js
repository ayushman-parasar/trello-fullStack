import React from "react"
import { Editable, EditableInput, EditablePreview, Box, Text } from "@chakra-ui/core";
import { Draggable } from "react-beautiful-dnd"

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            card: this.props.card
        }
    }
    render(){
        return(
            <Draggable id={this.props.card._id} index={this.props.index}>
                {(provided)=>(
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {`${this.props.card.title}`}
                </div>
                )}
                
            </Draggable>
            
        )

    }
}


export default Card