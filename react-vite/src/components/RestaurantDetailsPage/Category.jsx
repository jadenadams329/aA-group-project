import MenuItem from "./MenuItem"
import { useState } from "react";
import './Category.css'

function Category({ breakfastItems, lunchItems, dinnerItems, beverageItems }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  let itemsToRender
  if (breakfastItems){
    itemsToRender = breakfastItems.filter(item => item.category === selectedCategory)
  } else if (lunchItems){
    itemsToRender = lunchItems.filter(item => item.category === selectedCategory)
  } else if (dinnerItems){
    itemsToRender = dinnerItems.filter(item => item.category === selectedCategory)
  } else if (beverageItems){
    itemsToRender = beverageItems.filter(item => item.category === selectedCategory)
  } 

    return (
        <div className="BottomContainer">
            <div className="Categories">
                {breakfastItems && breakfastItems.map(item => (
                    <ul key={item.id}>
                        <li onClick={() => handleCategoryClick(item.category)}>{item.category}</li>
                    </ul>
                ))}
            </div>
            <div className="Items">
                <MenuItem items={itemsToRender}/>
            </div>
        </div>
    )
}

export default Category;
