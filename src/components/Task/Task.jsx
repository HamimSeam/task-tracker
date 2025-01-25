import React, { useState } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import "./Task.css";

export function TaskPreview({ task, course, editTask }) {
  const modalRef = useRef(null);

  function toggleShowTask() {
    const body = document.querySelector("body");

    if (modalRef.current.open) {
      body.style.overflow = "auto";
      modalRef.current.close();
    } else {
      body.style.overflow = "hidden";
      modalRef.current.showModal();
    }
  }

  return (
    <>
      <div className="task-preview" onClick={toggleShowTask}>
        <h4>{task.name}</h4>
      </div>
      {createPortal(
        <Task
          modalRef={modalRef}
          toggleShowTask={toggleShowTask}
          task={task}
          course={course}
          editTask={editTask}
        />,
        document.getElementById("modals")
      )}
    </>
  );
}

export function Task({ modalRef, toggleShowTask, task, course, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedTask, setModifiedTask] = useState(task);

  function toggleEditTask() {
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  }

  function handleChange(event) {
    const field = event.target.name;

    setModifiedTask((prevModifiedTask) => ({
      ...prevModifiedTask,
      [field]: event.target.value,
    }));
  }

  function formatDate(date) {
    const parsedDate = new Date(date);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: "true",
    };

    return parsedDate.toLocaleString("en-US", options);
  }

  function handleSaveTask(event) {
    event.preventDefault();
    toggleShowTask();
    editTask(modifiedTask);
    toggleShowTask();
    toggleEditTask();
  }

  function handleCancel() {
    setModifiedTask(task);
    setIsEditing(false);
  }

  function handleClose() {
    if (isEditing) {
      alert("You have unsaved changes.");
      return;
    }

    handleCancel();
    toggleShowTask();
  }

  return (
    <dialog className="task-modal" ref={modalRef}>
      <div className="task">
        <div className="task-buttons-container">
          {isEditing ? (
            <>
              <button onClick={handleSaveTask}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button onClick={toggleEditTask}>Edit</button>
          )}
          <button onClick={handleClose}>Close</button>
        </div>
        <form className="task-content" onSubmit={handleSaveTask}>
          <input
            className="task-name"
            type="text"
            name="name"
            placeholder="Enter a task title..."
            readOnly={!isEditing}
            onChange={handleChange}
            value={modifiedTask.name}
          ></input>

          <div className="course-due-date">
            <p className="task-course">{course.name}</p>
            {task.dueDate === "" && !isEditing ? (
              <p>No due date</p>
            ) : (
              <div className="task-due-date-container">
                <label htmlFor="due-date">Due: </label>
                <input
                  className="task-due-date"
                  type={isEditing ? "datetime-local" : "text"}
                  name="dueDate"
                  id="due-date"
                  readOnly={!isEditing}
                  onChange={handleChange}
                  value={
                    isEditing
                      ? modifiedTask.dueDate
                      : formatDate(modifiedTask.dueDate)
                  }
                ></input>
              </div>
            )}
          </div>

          <hr />
          <textarea
            className="task-description"
            type="text"
            name="description"
            placeholder="Enter a description..."
            readOnly={!isEditing}
            onChange={handleChange}
            value={modifiedTask.description}
          ></textarea>
        </form>
      </div>
    </dialog>
  );
}
