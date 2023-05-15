import { BsBook } from "react-icons/bs";
import { RiGitRepositoryLine } from "react-icons/ri";
import { GoProject } from "react-icons/go";
import { FiPackage } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";
import "./reusables.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const Tabsbar = () => {
	const [tab, setTab] = useState<number>(2);
	const [tabsStyle, setTabsStyle] = useState<boolean>(false);
	const profileInfo = useSelector((state: any) => state.profile.profile);

	const { public_repos } = profileInfo;

	const fixNavbar = () => {
		if (window.scrollY >= 70) {
			setTabsStyle(true);
		} else {
			setTabsStyle(false);
		}
	};

	window.addEventListener("scroll", fixNavbar);
	return (
		<div className={tabsStyle ? "tabs_bar_scroll" : "tabs_bar"}>
			<div className="tabs">
				<div
					className={tab === 1 ? "tab_select" : "tab"}
					onClick={() => setTab(1)}
				>
					<BsBook
						className={tab === 1 ? "tab_icon_select" : "tab_icon"}
					/>
					<p>Overview</p>
				</div>
				<div
					className={tab === 2 ? "tab_select" : "tab"}
					onClick={() => setTab(2)}
				>
					<RiGitRepositoryLine
						className={tab === 2 ? "tab_icon_select" : "tab_icon"}
					/>
					<p>Repositories</p>
					<span>{public_repos}</span>
				</div>
				<div
					className={tab === 3 ? "tab_select" : "tab"}
					onClick={() => setTab(3)}
				>
					<GoProject
						className={tab === 3 ? "tab_icon_select" : "tab_icon"}
					/>
					<p>Projects</p>
				</div>
				<div
					className={tab === 4 ? "tab_select" : "tab"}
					onClick={() => setTab(4)}
				>
					<FiPackage
						className={tab === 4 ? "tab_icon_select" : "tab_icon"}
					/>
					<p>Packages</p>
				</div>
				<div
					className={tab === 5 ? "tab_select" : "tab"}
					onClick={() => setTab(5)}
				>
					<AiOutlineStar
						className={tab === 5 ? "tab_icon_select" : "tab_icon"}
					/>
					<p>Stars</p>
					{/* <span>5</span> */}
				</div>
			</div>
		</div>
	);
};

export default Tabsbar;
