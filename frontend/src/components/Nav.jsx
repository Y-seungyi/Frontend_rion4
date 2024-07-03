import "./Nav.css";

const Nav = () => {
  const userName = localStorage.getItem("userName");

  const navHome = () => {
    window.location.replace(`../`);
  };

  const navLogin = () => {
    window.location.replace(`../login`);
  };

  const navLogout = () => {
    // localStorage에서 userName 삭제
    localStorage.removeItem("userName");
    // 로그아웃 후 홈으로 이동
    window.location.replace(`../`);
  };

  const navWrite = () => {
    window.location.replace(`../create`);
  };

  return (
    <>
      <div className="navBar">
        <div className="logo">금스타그램</div>
        <div onClick={navHome}>Home</div>
        {userName ? (
          <div onClick={navLogout}>Logout</div>
        ) : (
          <div onClick={navLogin}>Login</div>
        )}
        <div onClick={navWrite}>Write</div>
      </div>
    </>
  );
};

export default Nav;
