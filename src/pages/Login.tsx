interface LoginTypes {
	username: string;
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
}

const Login = ({
	username,
	setUsername,
	handleSubmit,
	isLoading,
}: LoginTypes) => {
	// const inputRef = useRef<HTMLInputElement>(null);

	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	if (inputRef.current !== null) {
	// 		console.log(inputRef.current.value);
	// 	}

	return (
		<div className="login">
			<form onSubmit={handleSubmit}>
				<h1>Login to Github</h1>
				<input
					type="text"
					// ref={inputRef}
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					placeholder="Enter username..."
					id="username"
					name="username"
				/>
				<button type="submit">
					Submit
					{isLoading && <i className="fa fa-refresh fa-spin"></i>}
				</button>
			</form>
		</div>
	);
};

export default Login;
