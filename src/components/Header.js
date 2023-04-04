import logo from "../img/logo.svg";
import NewTaskForm from "./NewTaskForm";

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="To-Do App Logo" />
        <h1>To-Do App</h1>
      </div>
      <NewTaskForm />
    </header>
  );
}

export default Header;
