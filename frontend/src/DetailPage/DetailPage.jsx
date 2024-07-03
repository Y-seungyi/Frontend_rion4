import React from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();

  return (
    <div className="detail-container">
      <h2>게시물 상세 페이지</h2>
      <p>게시물 ID: {id}</p>
    </div>
  );
};

export default DetailPage;
