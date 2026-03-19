import React from 'react';
import axios from 'axios';

// IMPORTANT: You must put { task, onDelete } inside curly braces
const TaskCard = ({ task,onUpdate, onDelete }) => {
  
  const handleDelete = async () => {
    try {
      // This calls your backend to delete from MongoDB
      const confirmed = window.confirm(`Are you sure you want to delete this " ${task.title} "task?`);
      if (confirmed) {
        try {
          await axios.delete(`https://digital-task-board.onrender.com/api/tasks/${task._id}`);
          onDelete(task._id); 
        } catch (err) {
          console.error("Delete failed:", err);
          alert("Something went wrong. The task was not deleted.");
        }
      } else {
        console.log("Delete canceled by user.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const moveTask = async (newStatus) => {
    try {
      const response = await axios.patch(`https://digital-task-board.onrender.com/api/tasks/${task._id}`, {
        status: newStatus
      });
      // Tell App.jsx to update the list on the screen
      onUpdate(response.data); 
    } catch (err) {
      console.error("Move failed:", err);
    }
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s'
  };

  const buttonStyle = {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    transition: 'background 0.3s'
  };

  return (
    <div style={{...cardStyle}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} 
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      {/*   show button if we are in to-do */}
      {task.status === 'todo' && (
        <button onClick={() => moveTask('doing')} style={{...buttonStyle, backgroundColor: '#007bff', color: 'white', margin: '1px'}}>Start</button>
      )}
      {/*   show button if we are in doing */}
      {task.status === 'doing' && (
        <button onClick={() => moveTask('done')} style={{...buttonStyle, backgroundColor: '#28a745', color: 'white', margin: '1px'}}>Finish</button>
      )}
      {/*   show buttoon back if we are in doing or done colume */}
      {task.status !== 'todo' && (
        <button onClick={() => moveTask('todo')} style={{...buttonStyle, backgroundColor: '#6c757d', color: 'white', margin: '1px'}}>Back</button>
      )}

      <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: 'transparent', color: 'dc3545',fontSize: '16px', cursor: 'pointer', margin: '1px' }}>
        Delete
      </button>
    </div>
  );
};

export default TaskCard;