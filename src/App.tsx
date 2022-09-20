import { useState } from 'react';

import { Header } from './components/Header';
import { TasksList } from './components/TasksList';

import styles from './App.module.css';
import './global.css';

interface Task {
  id: number;
  content: string;
  done: boolean;
}

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [countId, setCountId] = useState(0);

  function handleSubmit() {
    const newTask = {
      id: countId + 1,
      content: task,
      done: false
    };

    setCountId(prevState => prevState + 1);
    setTasks(prevState => [...prevState, newTask]);
    setTask('');
  }

  function handleDelete(id: number) {
    const newTasks = tasks.filter(task => task.id !== id);

    setTasks(newTasks);
  }

  function handleSelect(id: number) {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return { ...task };
    });

    setTasks(newTasks);
  }

  return (
    <div className={styles.wrapper}>
      <Header setTask={setTask} task={task} onSubmit={handleSubmit} />

      <main>
        <TasksList
          tasks={tasks}
          onDeleteTask={handleDelete}
          onSelect={handleSelect}
        />
      </main>
    </div>
  );
}

export default App;
