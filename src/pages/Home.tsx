import Navbar from "../components/Navbar";
import Tabsbar from "../components/Tabsbar";
import { BsPeople } from "react-icons/bs";
import { BiBuildingHouse, BiLink } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { RiGitRepositoryLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getProfileData, updateProfile } from "../redux/features/profileSlice";
import Repo from "../components/Repo";
import { getAllRepos } from "../redux/features/repoSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Home = () => {
	const profileInfo = useSelector((state: any) => state.profile.profile);
	const repos = useSelector((state: any) => state.repos.repos);
	const loginData = JSON.parse(localStorage.getItem("loginEmail") || "");

	const {
		avatar_url,
		name,
		login,
		bio,
		followers,
		following,
		company,
		location,
		blog,
	} = profileInfo;

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	let time = new Date();
	let currentTime = `${time.getHours()}:${time.getMinutes()}`;

	const [searchText, setSearchText] = useState<string>("");

	interface Profile {
		name: string;
		bio: string;
		company: string;
		location: string;
		blog: string;
	}

	// const [updatedProfile, setUpdatedProfile] = useState<Profile>({
	// 	name: name,
	// 	bio: bio,
	// 	company: company,
	// 	location: location,
	// 	blog: blog,
	// });

	const [updatedProfile, setUpdatedProfile] = useState<Profile>({
		name: "",
		bio: "",
		company: "",
		location: "",
		blog: "",
	});

	const handleChange = (e: React.FormEvent) => {
		const target = e.target as HTMLInputElement;

		setUpdatedProfile({
			...updatedProfile,
			[target.name]: target.value,
		});
	};

	const handleSearch = (e: React.FormEvent) => {
		const target = e.target as HTMLInputElement;
		setSearchText(target.value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log(updatedProfile);
		dispatch(updateProfile(updatedProfile));
		setIsEditing(false);
	};

	const filteredResults = repos.filter((repo: any) =>
		repo.name.toLowerCase().includes(searchText.toLowerCase())
	);

	useEffect(() => {
		dispatch(getAllRepos(loginData));
		dispatch(getProfileData(loginData));
	}, []);

	return (
		<div>
			<Navbar />
			<Tabsbar />
			<div className="home">
				<div className="home_left">
					<div className="profile_pic">
						<img src={avatar_url} alt="" />
					</div>
					{isEditing ? (
						<form onSubmit={handleSubmit}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								name="name"
								onChange={handleChange}
								value={updatedProfile.name}
							/>
							<label htmlFor="bio">Bio</label>
							<textarea
								name="bio"
								id="bio"
								cols={30}
								rows={4}
								onChange={handleChange}
								value={updatedProfile.bio}
							></textarea>
							<div className="form_field">
								<label htmlFor="company">
									<BiBuildingHouse />
								</label>
								<input
									type="text"
									id="company"
									name="company"
									onChange={handleChange}
									value={updatedProfile.company}
								/>
							</div>
							<div className="form_field">
								<label htmlFor="location">
									<GoLocation />
								</label>
								<input
									type="text"
									id="location"
									name="location"
									onChange={handleChange}
									value={updatedProfile.location}
								/>
							</div>
							<div className="form_field">
								<label htmlFor="blog">
									<BiLink />
								</label>
								<input
									type="text"
									id="blog"
									name="blog"
									onChange={handleChange}
									value={updatedProfile.blog}
								/>
							</div>
							<div className="form_btns">
								<button id="save" type="submit">
									Save
								</button>
								<button
									id="cancel"
									onClick={() => setIsEditing(false)}
								>
									Cancel
								</button>
							</div>
						</form>
					) : (
						<div className="profile_info">
							<div className="fullname">{name}</div>
							<div className="username">{login}</div>
							<div className="title">{bio}</div>
							<button
								className="edit_profile_btn"
								onClick={() => setIsEditing(true)}
							>
								Edit profile
							</button>
							<div className="statistics">
								<div className="followers">
									<BsPeople />
									{followers} followers
								</div>
								<div className="following">
									.{following} following
								</div>
							</div>
							<div className="other_info">
								<p className="address">
									<BiBuildingHouse />
									{company}
								</p>
								<p className="state">
									<GoLocation />
									{location}
								</p>
								<p className="time_zone">
									<BsClock />
									{currentTime}(UTC - 12:00)
								</p>
								<p className="website">
									<BiLink />
									<a href={blog}>{blog}</a>
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="home_right">
					<div className="search_bar">
						<input
							onChange={handleSearch}
							className="home_search_input"
							type="text"
							placeholder="Find a repository..."
						/>
						<div className="search_bar_btns">
							<select name="type" id="type">
								<option value="Type">Type</option>
								<option value="All">All</option>
								<option value="Public">Public</option>
								<option value="Private">Private</option>
							</select>
							<select name="language" id="language">
								<option value="language">Language</option>
							</select>
							<select name="sort" id="sort">
								<option value="sort">Sort</option>
							</select>
							<button className="search_bar_btn">
								<span>
									<RiGitRepositoryLine />
									New
								</span>
							</button>
						</div>
					</div>
					<hr />
					{/* {repos
						.filter((repo: any) => {
							return searchText.toLowerCase() === ""
								? repo
								: repo.name.toLowerCase().includes(searchText);
						})
						.map((repo: any, i: any): any => (
							<Repo key={i} repo={repo} />
						))} */}
					{filteredResults.map((repo: any, i: any): any => (
						<Repo key={i} repo={repo} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
