import { createContext, useContext, useEffect, useState } from "react";

const BasketContext = createContext()

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || []

const BasketProvider = ({ children }) => {
    const [items, setItems] = useState(defaultBasket)

    useEffect(() => { 
        localStorage.setItem('basket',JSON.stringify(items))
    }, [items])

    const addToBasket = (data, findBasketItem) => {
        if (!findBasketItem) {
            return setItems((items) => [{ ...data, count: 1 }, ...items].sort((a, b) => a.id > b.id ? 1 : -1))
        }
        removeFromBasket(findBasketItem.id)
    }

    const removeFromBasket = (id) => {
        const filtered = items.filter((item) => item.id !== id)
        setItems(filtered)
    }

    const emptyBasket = () => {
        setItems([])
    }

    const handleIncrease = (data) => {
        setItems([
            {
                ...data, count: data.count + 1
            },
            ...items.filter((item) => item.id != data.id)
        ].sort((a, b) => a.id > b.id ? 1 : -1)
        )
    }

    const handleDecrease = (data) => {
        if (data.count > 1) {
            setItems([
                {
                    ...data, count: data.count - 1
                },
                ...items.filter((item) => item.id != data.id),
            ].sort((a, b) => a.id > b.id ? 1 : -1))
        }
        else {
            removeFromBasket(data.id)
        }
    }

    const values = {
        items,
        setItems,
        addToBasket,
        handleIncrease,
        handleDecrease,
        removeFromBasket,
        emptyBasket
    }

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}

const useBasket = () => useContext(BasketContext)

export { useBasket, BasketProvider, BasketContext }