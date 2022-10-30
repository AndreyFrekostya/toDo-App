import React from 'react'
import MyInput from './MyInput'
import TodoList from './TodoList'
import NavBar from './NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
const MainTheme = () => {
  const [posts, setPosts]= useState([])
  const [filtered, setFiltered]=useState([])
  const [status, setStatus]=useState(false)
  const [count, setCount]=useState(0)
  const [hasTitle, sethasTitle]=useState(false)
  const getNormalMinutes=()=>{
    let minutes=new Date().getMinutes()
    if(minutes<10){
      minutes='0'+minutes
    }return minutes
    
  }
  const ifHasPosts=()=>{
    if(filtered.length!==0){
      return true
    }else{
      return false
    }
  }
  let IFposts=ifHasPosts()
  const createNewPost=(title)=>{
    if(title){
      let date= {hours: new Date().getHours(), minutes: getNormalMinutes()}
      let NumberDate=new Intl.DateTimeFormat().format(Date.now())
      let HoursDate=date.hours+':'+date.minutes
      const newPost={title:title,status: status,NumberDate:NumberDate, HoursDate:HoursDate, index: posts.length+1}
      setPosts([...posts, newPost])
      setFiltered([...posts, newPost])
      sethasTitle(false)
    }else{
      sethasTitle(true)
    }
  }
  const onTodoListChange = (inc) => {
    setCount(count + inc)
  }
  const filterPosts=(status)=>{
    let allPostsClone = JSON.parse(JSON.stringify(posts));
    if(status==='all'){
      setFiltered([...posts])
    }else{
      let newTodo=[...posts].filter(item=> item.status==status)
      setFiltered(newTodo)
    }
    if(status==='clear_complete'){
      const newList3=[...posts].filter(p=>p.status===false)
      setFiltered(newList3)
      setPosts(newList3)
      setCount(0)
    }
  }
  return (
    <>
      <div className="main_theme">
        <div className={hasTitle ? 'hasTitle' : 'dontHasTitle'}> 
          <FontAwesomeIcon  icon={faTriangleExclamation} /> 
          <h3>Введите задачу</h3>
        </div>
        <MyInput createNewPost={createNewPost}/>
        <h1 className={IFposts ?'no_posts' : 'yes_posts'}>Задач нет!</h1>
        {filtered.map((post)=>
          <TodoList allPosts={posts}  
          NumberDate={post.NumberDate}
          key={post.index} 
          title={post.title} 
          setPosts={setPosts}
          index={post.index}
          status={post.status}
          HoursDate={post.HoursDate} 
          onTodoListChange={onTodoListChange}/>)}
      </div>
      <NavBar HowChecked={count} filterPosts={filterPosts}/>
    </>
  )
}

export default MainTheme;