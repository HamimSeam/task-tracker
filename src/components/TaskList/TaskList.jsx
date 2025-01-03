import "./TaskList.css";
import { useState, useRef } from "react";

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

function TaskModal({ modalRef, addTask, onClose }) {
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
      <dialog ref={modalRef} className="task-modal">
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

function TaskList({ category, taskFunctions }) {
  const { addTask, getTask, editTask, removeTask } = taskFunctions;
  const modalRef = useRef(null);

  function toggleTaskModal() {
    if (!modalRef.current) return;
    modalRef.current.hasAttribute("open")
      ? modalRef.current.close()
      : modalRef.current.showModal();
  }

  return (
    <div className="task-list">
      <button type="button" onClick={toggleTaskModal}>
        +
      </button>

      {Object.entries(category.tasks).map(([taskId, task]) => (
        <Task key={taskId} task={task} />
      ))}
      {
        <TaskModal
          modalRef={modalRef}
          addTask={(task) => addTask(task)}
          onClose={toggleTaskModal}
        ></TaskModal>
      }
    </div>
  );
}

export default TaskList;
