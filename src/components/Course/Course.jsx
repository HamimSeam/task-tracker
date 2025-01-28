import { TaskPreview } from "../Task/Task.jsx";
import "./Course.css";

function Course({ course, tasks, addTask, editTask, removeTask }) {
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
        <div className="course-heading">
          <span className="course-name">{course.name}</span>
          <button className="add-task-button" onClick={handleAddTask}>
            +
          </button>
        </div>
        {tasks.map((task) => (
          <TaskPreview
            key={task.taskId}
            task={task}
            course={course}
            editTask={editTask}
            removeTask={removeTask}
          />
        ))}
      </div>
    </>
  );
}

export default Course;
