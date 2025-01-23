import { TaskPreview } from "../Task/Task.jsx";
import "./Course.css";

function Course({ course, tasks, addTask, editTask }) {
  function handleAddTask() {
    const newTask = {
      name: "New Task",
      courseId: course.courseId,
      dueDate: "",
      description: "",
      taskId: crypto.randomUUID(),
    };

    addTask(newTask);
  }

  return (
    <>
      <div className="course">
        <h3>{course.name}</h3>
        {tasks.map((task) => (
          <TaskPreview key={task.taskId} task={task} course={course} editTask={editTask} />
        ))}
        <button onClick={handleAddTask}>+</button>
      </div>
    </>
  );
}

export default Course;
