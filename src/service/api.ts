import TodoItem from "./store"

export const getTodos = async ():Promise<TodoItem[]> =>{
    return await fetch("http://localhost:3000/todo").then(res => res.json())
}