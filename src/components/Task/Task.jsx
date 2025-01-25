import { useState } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import "./Task.css";

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

export function TaskPreview({ task, course, editTask, removeTask }) {
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

  function handleRemoveTask(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    removeTask(task.taskId);
  }

  return (
    <>
      <div className="task-preview" onClick={toggleShowTask}>
        <span>{task.name}</span>
        <button onClick={handleRemoveTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        </button>
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

// FIXME: Task modal is currently generated for every task.
// This introduces repetitive dialog elements in the DOM.
// Make the modal a singleton, dynamically displaying a selected task.
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
            <button onClick={toggleEditTask}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="black"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button>
          )}
          <button onClick={handleClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="black"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
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
