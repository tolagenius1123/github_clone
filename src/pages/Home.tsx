import Navbar from "../components/Navbar";
import Tabsbar from "../components/Tabsbar";
import portrait from "../assets/portrait.png";
import { BsPeople } from "react-icons/bs";
import { BiBuildingHouse, BiLink } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { RiGitRepositoryLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateProfile } from "../redux/features/profileSlice";
import Repo from "../components/Repo";
import { getAllRepos } from "../redux/features/repoSlice";

import { ThunkDispatch } from "@reduxjs/toolkit";

const Home = () => {
	const profileInfo = useSelector((state: any) => state.profile.profile);
	const repos = useSelector((state: any) => state.repos.repos);

	const { name, bio, company, address, website } = profileInfo;

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	let time = new Date();

	let currentTime = `${time.getHours()}:${time.getMinutes()}`;

	interface Profile {
		name: string;
		bio: string;
		company: string;
		address: string;
		website: string;
	}

	// interface RepoTypes {
	// 	key: any;
	// 	repoName: string;
	// 	repoDescription: string;
	// 	repoPrivate: boolean;
	// 	repoLanguage: string;
	// 	repoUpdated: any;
	// }

	const [updatedProfile, setUpdatedProfile] = useState<Profile>({
		name: name,
		bio: bio,
		company: company,
		address: address,
		website: website,
	});

	const handleChange = (e: React.FormEvent) => {
		const target = e.target as HTMLInputElement;

		setUpdatedProfile({
			...updatedProfile,
			[target.name]: target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		console.log(updatedProfile);
		dispatch(updateProfile(updatedProfile));
		setIsEditing(false);
	};

	useEffect(() => {
		dispatch(getAllRepos());
	}, []);

	return (
		<div>
			<Navbar />
			<Tabsbar />
			<div className="home">
				<div className="home_left">
					<div className="profile_pic">
						<img src={portrait} alt="" />
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
								cols="30"
								rows="4"
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
								<label htmlFor="address">
									<GoLocation />
								</label>
								<input
									type="text"
									id="address"
									name="address"
									onChange={handleChange}
									value={updatedProfile.address}
								/>
							</div>
							<div className="form_field">
								<label htmlFor="website">
									<BiLink />
								</label>
								<input
									type="text"
									id="website"
									name="website"
									onChange={handleChange}
									value={updatedProfile.website}
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
							<div className="username">tolagenius1123</div>
							<div className="title">{bio}</div>
							<button
								className="edit_profile_btn"
								onClick={() => setIsEditing(true)}
							>
								Edit profile
							</button>
							<div className="statistics">
								<div className="followers">
									<BsPeople />7 followers
								</div>
								<div className="following">.10 following</div>
							</div>
							<div className="other_info">
								<p className="address">
									<BiBuildingHouse />
									{company}
								</p>
								<p className="state">
									<GoLocation />
									{address}
								</p>
								<p className="time_zone">
									<BsClock />
									{currentTime}(UTC - 12:00)
								</p>
								<p className="website">
									<BiLink />
									<a href="https://tolareactprofile.netlify.app/">
										{website}
									</a>
								</p>
							</div>
						</div>
					)}
				</div>
				<div className="home_right">
					<div className="search_bar">
						<input
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
					{repos.map((repo: any, i: any): any => (
						<Repo key={i} repo={repo} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;