const reducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }

        case 'REMOVE':
            return {
                ...state,
                cart: state.cart.filter(cart_item => cart_item.id !== action.payload)
            }

        case 'INCREASE':
            return {
                ...state,
                cart: state.cart.map(cart_item => {

                    if (cart_item.id === action.payload) {
                        return {
                            ...cart_item,
                            amount: cart_item.amount + 1
                        }
                    }
                    return cart_item;
                })
            }

        case 'DECREASE':
            return {
                ...state,
                cart: state.cart.map(cart_item => {

                    if (cart_item.id === action.payload) {
                        return {
                            ...cart_item,
                            amount: cart_item.amount - 1
                        }
                    }
                    return cart_item;
                }).filter((cart_item) => cart_item.amount !== 0)
            }

        case 'GET_TOTAL':

            const { total, amount } = state.cart.reduce((cart_total, cart_current) => {
                const { price, amount } = cart_current;

                cart_total.total += price * amount;
                cart_total.amount += amount;
                return cart_total;
            }, { total: 0, amount: 0 })

            return {
                ...state,
                total: parseFloat(total.toFixed(2)),
                amount
            }

        case 'LOADING':
            return {
                ...state,
                loading: true
            }

        case 'DISPLAY_ITEMS':
            return {
                ...state,
                loading: false,
                cart: action.payload
            }

        case 'TOGGLE_AMOUNT':
            let temp_cart = state.cart
                .map((cart_item) => {
                    if (cart_item.id === action.payload.id) {
                        if (action.payload.type === 'inc') {
                            return { ...cart_item, amount: cart_item.amount + 1 }
                        }
                        else if (action.payload.type === 'dec') {
                            return { ...cart_item, amount: cart_item.amount - 1 }
                        }
                    }
                    return cart_item
                })
                .filter((cart_item) => cart_item.amount !== 0)
            return { ...state, cart: temp_cart }

        default:
            throw new Error('No matching action type')
            break;
    }
}

export default reducer;