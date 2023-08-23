import { Loading } from "../components/miscellaneous/Loading"
import { FailedToLoad } from "../components/miscellaneous/FailedToLoad"
import { hideFlash } from "../components/miscellaneous/flash/flashSlice";
import React from "react";

// Function to Check if State is Loading, Loaded or Failed

export const checkState = (toCheck) => {
    if (toCheck === 'Loading') {
        return <Loading />
    } else if (toCheck === 'Failed to Load') {
        return <FailedToLoad />
    } else return null
};

// Function to set timeout for flash component within other components

export const timeout = (flash, dispatch) => {
    if (flash === 'flex') {
        setTimeout(() => {
            dispatch(hideFlash())
        }, 5000);
    }
}

function generateNumberList(start, end) {
    const numberList = [];
    for (let i = start; i <= end; i++) {
      numberList.push(i);
    }
    return numberList;
  }
  
  

export const  quantityDropdown = (handleSelect, existingQuantity = null) => {
    const range = generateNumberList(1, 100);
    return (
        <form className="cart-quantity-form">
            <label htmlFor="quantitySelect"><h4>Quantity: </h4></label>
            <select id="quantitySelect" name="quantity" onChange={handleSelect} defaultValue={existingQuantity}>
                {range.map(num => {
                    return <option value = {`${num}`} key={num}>{num}</option>
                })}
            </select>
        </form>
    )
}

export const toSentenceCase = (str) => {
    return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}