import { useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import '../styles/tasklist.scss';

import { FiTrash, FiCheckSquare } from 'react-icons/fi';
import { useEffect } from 'react';
import { useParams } from 'react-router';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}
interface CardTask{
  title: string;
  slug: string;
  checkedTasks: number;
  countTasks: number;
}
interface CurrentCardTask extends CardTask {
  index: number;
}

interface TaskListParams{
  slug: string;
}
export function TaskList() {
  // BEGIN:: HANDLE CARDTASKS
  const { slug } = useParams<TaskListParams>();
  const [cardTasks, setCardTasks] = useState<CardTask[]>(() => {
    const storagedCardTasks = localStorage.getItem('@to.do:cardTasks');
    if (storagedCardTasks) return JSON.parse(storagedCardTasks);
    return [];
  });
  const [currentCardTask, setCurrentCardTask] = useState<CurrentCardTask>();
// END:: HANDLE CARDTASKS
  const [tasks, setTasks] = useState<Task[]>(() => {
    if(!slug) return;
    const data = localStorage.getItem(`@to.do:tasks:${slug}`);
    if(data) return JSON.parse(data);
    return [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const index = cardTasks.findIndex(task => task.slug === slug);
    if(index == -1) return;

    setCurrentCardTask({
      ...cardTasks[index],
      index,
    });
  },[cardTasks]);
  useEffect(() => {
    localStorage.setItem(`@to.do:tasks:${slug}`,JSON.stringify(tasks));
    handleRefreshCardTasks();
  },[tasks]);

  function handleRefreshCardTasks() {
    if(!currentCardTask) return;
    let temp = cardTasks;
    temp[currentCardTask.index].checkedTasks = tasks.filter(task => task.isComplete).length ?? 0;
    temp[currentCardTask.index].countTasks = tasks.length ?? 0;
    setCardTasks(temp);
    localStorage.setItem(`@to.do:cardTasks`,JSON.stringify(temp));
  }
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

      toast.success('Task adicionado!');
    }
    else toast.error("Digite o nome da task");
  }

  function handleToggleTaskCompletion(id: number) {
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1) {
      let temp = tasks;
      temp[index].isComplete = !temp[index].isComplete;
      setTasks([...temp]);
    }
    else toast.error("Task inv??lida");
  }

  function handleRemoveTask(id: number) {
    let index = tasks.findIndex(task => task.id === id);
    if(index !== -1) {
      let temp = tasks;
      temp.splice(index, 1);
      setTasks([...temp]);
      toast.success("Task exclu??da");
    }
    else toast.error("Task inv??lida");
  }

  return (
    <section className="task-list container">
      <header>
        <h2>{currentCardTask ? currentCardTask.title :"Minhas tasks"}</h2>
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
      <Toaster/>
    </section>
  )
}