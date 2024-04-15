import React from "react";
import "./Item.css";

function Item({ item }) {
  return (
    <li className="Item">
      <img src={item.imgUrl} alt={item.title} />
      <div className="Item-desc">
        <h3>{item.title}</h3>
        <span>{item.createdAt}</span>
        <span>{item.rating}</span>
        <p>{item.content}</p>
      </div>
    </li>
  );
}

export default Item;
