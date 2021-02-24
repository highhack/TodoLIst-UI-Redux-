import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import EditTableSpan from "./EditTableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodolistTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> <EditTableSpan title={props.title} changeItem={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} title={'title...'}/>
        {/*теперь здесь функция addItem начинает работать как  addTask*/}


        <ul style={{listStyle: 'none', paddingLeft: '0'}}>
            {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id)}

                    const changeTitle = (title: string) => {props.changeTaskTitle(t.id,title, props.id)}

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox color={"secondary"} onChange={onChangeHandler} checked={t.isDone}/>
                        <EditTableSpan title={t.title} changeItem={changeTitle}/>
                        <IconButton  size={"small"} aria-label="delete" onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={"contained"} color={props.filter === 'all' ? "secondary" : "primary"} size={"small"}
                    style={{margin:'5px'}}
                //className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={"contained"} color={props.filter === 'active' ? "secondary" : "primary"}  size={"small"}
                    style={{margin:'5px'}}
               // className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={"contained"} color={props.filter === 'completed' ? "secondary" : "primary"}
                    size={"small"} style={{margin:'5px'}}
               // className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}


