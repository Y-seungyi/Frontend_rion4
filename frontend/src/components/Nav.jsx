import "./Nav.css";

const Nav = () => {

    const navHome = () => {
        window.location.replace(`../`);
    }

    const navLogin = () => {
        window.location.replace(`../login`);
    }

    const navWrite = () => {
        window.location.replace(`../create`);
    }

	return (
		<>
			<div className="navBar">
				<div className="logo">금스타그램</div>
				<div onClick={navHome}>Home</div>
				<div onClick={navLogin}>Login</div>
				<div onClick={navWrite}>Write</div>
			</div>
		</>
	);
};

export default Nav;
