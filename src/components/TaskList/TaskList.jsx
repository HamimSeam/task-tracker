import './TaskList.css'
import { useState } from "react";

function Task({ task }) {
  const { title, course, dueDate, description, label } = task;

  return (
    <div className='task'>
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

function TaskList() {
  const [tasks, setTasks] = useState([]);

  function addTask(event) {
    event.preventDefault();
    const form = event.target;

    const title = form['title'].value;
    const course = form['course'].value;
    const dueDate = form['due-date'].value;
    const description = form['description'].value;
    const label = form['label'].value;
    const id = Date.now()

    const taskInfo = {
      title,
      course,
      dueDate,
      description,
      label,
      id
    };

    console.log(taskInfo)
    setTasks([...tasks, taskInfo]);
  }

  return (
    <>
      <form onSubmit={addTask}>
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

        <button type="submit">
          Add Task
        </button>
      </form>

      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </>
  );
}

export default TaskList;
