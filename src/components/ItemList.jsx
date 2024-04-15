import React from "react";
import Item from "./Item";
import "./ItemList.css";

function ItemList({ items, handleDeleteClick }) {
  return (
    <ul className="ItemList">
      {items.map((item) => {
        return (
          <Item
            item={item}
            key={item.id}
            handleDeleteClick={handleDeleteClick}
          />
        );
      })}
    </ul>
  );
}

export default ItemList;
