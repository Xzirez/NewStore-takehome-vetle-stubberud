import NavBar from "./components/NavBar";
import React from "react";
 import TodoPage from "./pages/TodoPage";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <TodoPage />
    </div>
  );
};

export default App;
