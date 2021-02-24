import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";
type EditTableSpanType ={
    title: string
    changeItem: (title: string) => void
}
export const EditTableSpan = (props: EditTableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    function onEditMode () {
        setEditMode(true)
    }function offEditMode () {
        setEditMode(false)
        props.changeItem(title)
    }
    function  changeTitle (e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
        // отдать родителю новое название

    }
    return (
             editMode
            ? <TextField
                 variant={"standard"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                 onChange={changeTitle}/>
            : <span onDoubleClick={onEditMode}> {props.title}</span>

    );
};

export default EditTableSpan;