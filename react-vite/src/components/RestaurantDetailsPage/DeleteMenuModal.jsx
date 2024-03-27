import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeMenu } from "../../redux/menu";
import "./DeleteMenuModal.css";

const DeleteMenuModal = ({ menus, selectedMenu, setSelectedMenu }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const menuId = menus.filter((menu) => menu.name === selectedMenu)[0]?.id;

  const confirmDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeMenu(menuId));

    if (selectedMenu === 'Breakfast') {
      if (menus.find(menu => menu.name === 'Lunch')) {
        setSelectedMenu('Lunch');
      } else if (menus.find(menu => menu.name === 'Dinner')) {
        setSelectedMenu('Dinner');
      } else if (menus.find(menu => menu.name === 'Beverages')) {
        setSelectedMenu('Beverages');
      } else {
        setSelectedMenu(null);
      }
    } else if (selectedMenu === 'Lunch') {
      if (menus.find(menu => menu.name === 'Dinner')) {
        setSelectedMenu('Dinner');
      } else if (menus.find(menu => menu.name === 'Beverages')) {
        setSelectedMenu('Beverages');
      } else {
        setSelectedMenu(null);
      }
    } else if (selectedMenu === 'Dinner') {
      if (menus.find(menu => menu.name === 'Beverages')) {
        setSelectedMenu('Beverages');
      } else {
        setSelectedMenu(null);
      }
    } else if (selectedMenu === 'Beverages') {
      setSelectedMenu(null);
    }
    closeModal();
  };

  const nope = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <form className="DeleteMenuForm">
      <h2>Delete Menu</h2>
      <h5>Are you sure you want to Delete this Menu?</h5>
      <div className="selectedMenu">{selectedMenu}</div>
      <div className="SelectionAndPhoto">
        {selectedMenu === "Breakfast" && (
          <img
            className="MenuPhoto"
            src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
        {selectedMenu === "Lunch" && (
          <img
            className="MenuPhoto"
            src="https://images.unsplash.com/photo-1601356616077-695728ae17cb?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
        {selectedMenu === "Dinner" && (
          <img
            className="MenuPhoto"
            src="https://images.unsplash.com/photo-1611765083444-a3ce30f1c885?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
        {selectedMenu === "Beverages" && (
          <img
            className="MenuPhoto"
            src="https://images.unsplash.com/photo-1589948100953-963e39185fd6?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
      </div>
      <div className="DeleteItemButtons">
        <button className="DeleteItemButton" onClick={confirmDelete}>
          Yes (Delete Menu!)
        </button>
        <button className="NopeItemButton" onClick={nope}>
          No (Keep Menu)
        </button>
      </div>
    </form>
  );
};

export default DeleteMenuModal;
