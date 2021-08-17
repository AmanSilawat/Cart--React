import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const initial_state = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state)

  const clear_cart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id })
  }

  const increase = id => {
    dispatch({ type: 'INCREASE', payload: id })
  }

  const decrease = id => {
    dispatch({ type: 'DECREASE', payload: id })
  }

  const fetch_data = async () => {
    dispatch({ type: 'LOADING' });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({type: 'DISPLAY_ITEMS', payload: cart})
  }

  const toggle_amount = (id, type) => {
    dispatch({type: 'TOGGLE_AMOUNT', payload: {id, type}})
  }

  useEffect(() => {
    fetch_data();
  }, [])

  useEffect(() => {
    dispatch({type: 'GET_TOTAL'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clear_cart,
        remove,
        increase,
        decrease,
        toggle_amount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
