import { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);

  const clickTest = () => {};
  const checkApi = () => {
    axios
      .post("http://54.180.145.34:8080/api/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((Error) => {
        setCheck(false);
      });
  };

  return (
    <>
      <div className="loginbox">
        <h1 className="logintitle">로그인</h1>
        <div className="flexbox">
          <input
            className="Logininput"
            type="email"
            value={email}
            placeholder="이메일(아이디)"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="Logininput"
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          {check ? (
            ""
          ) : (
            <p className="errormessage">
              아이디 또는 비밀번호가 올바르지 않습니다.
            </p>
          )}
          <button className="loginbtn" onClick={checkApi}>
            로그인
          </button>
          <div>
            <Link to="/Register">
              <button className="registerbtn1" onClick={clickTest}>
                회원가입
              </button>
            </Link>
            <button className="registerbtn2" onClick={clickTest}>
              카카오 회원가입
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
