import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { CardTask } from './components/CardTask';
import { FiPlus } from 'react-icons/fi';

import './styles/home.scss'
import { ModalAddCardTask } from "./components/ModalAddCardTask";

interface CardTask{
  title: string;
  slug: string;
  checkedTasks: number;
  countTasks: number;
}

export function Home() {
  const [isOpenModalAddCardTask, setIsOpenModalAddCardTask] = useState(false);
  const [cardTasks, setCardTasks] = useState<CardTask[]>(() => {
    const storagedCardTasks = localStorage.getItem('@to.do:cardTasks');

    if (storagedCardTasks) return JSON.parse(storagedCardTasks);
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@to.do:cardTasks', JSON.stringify(cardTasks));
  }, [cardTasks]);

  function openModal() {
    setIsOpenModalAddCardTask(true);
  }

  function closeModal() {
    setIsOpenModalAddCardTask(false);
  }

  function handleRemoveCardTask(slug: string){
    if(window.confirm('Tem certeza que deseja excluir essa lista de Tarefas?')){
      setCardTasks([...cardTasks.filter(card => card.slug !== slug)]);
    }
  }

  return (
    <>
      <Header />
      <div className="container-card-tasks">
        <button className="btn-new-task" onClick={openModal}>
          <FiPlus size={36}/>
        </button>
        {cardTasks?.map(cardTask => { return (
          <CardTask 
            cardTask={cardTask}
            key={cardTask.slug}
            handleRemoveCardTask={handleRemoveCardTask}
          />
        );})}
      </div>
      <ModalAddCardTask
        isOpen={isOpenModalAddCardTask}
        cardTasks={cardTasks}
        setCardTasks={setCardTasks}
        openModal={openModal}
        closeModal={closeModal}
      />
    </>
  )
}