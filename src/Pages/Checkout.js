import React, { useState } from 'react'
import classes from "./CheckOut.module.css"
import { useNavigate } from 'react-router-dom';
import { UseCart } from '../Components/CartContext';
import PopUp from '../Components/PopUp';
import Payment from '../Components/Payment';
const Checkout = () => {
    const [buttonPopup, SetButtonPopup] = useState(false);
    const navigate = useNavigate()
    const { totalAmount, item } = UseCart()
    const Delivery = 500;
    const totalPayment = totalAmount + Delivery
    const [values, setValues] = useState({
        fname: "",
        email: "",
        amount: totalPayment,
        address: "",
        zip: "",
    });

    const cart = () => {
        navigate("/cart")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const isPurchaseDisabled = !values.address.trim() || !values.zip.trim();

    return (
        <div className={classes.main}>
            <div className={classes.left}>
                <div className={classes.wrapper}>
                    <div className={classes.container}>
                        <h1 className={classes.title}>
                            <i className="fas fa-shipping-fast"></i>
                            Shipping Details
                        </h1>
                        <form action="" onSubmit={handleSubmit} className={classes.form}>
                            <div className={classes.name}>
                                <div>
                                    <label htmlFor="fname">First</label>
                                    <input type="text" name="fname" onChange={onChange} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" onChange={onChange} />
                                </div>
                            </div>
                            <div className={classes.street}>
                                <label htmlFor="name">Street</label>
                                <input type="text" name="address" value={values.address} onChange={onChange} />
                            </div>
                            <div className={classes.addressInfo}>
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" />
                                </div>
                                <div>
                                    <label htmlFor="state">State</label>
                                    <input type="text" name="state" />
                                </div>
                                <div>
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" name="zip" value={values.zip} onChange={onChange} />
                                </div>
                            </div>

                            <button className={classes.btns} onClick={() => SetButtonPopup(true)} disabled={isPurchaseDisabled} style={isPurchaseDisabled ? { opacity: 0.6, cursor: "not-allowed" } : {}}>Purchase</button>
                            <button className={classes.btns} onClick={cart} >Back to cart</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={classes.right}>
                <div className={classes.order}>
                    <h1>Order Summary</h1>
                    <div style={{ maxHeight: "220px", overflowY: "auto", marginBottom: "1rem" }}>
                        {item && item.length > 0 ? (
                            item.map((cartItem) => (
                                <div key={cartItem.id} style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
                                    <img src={cartItem.img} alt={cartItem.title} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, marginRight: 12, border: "1px solid #eee" }} />
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{cartItem.title}</div>
                                        <div style={{ fontSize: "0.95em", color: "#666" }}>x{cartItem.quantity}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: "#888", fontSize: "0.95em" }}>No items in cart.</div>
                        )}
                    </div>
                    <p>Sub total: &nbsp; &#8377;{totalAmount}</p>
                    <p>Delivery Charges:&nbsp;  &#8377;{Delivery}</p>
                    <hr />
                    <p>Total:&nbsp;  &#8377;{totalPayment}</p>
                </div>
            </div>

            {/* Pop-up Is here  */}
            <PopUp trigger={buttonPopup} setTrigger={SetButtonPopup}>
                <Payment />
            </PopUp>

        </div>


    )
}

export default Checkout
