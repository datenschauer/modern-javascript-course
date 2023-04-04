import "./App.css";
import "./fonts.css";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div class="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
            <TaskItem />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
