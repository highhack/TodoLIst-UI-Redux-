import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-FILTER'
    value: FilterValuesType
    id: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodoListFilterActionType | ChangeTodoListTitleActionType



export  const todoListReducer = (state: Array<TodolistType>, action:ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST":{
            const newTodoListID = v1()
            const newTodoList: TodolistType = {
                id: newTodoListID, title: action.title, filter: 'all'
            }
            return [newTodoList, ...state]
        }
        case "REMOVE-TODOLIST":{
            return state.filter(tl => tl.id !== action.id);
        }
        case "CHANGE-FILTER":{
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.value;
                return [...state]
            }
            return state}
            // state.map(tl => {
            //     if(tl.id === action.id){
            //         return  {...tl,filter: action.value}
            //         } else {
            //             return tl
            //         }
            //     }
            // )}

        case "CHANGE-TODOLIST-TITLE": {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state];

            }

        }
        default:
            return state            // если пришло что то что не относиться к нашим акшинам то возвращает стейт
    }
}