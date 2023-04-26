import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import Notfound from "./component/Container/Notfound";

function App() {
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
