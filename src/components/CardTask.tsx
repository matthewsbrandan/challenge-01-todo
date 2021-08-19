import { FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router';
import '../styles/cardtask.scss';

interface CardTaskProps{
  cardTask: {
    title: string;
    slug: string;
    checkedTasks: number;
    countTasks: number;
  },
  handleRemoveCardTask: (slug: string) => void;
}

export function CardTask({
  cardTask,
  handleRemoveCardTask
} : CardTaskProps) {
  const history = useHistory();

  function handleRedirectToTasks(){
    history.push(`/${cardTask.slug}`);
  }
  return (
    <section className="card-task container" id={cardTask.slug}>
      <header>
        <h2 onClick={handleRedirectToTasks}>{cardTask.title}</h2>
      </header>
      <main>
        <p>
          {cardTask.countTasks == 0 ? 0: `${cardTask.checkedTasks}/${cardTask.countTasks}`} tasks
        </p>
        <button
          type="button"
          data-testid="remove-task-button"
          onClick={() => handleRemoveCardTask(cardTask.slug)}
        >
          <FiTrash size={20}/>
        </button>
      </main>
    </section>
  )
}