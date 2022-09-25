import { readDB, writeDB } from "../../backendLibs/dbLib"
import { v4 as uuidv4 } from "uuid"

export default function todoRoute(req, res) {
    if(req.method === "GET"){
        const todolist = readDB()
        return res.json({ok: true, todolist})
    }else if(req.method === "POST"){
        const todolist = readDB()
        const newTodo = {
            id: uuidv4(),
            title: req.body.title,
            completed: req.body.completed,
        }
        todolist.push(newTodo)
        writeDB(todolist)
        return res.json({ok: true})
    }
}
