import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      })
    })
    .then(r=>r.json())
    .then((updatedItem) => onUpdateItem(updatedItem))
  }

  //we have to interpolate the items id in the fetch so the computer knows to update or delete the item the user clicked on
  function handleDeleteClick () {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DElETE',
      })
      .then(r=>r.json())
      //remember to not place the recived data in the parameters of second .then because we just need to send the item to the parent so we could update the state to show everything but the item who matches the updated states id
      .then(() => onDeleteItem(item))
    }
  
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
      className={item.isInCart ? "remove" : "add"}
      onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
