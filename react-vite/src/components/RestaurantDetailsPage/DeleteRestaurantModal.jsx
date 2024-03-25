import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import './DeleteRestaurantModal.css'
import { deleteRestaurant } from "../../redux/restaurants";

function DeleteRestaurantModal({restaurantId, navigate}) {
	const { closeModal } = useModal();
	const dispatch = useDispatch();

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			dispatch(deleteRestaurant(restaurantId));
			closeModal();
			navigate();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<div className="drmContainer">
				<div className="drmInfo">
					<h2>Confirm Delete</h2>
					<p>Are you sure you want to remove this restaurant?</p>
				</div>
				<div className="drmInfo">
					<button className="drmButtonTop" onClick={handleDelete}>Yes (Delete Restaurant) </button>
					<button className="drmButtonBottom" onClick={closeModal}>No (Keep Restaurant) </button>
				</div>
			</div>
		</>
	);
}

export default DeleteRestaurantModal;
