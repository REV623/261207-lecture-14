import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState("")

  const callGetTodo = async () => {
    const resp = await axios.get("http://localhost:3000/api/todo")
    setTodos(resp.data.todolist)
  }

  useEffect(() => {
    callGetTodo()
  },[])

  const callPostTodo = async () => {
    const resp = await axios.post("/api/todo", {title: todoInput, completed: false})
    if(resp.data.ok === true) await callGetTodo()
  }

  const callDeleteTodo = async (id) => {
    const resp = await axios.delete(`/api/todo/${id}`)
    if(resp.data.ok === true) await callGetTodo()
  }

  const callPutTodo = async (id,i) => {
    const resp = await axios.put(`/api/todo/${id}`, todos[i].completed === true ? {completed: false} : {completed: true})
    if(resp.data.ok === true) await callGetTodo()
  }

  return (
    <div>
      <input 
        onChange={(e) => setTodoInput(e.target.value)}
        value={todoInput}
        onKeyUp={(e) => {
          if(e.key === "Enter"){
            callPostTodo()
            setTodoInput("")
          }
        }}
        ></input>
      <ul>
        {todos.map((x,i) => (<li key={x.id} style={{textDecoration: x.completed ? "line-through" : "none"}}>
          {x.title}
          <button onClick={() => callPutTodo(x.id,i)}>Checkmark</button>
          <button onClick={() => callDeleteTodo(x.id)}>Delete</button>
        </li>))}
      </ul>
    </div>
  )
}
