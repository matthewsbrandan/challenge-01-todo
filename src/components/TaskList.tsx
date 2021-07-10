import { useState } from 'react';

// import toast, { Toaster } from 'react-hot-toast'; --TOASTS

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle.trim().length > 0){
      let newId = Math.random();

      while(tasks.findIndex(task => task.id === newId) !== -1){
        newId = Math.random();
      }

      setTasks(oldTask => [...oldTask, {
        id: newId,
        title: newTaskTitle,
        isComplete: false
      }]);

      setNewTaskTitle('');

      // toast.success('Task adicionado!'); --TOASTS
    }
    // else toast.error("Digite o nome da task"); --TOASTS
  }

  function handleToggleTaskCompletion(id: number) {
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1) {
      let temp = tasks;
      temp[index].isComplete = !temp[index].isComplete;
      setTasks([...temp]);
    }
    // else toast.error("Task inválida"); --TOASTS
  }

  function handleRemoveTask(id: number) {
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1) {
      let temp = tasks;
      temp.splice(index, 1);
      setTasks([...temp]);
      // toast.success("Task excluída"); --TOASTS
    }
    // else toast.error("Task inválida"); --TOASTS
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
      {/* <Toaster/> --TOASTS */}
    </section>
  )
}