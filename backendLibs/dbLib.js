import fs from 'fs'

export function readDB() {
    const str = fs.readFileSync("db/todolist.json", {encoding: "utf-8"})
    const todolist = JSON.parse(str)
    return todolist
}

export function writeDB(todolist){
    const str = JSON.stringify(todolist)
    fs.writeFileSync("db/todolist.json", str, {encoding: "utf-8"})
}