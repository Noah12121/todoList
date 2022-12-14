import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, deleteTodo } from './API'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  let todos2: ITodo[]=[]
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(( todos  : ITodo[] | any) => {
      todos2=[todos.data[0]];
      console.log(todos.data)
      console.log(todos2)})
    .catch((err: Error) => console.log(err))
  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
   e.preventDefault()
   addTodo(formData)
   .then(({ status, data }) => {
    console.log(status);
  if(status === 200) {
    console.log(data);
    setTodos(todos)
  }
  })
  .catch((err) => console.log(err))
}

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          console.log('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='App'>
      <h1>Noah Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos2.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App
