import github from "../assets/github.png";
import { BiSearch } from "react-icons/bi";
import { BsBell, BsPlusLg } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import "./reusables.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
	const [hideNav, setHideNav] = useState<boolean>(false);

	const profileInfo = useSelector((state: any) => state.profile.profile);

	const { avatar_url } = profileInfo;

	const handleScrollDown = () => {
		if (window.scrollY >= 70) {
			setHideNav(true);
		} else {
			setHideNav(false);
		}
	};

	window.addEventListener("scroll", handleScrollDown);

	return (
		<nav className={hideNav ? "navbar_scroll" : "navbar"}>
			<div className="left">
				<div className="logo">
					<img src={github} alt="" />
				</div>
				<div className="search_bar">
					<BiSearch className="search_icon" />
					<input type="text" placeholder="Search or jump to..." />
					{/* <div className="slash">/</div> */}
				</div>
				<div className="links">
					<a href="">Pull requests</a>
					<a href="">Issues</a>
					<a href="">Codespaces</a>
					<a href="">Marketplace</a>
					<a href="">Explore</a>
				</div>
			</div>
			<div className="right">
				<BsBell className="bell" />
				<div className="drop_down">
					<BsPlusLg className="plus_sign" />
					<IoMdArrowDropdown className="arrow_down" />
				</div>
				<div className="profile_dropdown">
					<img src={avatar_url} alt="" />
					<IoMdArrowDropdown className="arrow_down" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
