import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { marked } from "marked";
import Nav from "../components/Nav.jsx";

const Edit = () => {
	const titleInput = useRef();
	const contentInput = useRef();
	const [inputData, setInputData] = useState(["", ""]);
	const [markdownToHtml, setMarkdownToHtml] = useState("");
	const [post, setPost] = useState([]);
	const params = useParams();

	const getPost = async () => {
		const postRes = await axios.get(
			`http://54.180.145.34:8080/api/v1/board/${params.boardId}`
		);
		// const postRes = {
		//     "boardId" : 1,
		//     "title" : "제목 입니다",
		//     "content" : "# 내용 입니다",
		//     "writer" : "작성자A",
		//     "view" : 20,
		//     "like" : 1,
		//     "createdAt": "2024-07-03T12:34:56Z"
		// }
		if (!postRes) {
			alert("잘못된 접근입니다.");
			window.location.replace("../");
			return;
		}
		return postRes.data;
	};

	useEffect(() => {
		getPost().then((res) => {
			setPost(res);
			setInputData([res.title, res.content]);
		});
	}, []);

	const sendPost = async () => {
		const { resPost } = await axios.put(
			`http://54.180.145.34:8080/api/v1/board/${post.boardId}`,
			{
				title: inputData[0],
				content: inputData[1],
			}
		);

		return resPost.data;
	};

	useEffect(() => {
		setMarkdownToHtml(marked(inputData[1]));
	}, [inputData]);

	return (
		<>
			<Nav />
			<input
				className="titleInput"
				placeholder="제목"
				ref={titleInput}
				onChange={(e) => {
					setInputData([e.target.value, inputData[1]]);
				}}
				value={inputData[0]}
			></input>
			<button className="createBtn" onClick={sendPost}>
				수정
			</button>

			<textarea
				className="contentInput"
				placeholder="내용"
				ref={contentInput}
				onChange={(e) => {
					setInputData([inputData[0], e.target.value]);
				}}
				value={inputData[1]}
			></textarea>
			<div
				className="previewContent"
				dangerouslySetInnerHTML={{ __html: markdownToHtml }}
			></div>
		</>
	);
};

export default Edit;
