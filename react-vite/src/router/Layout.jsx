import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const location = useLocation();

	useEffect(() => {
		dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

  const navigationRender = !location.pathname.includes("login") &&
    !location.pathname.includes("signup");

		return (
			<>
				<ModalProvider>
					{navigationRender && <Navigation isLoaded={isLoaded} />}
					{isLoaded && <Outlet />}
					<Modal />
				</ModalProvider>
			</>
		);
}
