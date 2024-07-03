import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { marked } from "marked";
import { IoClose } from "react-icons/io5";
import "./CreatePage.css";
import Nav from "../components/Nav.jsx";

const ErrorPopup = ({ visible, setVisible }) => {
	
	if (!visible) {
		return null;
	}

	const closeErrorPopup = () => {
		setVisible(false);
	}
	
	return (
		<div className="errorBack">
			<div className="errorPopup">
				<IoClose className="errorClose" onClick={closeErrorPopup} />
				<div className="errorMessage">작성 실패</div>
			</div>
		</div>
	);
}

const Create = () => {
	const titleInput = useRef();
	const contentInput = useRef();
	const [inputData, setInputData] = useState(["", ""]);
	const [markdownToHtml, setMarkdownToHtml] = useState("");
	const [errorPopup, setErrorPopup] = useState(false); 

	const sendPost = async () => {
		try {
			const resPost = await axios.post(
				`http://54.180.145.34:8080/api/v1/board`,
				{
					"title": inputData[0],
					"content": inputData[1],
				}
			);
	
			return resPost.data;
		} catch (err) {
			console.log(err);
			setErrorPopup(true);
		}
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
			<ErrorPopup visible={errorPopup} setVisible={setErrorPopup} />
		</>
	);
};

export default Create;
