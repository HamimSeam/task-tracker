import TaskList from "../TaskList/TaskList.jsx";
import "./Category.css";

function Category({ children }) {
  return (
    <div className="category">
      <h2>{children}</h2>
      <TaskList />
    </div>
  );
}

export default Category;
