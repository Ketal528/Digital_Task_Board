import React, {useState} from "react";
import axios from "axios";

const AddTask = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!title) return;

        try{
            const responce = await axios.post('https://digital-task-board.onrender.com/api/tasks', {title});
            onTaskAdded(responce.data);
            setTitle('');
        }catch (err) {
            console.error("Error adding task:", err);
        }
    };

    return(
        <form onSubmit={handleSubmit} style={{marginBottom: '20px'}} >
            <input 
                type="text" 
                placeholder="Enter new task..." 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '8px', width: '250px'}} 
            />

            <button type="submit" style={{ padding: '8px 15px', margin: '10px', cursor: 'pointer'}}>Add Task</button>
        </form>
    );
};
export default AddTask;