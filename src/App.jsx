import { useState } from "react";
import { useEffect } from "react";
import { produce } from "immer";
import Course from "./components/Course/Course.jsx";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([
    {
      name: "WEB102",
      courseId: "1",
    },
  ]);
  const [tasks, setTasks] = useState([]);

  function addCourse(newCourse) {
    setCourses([...courses, newCourse]);
  }

  function getCourse(courseId) {
    return courses.find((course) => course.courseId === courseId);
  }

  function editCourse(modifiedCourse) {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.courseId === modifiedCourse.courseId ? modifiedCourse : course
      )
    );
  }

  function removeCourse(courseId) {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.courseId === courseId)
    );
  }

  function getTasksByCourse() {
    const tasksFor = {};
    courses.forEach((course) => {
      tasksFor[course.courseId] = [];
    });

    tasks.forEach((task) => {
      tasksFor[task.courseId].push(task);
    });

    return tasksFor;
  }

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function getTask(taskId) {
    return tasks.find((task) => task.taskId === taskId);
  }

  function editTask(modifiedTask) {
    const deletePos = tasks.findIndex(
      (task) => task.taskId === modifiedTask.taskId
    );

    if (deletePos === -1) return;

    setTasks(
      produce((draft) => {
        draft.splice(deletePos, 1);

        if (modifiedTask.dueDate !== "") {
          let insertPos = draft.findIndex(
            (task) =>
              task.dueDate === "" || modifiedTask.dueDate < task.dueDate
          );

          if (insertPos === -1) insertPos = draft.length;
          draft.splice(insertPos, 0, modifiedTask);
        } else {
          draft.push(modifiedTask);
        }
      })
    );
  }

  function removeTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.taskId === taskId));
  }

  const tasksFor = getTasksByCourse();
  return (
    <>
      {Object.entries(tasksFor).map(([courseId, courseTasks]) => (
        <Course
          key={courseId}
          course={courses.find((course) => course.courseId === courseId)}
          tasks={courseTasks}
          addTask={addTask}
          editTask={editTask}
        />
      ))}
      {/* <pre>{JSON.stringify(tasks, null, 2)}</pre> */}
    </>
  );
}

export default App;
