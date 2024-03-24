import MenuItem from "./MenuItem";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import "./Category.css";

function Category({selectedMenu ,restId, menuId, breakfastItems, lunchItems, dinnerItems, beverageItems }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const userId = useSelector(state => state.session ? state.session?.user?.id : null)
  const ownerId = useSelector(state => state.restaurants ? state.restaurants?.data[restId]?.owner_id : null)
  const handleCategoryClick = category => setSelectedCategory(category);
  const CategoryList = items => items ? ['All Items', ...new Set(items.map(item => item.category))] : [];

  const breakfastCat = CategoryList(breakfastItems);
  const lunchCat = CategoryList(lunchItems);
  const dinnerCat = CategoryList(dinnerItems);
  const beverageCat = CategoryList(beverageItems);


  let itemsToRender;
  if (selectedCategory === "All Items") {
    itemsToRender = breakfastItems || lunchItems || dinnerItems || beverageItems;
  } else if (selectedCategory !== null) {
    if (breakfastItems) {
      itemsToRender = breakfastItems.filter(item => item.category === selectedCategory);
    } else if (lunchItems) {
      itemsToRender = lunchItems.filter(item => item.category === selectedCategory);
    } else if (dinnerItems) {
      itemsToRender = dinnerItems.filter(item => item.category === selectedCategory);
    } else if (beverageItems) {
      itemsToRender = beverageItems.filter(item => item.category === selectedCategory);
    }
  } else {
    itemsToRender = breakfastItems || lunchItems || dinnerItems || beverageItems;
  }

  return (
    <div className="BottomContainer">
      <div className="Categories">
        {ownerId === userId && selectedMenu ? (
          <Link to={`/menus/${menuId}/items/new`}>
            Add an Item
          </Link>
        ) : null }
        {breakfastCat.map(category => (
          <ul key={category}>
            <li className={selectedCategory === category ? 'SelectedCat' : ''} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
        {lunchCat.map(category => (
          <ul key={category}>
            <li className={selectedCategory === category ? 'SelectedCat' : ''} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
        {dinnerCat.map(category => (
          <ul key={category}>
            <li className={selectedCategory === category ? 'SelectedCat' : ''} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
        {beverageCat.map(category => (
          <ul key={category}>
            <li className={selectedCategory === category ? 'SelectedCat' : ''} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
      </div>
      <div className="Items">
        <MenuItem restId={restId} items={itemsToRender} />
      </div>
    </div>
  );
}

export default Category;
