import React from 'react'

const NavBar = (props) => {
  const todoFilter=(status)=>{
    props.filterPosts(status)
  }
  return (
    <div className='nav_bar'>
        <h3><span>{props.HowChecked}</span> items left</h3>
        <div className='buttons'>
            <button onClick={()=>todoFilter('all')} >All</button>
            <button onClick={()=>todoFilter(false)}>Active</button>
            <button onClick={()=>todoFilter(true)}>Completed</button>
        </div>
        <h3 onClick={()=>todoFilter('clear_complete')}>Clear completed</h3>
    </div>
  )
}

export default NavBar