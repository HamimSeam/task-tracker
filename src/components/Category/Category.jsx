import TaskList from "../TaskList/TaskList.jsx";
import "./Category.css";

function Category({ category, taskFunctions }) {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <TaskList category={category} taskFunctions={taskFunctions} />
    </div>
  );
}

export default Category;
