import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent } from 'react';
import todoLogo from './../../assets/logo.svg';

import styles from './styles.module.css';

interface HeaderProps {
  onSubmit: () => void;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  task: string;
}

export function Header({ onSubmit, setTask, task }: HeaderProps) {
  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    onSubmit();
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  const isTextEmpty = task.length === 0;

  return (
    <div className={styles.header}>
      <img src={todoLogo} alt="Logo" />

      <form onSubmit={handleAddNewTask} className={styles.addWrapper}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          value={task}
          onChange={handleNewTaskChange}
        />
        <button type="submit" disabled={isTextEmpty}>
          Criar
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>
    </div>
  );
}
