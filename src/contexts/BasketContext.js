import { message } from "antd";
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
            message.success({content: "Sepete Eklendi",key:"basket:item",duration: 2})
            return setItems((items) => [{ ...data, count: 1 }, ...items].sort((a, b) => a.productId > b.productId ? 1 : -1))
        }
        message.success({content: "Sepetten Kaldırıldı",key:"basket:item",duration: 2})
        removeFromBasket(findBasketItem.productId)
    }

    const removeFromBasket = (id) => {
        const filtered = items.filter((item) => item.productId !== id)
        setItems(filtered)
        message.success({content: "Sepetten Kaldırıldı",key:"basket:item",duration: 2})
    }

    const emptyBasket = () => {
        setItems([])
    }

    const handleIncrease = (data) => {
        setItems([
            {
                ...data, count: data.count + 1
            },
            ...items.filter((item) => item.productId != data.productId)
        ].sort((a, b) => a.productId > b.productId ? 1 : -1)
        )
    }

    const handleDecrease = (data) => {
        if (data.count > 1) {
            setItems([
                {
                    ...data, count: data.count - 1
                },
                ...items.filter((item) => item.productId != data.productId),
            ].sort((a, b) => a.productId > b.productId ? 1 : -1))
        }
        else {
            removeFromBasket(data.productId)
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