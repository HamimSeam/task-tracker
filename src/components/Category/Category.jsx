import TaskList from "../TaskList/TaskList.jsx";
import "./Category.css";

function Category({ name }) {
  return (
    <div className="category">
      <h2>{name}</h2>
      <TaskList />
    </div>
  );
}

export default Category;
