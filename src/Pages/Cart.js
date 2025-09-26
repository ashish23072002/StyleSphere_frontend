import React, { useContext } from 'react'
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom'
import { Scrollbars } from "react-custom-scrollbars-2"
import Items from '../Components/Items';
import ProductSlider from '../Components/ProductSlider';
import { UseCart } from '../Components/CartContext';
import styles from './Cart.module.css';
import { UserContext } from '../App';
const Cart = () => {
    const { _id } = useContext(UserContext);
    const navigate = useNavigate()
    const { item, clearCart, totalItem, totalAmount } = UseCart()

    const handleReturn = () => {
        navigate("/")
    }

    const forward = () => {
        if (_id) {
            navigate("/checkout")
        } else {
            navigate("/login")
        }

    }

    if (item.length === 0) {
        return (
            <div className={styles.body}>
                <header className={styles.header}>
                    <div className={styles.continueShopping}>
                        <AiOutlineArrowLeft className={styles.arrowIcon} onClick={handleReturn} />
                        <h3>Continue Shopping</h3>
                    </div>
                    <div className={styles.cartIcon}>
                        <AiOutlineShoppingCart className={styles.img} />
                        <p>{totalItem}</p>
                    </div>
                </header>

                <section className={styles.mainCartSection}>
                    <h1>Shopping Cart</h1>
                    <p className={styles.totalItems}>You have {totalItem} items in shopping cart</p>
                    <div style={{marginTop: "2rem", color: "#888", fontSize: "1.1rem", textAlign: "center"}}>
                        Your cart is empty. <br />
                        <span style={{color: "#1976d2", fontWeight: 500}}>Add some products to your cart to get started!</span>
                    </div>
                    <div style={{marginTop: "2.5rem"}}>
                        <div style={{
                            textAlign: "center",
                            fontWeight: 600,
                            fontSize: "1.15rem",
                            marginBottom: "1rem",
                            color: "#333"
                        }}>
                            Suggestions for you
                        </div>
                        <ProductSlider />
                    </div>
                </section>
            </div>
        )
    }
    return (
        <div className={styles.body}>
            <header>
                <div className={styles.continueShopping}>
                    <AiOutlineArrowLeft className={styles.arrowIcon} onClick={handleReturn} />
                    <h3>Continue Shopping</h3>
                </div>
                <div className={styles.cartIcon}>
                    <AiOutlineShoppingCart className={styles.img} />
                    <p>{totalItem}</p>
                </div>
            </header>

            <section className={styles.mainCartSection}>
                <h1>Shopping Cart</h1>
                <p className={styles.totalItems}>You have {totalItem} items in shopping cart</p>

                <div className={styles.cartItems}>
                    <div className={styles.cartItemsContainer}>
                        <Scrollbars >
                            {
                                item.map((curItem) => {
                                    return <Items key={curItem.id}  {...curItem} />
                                })
                            }

                        </Scrollbars>
                    </div>
                </div>
                <div className={styles.cardTotal}>
                    <h3>Cart Total: {totalAmount} Rs</h3>
                    <button className={styles.button} onClick={forward}>Checkout</button>
                    <button className={styles.clearCart} onClick={clearCart}>Clear Cart</button>
                </div>
            </section>
        </div >
    )
}

export default Cart
