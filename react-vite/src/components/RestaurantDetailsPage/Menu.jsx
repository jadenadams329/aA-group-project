import "./Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllMenus } from "../../redux/menu";
import Category from "./Category";

function Menu({ id }) {
  const dispatch = useDispatch();
  const [selectedMenu, setSelectedMenu] = useState("Breakfast")
  const menus = Object.values(useSelector((state) => (state.menus ? state.menus : null)));
  const breakfastItems = menus.filter(menu => menu.name === 'Breakfast')[0]?.menu_items
  const lunchItems = menus.filter(menu => menu.name === 'Lunch')[0]?.menu_items
  const dinnerItems = menus.filter(menu => menu.name === 'Dinner')[0]?.menu_items
  const beverageItems = menus.filter(menu => menu.name === 'Beverages')[0]?.menu_items
  const menuId = menus.filter(menu => menu.name === selectedMenu)[0]?.id
  const userId = useSelector(state => state.session ? state.session?.user?.id : null)
  const ownerId = useSelector(state => state.restaurants ? state.restaurants?.data['1']?.owner_id : null)

  useEffect(() => {
    dispatch(getAllMenus(id));
  }, [dispatch, id]);

  if (!menus) return <>Loading...</>;

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

      </div>
      <div className="CategoriesType">
        {selectedMenu === "Breakfast" && <Category menuId={menuId} breakfastItems={breakfastItems}/>}
        {selectedMenu === "Lunch" && <Category menuId={menuId} lunchItems={lunchItems}/>}
        {selectedMenu === "Dinner" && <Category menuId={menuId} dinnerItems={dinnerItems}/>}
        {selectedMenu === "Beverages" && <Category menuId={menuId} beverageItems={beverageItems}/>}
      </div>
    </>
  );
}

export default Menu;
