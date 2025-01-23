import { useState } from "react";
import { useRef } from "react";
import "./Task.css";

export function TaskPreview({ task, course, editTask }) {
  const modalRef = useRef(null);

  function toggleShowTask() {
    if (modalRef.current.hasAttribute("open")) {
      document.body.style.overflow = "auto";
      modalRef.current.close();
    } else {
      document.body.style.overflow = "hidden";
      modalRef.current.showModal();
    }
  }
  return (
    <>
      <div className="task-preview" onClick={toggleShowTask}>
        <h3>{task.name}</h3>
      </div>
      {
        <Task
          modalRef={modalRef}
          toggleShowTask={toggleShowTask}
          task={task}
          course={course}
          editTask={editTask}
        />
      }
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

  function handleSaveTask(event) {
    event.preventDefault();
    editTask(modifiedTask);
    toggleEditTask();
  }

  function handleCancel() {
    setModifiedTask(task);
    setIsEditing(false);
  }

  function handleClose() {
    handleCancel();
    toggleShowTask();
  }

  return (
    <dialog className="task" ref={modalRef}>
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
      <form onSubmit={handleSaveTask}>
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
          {task.dueDate === Infinity && !isEditing ? (
            <p>No due date</p>
          ) : (
            <div className="task-due-date-container">
              <span>Due: </span>
              <input
                className="task-due-date"
                type="date"
                name="dueDate"
                readOnly={!isEditing}
                onChange={handleChange}
                defaultValue={task.dueDate}
              ></input>
            </div>
          )}
        </div>

        <textarea
          className="task-description"
          type="text"
          name="description"
          placeholder="Enter a description..."
          readOnly={!isEditing}
          onChange={handleChange}
          defaultValue={task.description}
        ></textarea>
      </form>
    </dialog>
  );
}
