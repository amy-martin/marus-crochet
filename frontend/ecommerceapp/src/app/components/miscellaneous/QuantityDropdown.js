import React from "react";

export const QuantityDropdown = ({ handleSelect, selectedQuantity }) => {
    const range = Array.from({ length: 50 }, (_, index) => index + 1);

    return (
        <form className="cart-quantity-form">
            <label className="quantity-label" htmlFor="quantitySelect">
                <h4>Quantity: </h4>
            </label>
            <select
                className="quantity-select"
                id="quantitySelect"
                name="quantity"
                onChange={handleSelect}
                value={selectedQuantity}
            >
                {range.map((num) => (
                    <option className="quantity-option" value={`${num}`} key={num}>
                        {num}
                    </option>
                ))}
            </select>
        </form>
    );
};