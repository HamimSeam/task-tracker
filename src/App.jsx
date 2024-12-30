import { useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList/TaskList.jsx";
import Category from "./components/Category/Category.jsx";

function App() {
  // entry format: <categoryName> : [tasks]
  const [categories, setCategories] = useState([]);

  function addCategory(categoryName) {
    const newCategory = { name: [categoryName], tasks: [], id: Date.now() };
    setCategories([...categories, newCategory]);
  }

  function removeCategory(categoryName) {
    setCategories(
      categories.filter((category) => category.name !== categoryName)
    );
  }

  return (
    <div id="app">
      <div class="category-container">
        {categories.map((category) => (
          <Category key={category.id} name={category.name} />
        ))}
        <button onClick={() => addCategory("fewf")}>+</button>
      </div>
    </div>
  );
}

export default App;
