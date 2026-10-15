import { useEffect, useState } from "react";

import Header from "./components/header";
import Home from "./components/home";
import Footer from "./components/footer";
import { formatPrice } from "./components/format";

const CART_KEY = "starbucks-cart";

function loadCart() {
    try {
        const saved =
            localStorage.getItem(CART_KEY);

        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

function App() {
    const [cart, setCart] =
        useState(loadCart);

    const [cartOpen, setCartOpen] =
        useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(
                CART_KEY,
                JSON.stringify(cart)
            );
        } catch {
            // armazenamento indisponível: ignora
        }
    }, [cart]);

    useEffect(() => {
        if (!cartOpen) {
            return;
        }

        function handleKey(event) {
            if (event.key === "Escape") {
                setCartOpen(false);
            }
        }

        window.addEventListener("keydown", handleKey);

        return () =>
            window.removeEventListener(
                "keydown",
                handleKey
            );
    }, [cartOpen]);

    function addToCart(product) {
        if (!product) {
            return;
        }

        setCart((currentCart) => {
            const existing =
                currentCart.find(
                    (item) =>
                        item.id === product.id
                );

            if (existing) {
                return currentCart.map(
                    (item) =>
                        item.id === product.id
                            ? {
                                ...item,
                                quantity:
                                    item.quantity + 1
                            }
                            : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    }

    function removeFromCart(id) {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity:
                                item.quantity - 1
                        }
                        : item
                )
                .filter(
                    (item) =>
                        item.quantity > 0
                )
        );
    }

    const cartCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartTotal =
        cart.reduce(
            (total, item) =>
                total +
                item.price *
                item.quantity,
            0
        );

    return (
        <>
            <Header
                cartCount={cartCount}
                onCartClick={() =>
                    setCartOpen(true)
                }
            />

            <Home
                onAddToCart={addToCart}
            />

            <Footer />

            {cartOpen && (
                <>
                    <div
                        className="cart-overlay"
                        onClick={() =>
                            setCartOpen(false)
                        }
                    />

                    <aside className="cart">

                        <div className="cart-header">

                            <h2>
                                Seu pedido
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    setCartOpen(false)
                                }
                            >
                                ×
                            </button>

                        </div>

                        {cart.length === 0 ? (

                            <div className="empty-cart">

                                <span>
                                    🛒
                                </span>

                                <p>
                                    Seu carrinho está vazio.
                                </p>

                            </div>

                        ) : (

                            <>

                                <div className="cart-items">

                                    {cart.map(
                                        (item) => (
                                            <div
                                                className="cart-item"
                                                key={item.id}
                                            >

                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                />

                                                <div>

                                                    <h3>
                                                        {item.name}
                                                    </h3>

                                                    <p>
                                                        {formatPrice(item.price)}
                                                    </p>

                                                    <div className="quantity">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeFromCart(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>

                                                        <span>
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                addToCart(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                                <div className="cart-footer">

                                    <div className="cart-total">

                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            {formatPrice(cartTotal)}
                                        </strong>

                                    </div>

                                    <button
                                        type="button"
                                        className="checkout-button"
                                        onClick={() =>
                                            alert(
                                                "Checkout será implementado posteriormente."
                                            )
                                        }
                                    >
                                        FINALIZAR PEDIDO
                                    </button>

                                </div>

                            </>
                        )}

                    </aside>
                </>
            )}

        </>
    );
}

export default App;
