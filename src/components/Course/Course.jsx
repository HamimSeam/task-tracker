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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="white"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
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
