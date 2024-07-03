import axios from "axios";
import { marked } from "marked";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	IoHeartOutline,
	IoHeart,
	IoPersonOutline,
	IoEyeOutline,
	IoTimeOutline,
	IoPencil,
	IoTrashOutline,
} from "react-icons/io5";
import "./PostPage.css";
import Nav from "../components/Nav.jsx";

const Post = () => {
	const [post, setPost] = useState([]);
	const [markdownToHtml, setMarkdownToHtml] = useState("");
	const [editButtonVisible, setEditButtonVisible] = useState(false);
	const [dateFormat, setDateFormat] = useState('');
	const params = useParams();

	const getPost = async () => {
		const noPost = {
			boardId: params.postId,
			title: "잘못된 글입니다",
			content: "# :(",
			writer: "admin",
			view: 10000,
			like: 10000,
			createdAt: "0000-00-00T00:00:00Z",
		};
		try {
			const { postRes } = await axios.get(
				`http://54.180.145.34:8080/api/v1/board/${params.postId}`
			);
			// const postRes = {
			// 	"data": {
			// 		"boardId" : 1,
			// 		"title" : "제목 입니다",
			// 		"content" : "# 내용 입니다",
			// 		"writer" : "작성자A",
			// 		"view" : 20,
			// 		"like" : 1,
			// 		"createdAt": "2024-07-03T12:34:56Z"
			// 	}	
			// }

			if (!postRes) {
				setPost(noPost);
				return noPost;
			}
			return postRes.data;
		} catch {
			return noPost;
		}
	};

	useEffect(() => {
		getPost().then((res) => {
			setDateFormat(res.createdAt.split('T')[0]);
			setPost(res);
			setMarkdownToHtml(marked(res.content));
			if (res.writer == "admin") setEditButtonVisible(true);
		});
	}, []);

	const editPost = () => {
		window.location.replace(`../edit/${post.boardId}`);
	};
	const deletePost = () => {
		axios.delete(
			`http://${process.env.REACT_APP_IP}/api/v1/board/${params.boardId}`
		);
	};
	const likePost = () => {
		axios.post(
			`http://${process.env.REACT_APP_IP}/api/v1/like/${params.boardId}`
		);
	};

	return (
		<>
			<Nav />
			<div className="topContent">
				<div className="titleContent">
					<div className="title">{post.title}</div>
					<WriterButton
						editPost={editPost}
						deletePost={deletePost}
						visible={editButtonVisible}
					/>
				</div>
				<div className="infoContent">
					<div className="user">
						<IoPersonOutline className="userIcon" /> {post.writer}
					</div>
					<div className="date">
						<IoTimeOutline className="dateIcon" /> {dateFormat}
					</div>
					<div className="view">
						<IoEyeOutline className="viewIcon" /> {post.view}
					</div>

					<div className="like" onClick={likePost}>
						<IoHeart className="likeIcon" />
						{post.like}
					</div>
				</div>
			</div>
			<div
				className="bottomContent"
				dangerouslySetInnerHTML={{ __html: markdownToHtml }}
			></div>
		</>
	);
};

const WriterButton = ({ editPost, deletePost, visible }) => {
	if (!visible) return null;
	return (
		<>
			<div className="edit" onClick={editPost}>
				<IoPencil className="editIcon" />
			</div>
			<div className="delete" onClick={deletePost}>
				<IoTrashOutline className="deleteIcon" />
			</div>
		</>
	);
};

export default Post;
