import { useState } from "react";
import { useRef } from "react";
import "./Task.css";

export function TaskPreview({ task, course }) {
  const modalRef = useRef(null);

  function toggleShowTask() {
    if (modalRef.current.hasAttribute("open")) modalRef.current.close();
    else modalRef.current.showModal();
  }

  return (
    <>
      <div className="task-preview" onClick={toggleShowTask}>
        <h3>{task.name}</h3>
      </div>
      {
        <Task
          modalRef={modalRef}
          onClose={toggleShowTask}
          task={task}
          course={course}
        />
      }
    </>
  );
}

export function Task({ modalRef, onClose, task, course }) {
  return (
    <dialog className="task" ref={modalRef}>
      <button onClick={onClose}>Close Button</button>
      <form>
        <input
          className="task-name"
          type="text"
          name="name"
          placeholder="Enter a task title..."
        ></input>
        <div className="course-due-date">
          <span>{course.name} • Due: </span>
          <input className="task-due-date" type="date" name="due-date"></input>
        </div>
        <textarea
          className="task-description"
          type="text"
          name="description"
          placeholder="Enter a description..."
        ></textarea>
      </form>
    </dialog>
  );
}

export function TaskModal({ addTask, onClose }) {
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

    addTask(taskInfo);
  }

  return (
    <>
      <dialog className="task-modal">
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
