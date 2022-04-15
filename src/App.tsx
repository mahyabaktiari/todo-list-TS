import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import TodoTask from "./components/todoTask";
import { ITask } from "./interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name == "task") {
      setTask(e.target.value);
    } else {
      setDeadline(Number(e.target.value));
    }
  };

  const addTask = (): void => {
    let newTask: ITask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDeadline(0);
  };

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName != taskNameToDelete));
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            value={task}
            name="task"
            placeholder="Task..."
            onChange={handleChange}
          />
          <input
            type="number"
            value={deadline}
            name="deadline"
            placeholder="Deadline(in Days)..."
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}> Add Task </button>
      </header>
      <div>
        {todoList.map((task: ITask, index: number) => (
          <TodoTask key={index} task={task} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default App;
