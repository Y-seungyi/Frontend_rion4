import { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SlArrowLeft } from "react-icons/sl";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailcheck, setEmailcheck] = useState(false);
  const [certify, setSertify] = useState(false);
  const [certifycode, setSertifycode] = useState();
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

  const checkApi = () => {
    axios
      .post("http://54.180.145.34:8080/api/auth/sign-up", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log("succes");
      });
  };
  const checkEmail = () => {
    if (emailRegEx.test(email)) {
      setEmailcheck(true);
    } else {
      setEmailcheck(false);
    }
  };

  const clickTest = () => {};

  const sendCode = () => {
    if (emailcheck) {
      setSertify(true);
    }
  };

  return (
    <>
      <div className="register">
        <div className="backbtncontainer">
          <SlArrowLeft />
          <Link to="/Login">
            <button className="backbtn">뒤로가기</button>
          </Link>
        </div>
        <h1 className="registertitle">회원가입</h1>
        <div className="content">
        <div className="flexbox">
          <input
            type="email"
            value={email}
            placeholder="이메일(아이디)"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmail}
            className={emailcheck ? "trueEmail" : "falseEmail"}
          />
          <button className="emailbtn" onClick={sendCode}>
            이메일 인증
          </button>
          <div>
            {certify ? (
              <input
                className="Registerinput"
                value={certifycode}
                placeholder="인증코드 입력"
                onChange={(e) => setSertifycode(e.target.value)}
              />
            ) : (
              ""
            )}
          </div>
          <div className="emailbtn">
            {certify ? <button className="emailbtn">코드 인증</button> : ""}
          </div>
          <input
            className="Registerinput"
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="Registerinput"
            value={username}
            placeholder="닉네임"
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <button className="registerbtn" onClick={checkApi}>
            회원가입
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
