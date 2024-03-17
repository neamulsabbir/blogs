import { Route, Routes } from "react-router-dom";
import Navbar from "./components/SharedFolder/Navbar";
import { BlogDetail } from "./components/Templates/BlogDetail/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import Signup from "./pages/Signup";

function App() {
	return (
		<>
			<Navbar></Navbar>
			<Routes>
				<Route element={<HomePage />} path="/" exact></Route>
				<Route element={<BlogDetail />} path="/blog-details/:id" />
				<Route element={<ProfilePage />} path="/user-profile" />
				<Route element={<LoginPage />} path="/login" />
				<Route element={<Signup />} path="/signup" />
				<Route element={<CreateBlog />} path="/write" />
				<Route element={<NotFoundPage />} path="*" />
			</Routes>
		</>
	);
}

export default App;
