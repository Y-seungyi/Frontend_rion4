import { Route, BrowserRouter, Routes } from "react-router-dom"; // *여기를 수정해야 함
import MainPage from "./MainPage/MainPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
