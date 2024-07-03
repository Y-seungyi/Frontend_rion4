import { Route, BrowserRouter, Routes } from "react-router-dom"; // *여기를 수정해야 함
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
