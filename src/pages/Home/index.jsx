import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import {
	FaQrcode,
	FaSearch,
	FaTasks,
	FaRegQuestionCircle,
	FaGlobeAmericas,
	FaNetworkWired,
	FaBars,
	FaArrowLeft,
} from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Button } from "../../components/Button";
import { Footer } from "../../components/Footer";

const AppContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100vh;
	background-color: #f0f0f0;
`;

const MainContent = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	overflow: hidden;
	position: relative;
`;

const CarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
	height: 70%;
	margin: auto;
	background-color: var(--bkg-blue);
	border-radius: 20px;
	padding: 20px;
`;

const NavBar = styled.div`
	width: 240px;
	background-color: var(--bkg-blue);
	color: white;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 20px;
	box-shadow: 3px 0 15px rgba(0, 0, 0, 0.3);

	@media (max-width: 768px) {
		width: 100%;
		height: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
	}
`;

const NavBarToggle = styled.div`
	display: none;
	position: absolute;
	top: 20px;
	right: 20px;
	cursor: pointer;
	z-index: 1000;

	@media (max-width: 768px) {
		display: block;
	}
`;

const StyledLink = styled(Link)`
	padding: 12px;
	display: flex;
	align-items: center;
	gap: 10px;
`;

const CarouselItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(135deg, #ff7e5f, #feb47b);
	padding: 40px;
	border-radius: 15px;
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
	text-align: center;
	transition: transform 0.3s, box-shadow 0.3s;
	height: 100%;
	width: 100%;

	&:hover {
		transform: scale(1.05);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	}
`;

const CustomCarousel = styled(Carousel)`
	width: 100%;
	.carousel-status {
		display: none;
	}
`;

const LogoutButton = styled.button`
	margin-top: 20px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 16px;
`;

const ReturnButton = styled.button`
	font-size: 16px;
	display: flex;
	align-items: center;
	gap: 5px;
`;

export const Home = () => {
	const [isNavBarOpen, setIsNavBarOpen] = useState(false);
	const [showCarousel, setShowCarousel] = useState(true);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === "/home") {
			setShowCarousel(true);
		} else {
			setShowCarousel(false);
		}
	}, [location.pathname]);

	const toggleNavBar = () => {
		setIsNavBarOpen(!isNavBarOpen);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/");
	};

	const handleReturn = () => {
		navigate("/home");
	};

	return (
		<AppContainer>
			<NavBarToggle onClick={toggleNavBar} aria-label="Toggle navigation">
				<FaBars size={24} color="#2C3E50" />
			</NavBarToggle>

			<NavBar $isOpen={isNavBarOpen}>
				<StyledLink to="qr-code-generator">
					<FaQrcode />
					QR Code Generator
				</StyledLink>
				<StyledLink to="ip-address-finder">
					<FaNetworkWired />
					IP Address Finder
				</StyledLink>
				<StyledLink to="movie-search-engine">
					<FaSearch />
					Movie Search
				</StyledLink>
				<StyledLink to="todo-app">
					<FaTasks />
					Todo App
				</StyledLink>
				<StyledLink to="quiz-app">
					<FaRegQuestionCircle />
					Quiz App
				</StyledLink>
				<StyledLink to="language-translator">
					<FaGlobeAmericas />
					Translator
				</StyledLink>
				<LogoutButton onClick={handleLogout}>Logout</LogoutButton>
			</NavBar>

			<MainContent>
				{showCarousel ? (
					<CarouselContainer>
						<CustomCarousel
							showArrows={true}
							infiniteLoop={true}
							autoPlay={true}
							interval={5000}
							showThumbs={false}
						>
							<CarouselItem>
								<h2 className="titleTwo">QR Code Generator</h2>
								<Link to="qr-code-generator">
									<Button>Acessar</Button>
								</Link>
							</CarouselItem>
							<CarouselItem>
								<h2 className="titleTwo">IP Address Finder</h2>
								<Link to="ip-address-finder">
									<Button>Acessar</Button>
								</Link>
							</CarouselItem>
							<CarouselItem>
								<h2 className="titleTwo">Movie Search Engine</h2>
								<Link to="movie-search-engine">
									<Button>Acessar</Button>
								</Link>
							</CarouselItem>
							<CarouselItem>
								<h2 className="titleTwo">Todo App</h2>
								<Link to="todo-app">
									<Button>Acessar</Button>
								</Link>
							</CarouselItem>
							<CarouselItem>
								<h2 className="titleTwo">Quiz App</h2>
								<Link to="quiz-app">
									<Button>Acessar</Button>
								</Link>
							</CarouselItem>
							<CarouselItem>
								<h2 className="titleTwo">Language Translator</h2>
								<Link to="language-translator">
									<Button>Acessar</Button>
								</Link>
							</CarouselItem>
						</CustomCarousel>
					</CarouselContainer>
				) : (
					<>
						<Outlet />
						<ReturnButton onClick={handleReturn}>
							<FaArrowLeft />
							Return
						</ReturnButton>
					</>
				)}
			</MainContent>

			<Footer>© 2024 Your Company | All rights reserved</Footer>
		</AppContainer>
	);
};
