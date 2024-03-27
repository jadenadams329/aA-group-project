import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenus } from "../../redux/menu";
import Category from "./Category";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import CreateMenuModal from "./CreateMenuModal";
import DeleteMenuModal from "./DeleteMenuModal";

function Menu({ id }) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(null)
  const menus = Object.values(useSelector((state) => (state.menus ? state.menus : null)));
  const breakfastItems = menus.filter(menu => menu.name === 'Breakfast')[0]?.menu_items
  const lunchItems = menus.filter(menu => menu.name === 'Lunch')[0]?.menu_items
  const dinnerItems = menus.filter(menu => menu.name === 'Dinner')[0]?.menu_items
  const beverageItems = menus.filter(menu => menu.name === 'Beverages')[0]?.menu_items
  const menuId = menus.filter(menu => menu.name === selectedMenu)[0]?.id
  const userId = useSelector(state => state.session ? state.session?.user?.id : null)
  const ownerId = useSelector(state => state.restaurants ? state.restaurants?.data[id]?.owner_id : null)

  useEffect(() => {
    dispatch(getAllMenus(id));
    setLoaded(true)
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedMenu && menus && menus.length > 0){
      const breakfastExist = menus.find(menu => menu.name === 'Breakfast')
      const lunchExist = menus.find(menu => menu.name === 'Lunch')
      const dinnerExist = menus.find(menu => menu.name === 'Dinner')
      const beverageExist = menus.find(menu => menu.name === 'Beverages')
      if (breakfastExist){
        setSelectedMenu('Breakfast')
      } else if (lunchExist){
        setSelectedMenu('Lunch')
      } else if (dinnerExist){
        setSelectedMenu('Dinner')
      } else if (beverageExist) {
        setSelectedMenu('Beverages')
      } else {
        setSelectedMenu(menus[0].name)
      }
    }
  }, [menus, selectedMenu])

  if (!loaded) return <>Loading...</>;

  return (
    <>
      <div className="MenuTypeContainer">
        {menus &&
          menus.map((menu) => (
            <div
              key={menu.id}
              className={`MenuName ${selectedMenu === menu.name ? 'SelectedMenu' : ''}`}
              onClick={() => setSelectedMenu(menu.name)}
            >
              {menu.name}
            </div>
          ))}
        {userId === ownerId && menus.length < 4 ?
        <OpenModalButton
          buttonText="Add A Menu"
          modalComponent={
            <CreateMenuModal restId={id}/>
          }/>
          : null}
        {ownerId === userId && menus.length ?
        <OpenModalButton
          buttonText='Delete Menu'
          modalComponent={
            <DeleteMenuModal menus={menus} setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu}/>
          } />
        : null}
      </div>
      <div className="CategoriesType">
        {selectedMenu === "Breakfast" && <Category selectedMenu={selectedMenu}  restId={id} menuId={menuId} breakfastItems={breakfastItems}/>}
        {selectedMenu === "Lunch" && <Category selectedMenu={selectedMenu}  restId={id} menuId={menuId} lunchItems={lunchItems}/>}
        {selectedMenu === "Dinner" && <Category selectedMenu={selectedMenu}  restId={id} menuId={menuId} dinnerItems={dinnerItems}/>}
        {selectedMenu === "Beverages" && <Category selectedMenu={selectedMenu}  restId={id} menuId={menuId} beverageItems={beverageItems}/>}
      </div>
    </>
  );
}

export default Menu;
