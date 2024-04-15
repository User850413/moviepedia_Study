import React from "react";
import Item from "./Item";
import "./ItemList.css";

function ItemList({ items }) {
  return (
    <ul className="ItemList">
      {items.map((item) => {
        return <Item item={item} key={item.id} />;
      })}
    </ul>
  );
}

export default ItemList;
