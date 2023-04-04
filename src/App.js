import "./App.css";
import "./fonts.css";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import React, { createContext, useState } from "react";

export const TaskContext = createContext();

function App() {
  const [taskList, setTaskList] = useState([{ index: 0, taskText: "Beispiel Task" }]);
  return (
    <div className="App">
      <TaskContext.Provider value={{ taskList, setTaskList }}>
        <Header />
        <main>
          <TaskList />
        </main>
      </TaskContext.Provider>
    </div>
  );
}

export default App;
