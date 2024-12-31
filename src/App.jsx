import { useState } from "react";
import { produce } from "immer";
import "./App.css";
import TaskList from "./components/TaskList/TaskList.jsx";
import Category from "./components/Category/Category.jsx";

function App() {
  const [categories, setCategories] = useState({
    1: {
      name: "Software Design Lab",
      tasks: {
        1: {
          title: "Submit Final Project",
          course: "Software Design Lab",
          dueDate: "01/01/2025",
          description: "Finalize the endpoint.",
        },
        2: {
          title: "Revise Vending Machine",
          course: "Computer Systems",
          dueDate: "01/01/2025",
          description: "Finalize the assembly code.",
        },
      },
    },
    3: {
      name: "Methods of Differential Equations",
      tasks: {
        4: {
          title: "Study Separation of Variables (PDE)",
          course: "Methods of Differential Equations",
          dueDate: "01/05/2025",
          description: "Remember the results with different eigenvalues.",
        },
      },
    },
  });

  function addCategory(categoryName) {
    const categoryId = crypto.randomUUID();

    const newCategory = {
      [categoryId]: {
        name: categoryName,
        tasks: {},
      },
    };

    setCategories((prevCategories) => ({ ...prevCategories, ...newCategory }));
  }

  function getCategory(categoryId) {
    return categories[categoryId];
  }

  function editCategoryName(categoryId, newName) {
    setCategories((prevCategories) =>
      produce(prevCategories, (draft) => {
        draft[categoryId].name = newName;
      })
    );
  }

  function removeCategory(categoryId) {
    setCategories((prevCategories) => {
      produce(prevCategories, (draft) => {
        delete draft[categoryId];
      });
    });
  }

  function addTask(categoryId, newTask) {
    setCategories((prevCategories) =>
      produce(prevCategories, (draft) => {
        const taskId = crypto.randomUUID();
        draft[categoryId].tasks[taskId] = newTask;
      })
    );
  }

  function getTask(categoryId, taskId) {
    return categories[categoryId].tasks[taskId];
  }

  function editTask(categoryId, taskId, modifiedTask) {
    setCategories((prevCategories) =>
      produce(prevCategories, (draft) => {
        draft[categoryId].tasks[taskId] = modifiedTask;
      })
    );
  }

  function removeTask(categoryId, taskId) {
    setCategories((prevCategories) => {
      produce(prevCategories, (draft) => {
        delete draft[categoryId].tasks[taskId];
      });
    });
  }

  function getTaskFunctions(categoryId) {
    return {
      addTask: (task) => addTask(categoryId, task),
      getTask: (taskId) => getTask(categoryId, taskId),
      editTask: (taskId, modifiedTask) =>
        editTask(categoryId, taskId, modifiedTask),
      removeTask: (taskId) => removeTask(categoryId, taskId),
    };
  }

  return (
    <div id="app">
      <div className="category-container">
        {Object.entries(categories).map(([categoryId, category]) => (
          <Category
            key={categoryId}
            category={category}
            taskFunctions={getTaskFunctions(categoryId)}
          />
        ))}
        <button onClick={() => addCategory("Untitled")}>+</button>
      </div>
    </div>
  );
}

export default App;
