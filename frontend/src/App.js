import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "./axios";
import { publicRoutes } from "./routes";
import Notfound from "./component/Container/Notfound";

function App() {
  // setInterval(() => {
  //   console.log("refresh");
  //   axios.get("/users/refresh-token").then((response) => console.log(response));
  // }, 3000);
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />}></Route>
            );
          })}

          <Route path="/*" element={<Notfound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
