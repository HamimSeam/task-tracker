import "./TaskList.css";
import { useState } from "react";
import ReactDom from "react-dom";

function Task({ task }) {
  const { title, course, dueDate, description } = task;

  return (
    <div className="task">
      <h3>{title}</h3>
      <ul>
        <li>Course: {course}</li>
        <li>Due Date: {dueDate}</li>
        <li>Description: {description}</li>
      </ul>
    </div>
  );
}

function TaskModal({ addTask, mode, onClose }) {
  if (mode === "close") return null;

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;

    const title = form["title"].value;
    const course = form["course"].value;
    const dueDate = form["due-date"].value;
    const description = form["description"].value;
    const id = Date.now();

    const taskInfo = {
      title,
      course,
      dueDate,
      description,
      id,
    };

    console.log(taskInfo);
    addTask(taskInfo);
  }

  return (
    <>
      <dialog className="task-modal" open>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Task Title: </label>
          <input type="text" id="title" name="title" required />
          <br />

          <label htmlFor="course">Course: </label>
          <input type="text" id="course" name="course" />
          <br />

          <label htmlFor="due-date">Due Date: </label>
          <input type="date" id="due-date" name="due-date" />
          <br />

          <label htmlFor="description">Description: </label>
          <input type="text" id="description" name="description" />
          <br />

          <button type="submit">Add Task</button>
        </form>
        <button type="button" onClick={onClose}>
          Close Modal
        </button>
      </dialog>
    </>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [modalMode, setModalMode] = useState("close");

  return (
    <>
      <button type="button" onClick={() => setModalMode("open")}>
        +
      </button>

      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      {
        <TaskModal
          addTask={(newTask) => {
            setTasks([...tasks, newTask]);
            setModalMode("close");
          }}
          mode={modalMode}
          onClose={() => setModalMode("close")}
        ></TaskModal>
      }
    </>
  );
}

export default TaskList;
