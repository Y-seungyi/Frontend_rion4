import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import "./CreatePage.css";
import Nav from "../components/Nav.jsx";

const Create = () => {
	const titleInput = useRef();
	const contentInput = useRef();
	const [inputData, setInputData] = useState(["", ""]);
	const [markdownToHtml, setMarkdownToHtml] = useState("");

	const sendPost = async () => {
		const { resPost } = await axios.post(
			`http://54.180.145.34:8080/api/v1/board`,
			{
				"title": inputData[0],
				"content": inputData[1],
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
			></input>
			<button className="createBtn" onClick={sendPost}>
				작성
			</button>

			<textarea
				className="contentInput"
				placeholder="내용"
				ref={contentInput}
				onChange={(e) => {
					setInputData([inputData[0], e.target.value]);
				}}
			></textarea>
			<div
				className="previewContent"
				dangerouslySetInnerHTML={{ __html: markdownToHtml }}
			></div>
		</>
	);
};

export default Create;
