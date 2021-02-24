import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
    title: string
}

export function AddItemForm(props: AddItemFormType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}
    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {setError("Title is required");}
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {setError(null);
        if (e.charCode === 13) {addItem()}
    }
    return (
        <div>
            <TextField
                helperText={error? 'title is requed': ""}
                error={!!error}
               variant={"filled"}
                label={props.title}
                value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <IconButton onClick={addItem}><AddBox /></IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>


    )
};

export default AddItemForm;