import { useState } from 'react';

import { Task } from '../Task';
import cliboardImg from './../../assets/clipboard.svg';

import styles from './styles.module.css';

interface Task {
  id: number;
  content: string;
  done: boolean;
}

interface TasksProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onSelect: (id: number) => void;
}

export function TasksList({ tasks, onDeleteTask, onSelect }: TasksProps) {
  const [tasksDone, setTasksDone] = useState(0);

  function handleSelect(id: number) {
    const taskSelected = tasks.find(task => task.id === id);
    const isDone = taskSelected?.done === true;

    if (isDone) {
      setTasksDone(prevState => prevState - 1);
    } else {
      setTasksDone(prevState => prevState + 1);
    }

    onSelect(id);
  }

  function handleDelete(id: number) {
    const taskSelected = tasks.find(task => task.id === id);
    const isDone = taskSelected?.done === true;

    if (isDone) {
      setTasksDone(prevState => prevState - 1);
    }

    onDeleteTask(id);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <p>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </p>
        <p>
          <strong>Concluídas</strong>
          <span>
            {tasks.length === 0 ? '0' : `${tasksDone} de ${tasks.length}`}
          </span>
        </p>
      </header>
      <ul className={tasks.length === 0 ? styles.emptyList : styles.list}>
        {tasks.length === 0 ? (
          <>
            <img src={cliboardImg} />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </>
        ) : (
          tasks?.map(item => {
            return (
              <Task
                key={item.id}
                id={item.id}
                content={item.content}
                done={item.done}
                onDeleteTask={handleDelete}
                onSelect={handleSelect}
              />
            );
          })
        )}
      </ul>
    </div>
  );
}
