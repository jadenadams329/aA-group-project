import MenuItem from "./MenuItem";
import { useState } from "react";
import "./Category.css";

function Category({ breakfastItems, lunchItems, dinnerItems, beverageItems }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
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
        {breakfastCat.map(category => (
          <ul key={category}>
            <li className={selectedCategory === category ? 'SelectedCat' : ''} onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
        {lunchCat.map(category => (
          <ul key={category}>
            <li onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
        {dinnerCat.map(category => (
          <ul key={category}>
            <li onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
        {beverageCat.map(category => (
          <ul key={category}>
            <li onClick={() => handleCategoryClick(category)}>
              {category}
            </li>
          </ul>
        ))}
      </div>
      <div className="Items">
        <MenuItem items={itemsToRender} />
      </div>
    </div>
  );
}

export default Category;
