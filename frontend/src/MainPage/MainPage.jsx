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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://54.180.145.34:8080/api/v1/board/list`,
          {
            params: { page, size: 10 },
          }
        );
        setList(response.data.content);
        setTotalPages(response.data.pageable.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
