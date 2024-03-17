import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "./Avatar";

const Navbar = () => {
	const { auth, setAuth } = useAuth();
	useEffect(() => {
		const storedUserData = localStorage.getItem("userData");

		if (storedUserData) {
			setAuth(JSON.parse(storedUserData));
		}
	}, []);

	const handleLogout = () => {
		setAuth({});
		localStorage.removeItem("userData");
	};
	return (
		<header>
			<nav className="container">
				<div>
					<Link to="/">
						<img className="w-32" src="/images/logo.svg" alt="lws" />
					</Link>
				</div>

				<div>
					<ul className="flex items-center space-x-5">
						{auth?.user?.id && (
							<>
								<li>
									<Link
										to="/write"
										className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
									>
										Write
									</Link>
								</li>
								<li>
									<Link to="/" className="flex items-center gap-2 cursor-pointer">
										<img src="/images/icons/search.svg" alt="Search" />
										<span>Search</span>
									</Link>
								</li>
							</>
						)}
						{auth?.user?.id ? (
							<li>
								<div
									className="text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
									onClick={handleLogout}
								>
									Logout
								</div>
							</li>
						) : (
							<li>
								<Link
									to="/login"
									className="text-white/50 hover:text-white transition-all duration-200 cursor-pointer"
								>
									Login
								</Link>
							</li>
						)}

						{auth?.user?.id && (
							<li className="flex items-center">
								<Avatar src={auth?.user?.avatar} name={auth?.user?.firstName} bgColor="bg-orange-600" />

								<Link to="/user-profile">
									<span className="text-white ml-2">
										{auth?.user?.firstName} {auth?.user?.lastName}
									</span>
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
