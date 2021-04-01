import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { LoginPage } from "./components/pages/Login";
import { Dashboard } from "./components/pages/Dashboard";
import { initialUser, User } from "./components/utils/Types";

function App() {
  const [user, setUser] = useState<User>(initialUser);
  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          component={() => <LoginPage setUser={setUser} />}
        />
        <Route exact path="/info" component={() => <Dashboard user={user} />} />
      </div>
    </Router>
  );
}

export default App;
