import React,{useState} from 'react';
import './ToDoList.css';

function ToDoList() {
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState('');
  const [completedTasks,setCompletedTasks]=useState([]);
  const addTask = () => {
    if(newTask.trim()!=='')
    {
      setTasks([...tasks,{text: newTask, completed: false}]);
      setNewTask('');
    }
  };
  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index,1);
    setTasks(updatedTasks);
  };
  const toggleTaskCompletion = (index) => {
    const updatedTasks=[...tasks];
    updatedTasks[index].completed= !updatedTasks[index].completed;
    if(updatedTasks[index].completed){
        setCompletedTasks([...completedTasks,updatedTasks[index]]);
        updatedTasks.splice(index,1);
      }
    setTasks(updatedTasks);
  };
  const clearCompletedTasks = () => {
    setCompletedTasks([]);
  };

  return (
    <div className='todo-list-container'>
      <h1 className='todo-list-header'>TO DO LIST</h1>
      <div>
        <input
        type="text"
        placeholder="Add a new Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="todo-list-button" onClick={addTask}>Add</button>
      </div>
      <ul className='todo-list'>
        {tasks.map((task,index)=>(
            <li key={index}>
                <input
                type="checkbox"
                checked={task.completed}
                onChange={()=> toggleTaskCompletion(index)}
                />
                <span
                style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                }}
                >
                {task.text}
                    </span>
                    <button onClick={()=> deleteTask(index)}>Delete</button>
            </li>
        ))}
      </ul>
      {completedTasks.length > 0 && (
        <>
        <h2 className='completed-tasks-header'>Completed Tasks</h2>
      <ul className='completed-tasks-list'>
        {completedTasks.map((task,index)=>(
            <li key={index}>
                <span style={{ textDecoration: 'linethrough'}}>{task.text}</span>
            </li>
        ))}
      </ul>
      <button
      className='clear-completed-button'
      onClick={clearCompletedTasks}
      >
        Clear Completed
      </button>
        </>
      )}
    </div>
  );
}

export default ToDoList;
