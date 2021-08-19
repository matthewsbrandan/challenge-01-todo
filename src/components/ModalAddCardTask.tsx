import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router';

Modal.setAppElement('#root');

interface CardTask{
  title: string;
  slug: string;
  checkedTasks: number;
  countTasks: number;
}
interface ModalAddCardTask{
  isOpen: boolean;
  cardTasks: CardTask[];
  setCardTasks: (cardTasks: CardTask[]) => void;
  openModal: () => void;
  closeModal: () => void;
}
export function ModalAddCardTask({
  isOpen,
  cardTasks,
  setCardTasks,
  openModal,
  closeModal
}:ModalAddCardTask){
  const [cardTaskName, setCardTaskName] = useState('');
  const history = useHistory();

  function handleNewCardTask(event: FormEvent) {
    event.preventDefault();
    
    if(cardTaskName.length == 0) return;

    const slug = handleFormatteSlugfunction();
    const index = cardTasks.findIndex(task => task.slug == slug);
    
    if(index != -1) {
      alert('Este nome já está sendo utilizado existe');
      return;
    }
    
    const data = [...cardTasks, {
      title: cardTaskName,
      slug: slug,
      checkedTasks: 0,
      countTasks: 0
    }];

    setCardTasks(data);
    localStorage.setItem('@to.do:cardTasks',JSON.stringify(data));

    closeModal();
    history.push(`/${slug}`)
  }

  function handleFormatteSlugfunction(){
    return cardTaskName.toLowerCase().trim()
      .replace(/\s+/g,           '-')
      .replace(/[áàäâã]/g,       'a')
      .replace(/[éèëê]/g,        'e')
      .replace(/[íìîï]/g,        'i')
      .replace(/[óòöôõ]/g,       'o')
      .replace(/[úùüû]/g,        'u')
      .replace(/ñ/g,             'n')
      .replace(/ç/g,             'c')
      .replace(/[^\a-z0-9\-]+/g, '' )
      .replace(/\-\-+/g,         '-');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <h2>Nova TaskList</h2>
      <form onSubmit={handleNewCardTask}>
        <input
          type="text"
          placeholder="Nome da TaskList..."
          value={cardTaskName}
          onChange={event => setCardTaskName(event.target.value)}
          required
        />
        <div className="button-group">
          <button type="button" onClick={closeModal}>Cancelar</button>
          <button type="submit">Criar</button>
        </div>
      </form>
    </Modal>
  );
}