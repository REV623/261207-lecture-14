import { readDB, writeDB } from "../../../backendLibs/dbLib";


export default function todoIdRoute(req, res) {
    if(req.method === "DELETE"){
        const todolist = readDB()
        const id = req.query.id
        const todoIdx = todolist.findIndex((x) => x.id === id)
        if(todoIdx === -1) return res.status(404).json({ok: false, message: "Todo not found"})
        todolist.splice(todoIdx, 1)
        writeDB(todolist)
        return res.json({ok: true})
    }else if(req.method === "PUT"){
        const todolist = readDB()
        const id = req.query.id
        const todoIdx = todolist.findIndex((x) => (x.id === id))
        if(todoIdx === -1) return res.status(404).json({ok: false, message: "Todo not found"})
        todolist[todoIdx].completed = req.body.completed
        writeDB(todolist)
        return res.json({ok: true, todo: todolist[todoIdx]})
    }
}
