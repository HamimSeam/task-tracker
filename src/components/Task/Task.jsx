import { useState } from "react";
import { useRef } from "react";
import "./Task.css";

export function TaskPreview({ task, course, editTask }) {
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
          editTask={editTask}
        />
      }
    </>
  );
}

export function Task({ modalRef, onClose, task, course, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [modifiedTask, setModifiedTask] = useState(task);

  function toggleEditTask() {
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  }

  function handleChange(event) {
    const field = event.target.name;
    console.log(field, event.target.value);

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

  return (
    <dialog className="task" ref={modalRef}>
      <div className="task-buttons-container">
        {isEditing ? (
          <button onClick={handleSaveTask}>Save</button>
        ) : (
          <button onClick={toggleEditTask}>Edit</button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
      <form onSubmit={handleSaveTask}>
        <input
          className="task-name"
          type="text"
          name="name"
          placeholder="Enter a task title..."
          readOnly={!isEditing}
          onChange={handleChange}
          defaultValue={task.name}
        ></input>
        <div className="course-due-date">
          <p className="task-course">{course.name}</p>
          <div className="task-due-date-container">
            <span>Due: </span>
            <input
              className="task-due-date"
              type="date"
              name="dueDate"
              readOnly={!isEditing}
              onChange={handleChange}
              defaultValue={task.dueDate === Infinity ? "" : task.dueDate}
            ></input>
          </div>
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
