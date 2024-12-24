import "./TaskList.css";
import { useState } from "react";
import ReactDom from "react-dom";

function Task({ task }) {
  const { title, course, dueDate, description, label } = task;

  return (
    <div className="task">
      <h3>{title}</h3>
      <ul>
        <li>Course: {course}</li>
        <li>Due Date: {dueDate}</li>
        <li>Description: {description}</li>
        <li>Label: {label}</li>
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
    const label = form["label"].value;
    const id = Date.now();

    const taskInfo = {
      title,
      course,
      dueDate,
      description,
      label,
      id,
    };

    console.log(taskInfo);
    addTask(taskInfo);
  }

  return ReactDom.createPortal(
    <>
      <div className="task-modal-overlay" />
      <div className="task-modal">
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

          <label htmlFor="label">Label: </label>
          <input type="text" id="label" name="label" />
          <br />

          <button type="submit">Add Task</button>
        </form>
        <button type="button" onClick={onClose}>
          Close Modal
        </button>
      </div>
    </>,
    document.getElementById("task-modal")
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

      {tasks.map((task, index) => (
        <Task key={index} task={task} />
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
