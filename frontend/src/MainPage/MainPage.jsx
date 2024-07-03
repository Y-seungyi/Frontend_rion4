import { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `http://${process.env.REACT_APP_IP}/api/v1/board/list`,
    //       {
    //         params: { page },
    //       }
    //     );
    //     setList(response.data.content);
    //     setTotalPages(response.data.pageable.totalPages);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();

    setList([
      {
        boardId: 1,
        title: "제목 입니다",
        writer: "작성자A",
        view: 20,
        like: 1,
        createdAt: "2024-07-03T12:34:56Z",
      },
      {
        boardId: 2,
        title: "또 다른 제목",
        writer: "작성자B",
        view: 15,
        like: 3,
        createdAt: "2024-07-03T13:00:00Z",
      },
    ]);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="board-container">
        <h1>멋쟁이 사자처럼 게시판</h1>

      {list.length > 0 ? (
        <>
          <table className="board-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr
                  key={item.boardId}
                  className="board-item"
                  onClick={() => handleRowClick(item.boardId)}
                >
                  <td>{item.boardId}</td>
                  <td>{item.title}</td>
                  <td>{item.writer}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.view}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`page-button ${page === index + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MainPage;
