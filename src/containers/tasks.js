import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';

const Tasks = ({user}) => {

    const [ tasks, setTasks ] = useState([]);
    const [ task, setTask ] = useState({ title: '', description: '', owner: user.id });
    const [ isEditing, setIsEditing ] = useState(false);
    const [ idTaskEdit, setIdTaskEdit ] = useState('');

    const inputTitle = useRef();
    const inputDescription = useRef();

    useEffect(() => {
        getTasks();
    }, []);

    const getTask = id => {
        let [taskEdit] = tasks.filter((e => e._id === id));
        setIsEditing(true);
        inputTitle.current.value = taskEdit.title;
        inputDescription.current.value = taskEdit.description;
        setTask({title: taskEdit.title, description: taskEdit.description});
        setIdTaskEdit(id);
    }

    const getTasks = () => {
        Axios.get('http://localhost:5000/api/tasks')
            .then(tasks => {
                let filter = tasks.data.filter((e, i) => {
                    return e.owner == user.id
                })
                setTasks(filter)
            }).catch(err => console.log(err));
    }

    const createTask = e => {
        e.preventDefault();
        Axios.post('http://localhost:5000/api/tasks/create', task, { withCredentials: true })
            .then(() => {
                cleanInputs();
                getTasks();
            }).catch(err => console.log(err));
    }

    const deleteTask = id => {
        Axios.post(`http://localhost:5000/api/tasks/delete/${id}`, {}, { withCredentials: true })
            .then(() => {
                getTasks();
            }).catch(err => console.log(err));
    }

    const editTask = (e, id) => {
        e.preventDefault();
        Axios.post(`http://localhost:5000/api/tasks/edit/${id}`, task, { withCredentials: true })
            .then(() => {
                cleanInputs();
                getTasks();
                setIsEditing(false);
            }).catch(err => console.log(err));
    }

    const cleanInputs = () => {
        inputTitle.current.value = '';
        inputDescription.current.value = '';
    }

    return(
        <section className="container horizontal">
            <h2>My ToDo list</h2>
            <div className="container">
                <div className="list">
                    <ul>
                        {tasks.length === 0 ? <p className='noList'>No hay tareas</p> : tasks.map((task, i) => {
                            return (
                                <li key={i}>
                                    <div className="task">
                                        <p className="task-title">{task.title}</p>
                                        <p className="task-description">{task.description}</p>
                                    </div>
                                    <div className="actions">
                                        <button onClick={() => getTask(task._id)} className='task-edit'>Edit</button>
                                        <button onClick={() => deleteTask(task._id)} className='task-delete'>Delete</button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="formulario">
                    <form onSubmit={!isEditing ? e => createTask(e) : e => editTask(e, idTaskEdit)}>
                        <div>
                            <label>Title</label>
                            <input
                                name='title'
                                onChange={e => {
                                    setTask({...task, [e.target.name]: e.target.value});
                                }}
                                type="text"
                                ref={inputTitle}
                                defaultValue={isEditing ? task.title : ''}
                                placeholder='Title' />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                name='description'
                                onChange={e => {
                                    setTask({...task, [e.target.name]: e.target.value});
                                }}
                                type="text"
                                ref={inputDescription}
                                defaultValue={isEditing ? task.description : ''}
                                placeholder='Description' />
                        </div>
                        <input type="submit" value={!isEditing ? "Create task" : "Edit task"}/>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Tasks;