import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from './components/TaskCard';
import AddTask from './components/AddTask';

function App() {
  const [tasks, setTasks] = useState([]);

  // 1. Fetch tasks from Backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://digital-task-board.onrender.com/api/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // 2. Add new task to state
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // 3. Remove task from state
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  // 4. Update task in state (Move columns)
  const handleUpdateTask = (updatedTask) => {
    const newTasks = tasks.map(t => t._id === updatedTask._id ? updatedTask : t);
    setTasks(newTasks);
  };

  // 5. Filter tasks by status
  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // List of columns to render
  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'doing', title: 'Doing' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fafbfc', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#172b4d' }}>My Digital Task Board</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <AddTask onTaskAdded={handleTaskAdded} />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {columns.map((col) => {
          const filteredTasks = getTasksByStatus(col.id);
          return (
            <div key={col.id} style={{ 
              background: '#ebedf0', 
              padding: '15px', 
              borderRadius: '10px', 
              width: '300px',
              minHeight: '400px'
            }}>
              <h2 style={{ fontSize: '16px', color: '#5e6c84', textAlign: 'center', textTransform: 'uppercase' }}>
                {col.title} ({filteredTasks.length})
              </h2>
              
              {filteredTasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task} 
                  onUpdate={handleUpdateTask} 
                  onDelete={handleDeleteTask} 
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;