import React, { useState } from 'react'
import styles from "./Payment.module.css"
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import qrImage from "../Images/imp2.png"; // Use an existing QR image from Images folder

import { UseCart } from "./CartContext";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfSiseRwoIA5TjsaIlW6D-3i-aqxHq_WsjDRNlMSy2TunVCDA/viewform?usp=header"; // Replace with your actual Google Form link

const Payment = () => {
    const [selectedMethod, setSelectedMethod] = useState("card");
    const [showPopup, setShowPopup] = useState(false);
    const { totalAmount } = UseCart();

    const handleMethodChange = (method) => {
        setSelectedMethod(method);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedMethod === "qr") {
            setShowPopup(true);
        }
        // Add further logic for other payment methods if needed
    };

    return (
        <div>
            {showPopup && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999
                }}>
                    <div style={{
                        background: "#fff",
                        padding: "2rem 2.5rem",
                        borderRadius: "12px",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                        textAlign: "center",
                        minWidth: "300px"
                    }}>
                        <h2 style={{marginBottom: "1rem"}}>Order Placed!</h2>
                        <p style={{marginBottom: "1.2rem"}}>Thank you for your purchase. Please fill out the Google Form to complete your order details.</p>
                        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer" style={{
                            display: "inline-block",
                            background: "#4285F4",
                            color: "#fff",
                            padding: "0.7rem 1.5rem",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontWeight: 500,
                            marginBottom: "1rem"
                        }}>Fill Google Form</a>
                        <br />
                        <button onClick={() => setShowPopup(false)} style={{
                            marginTop: "0.5rem",
                            padding: "0.5rem 1.2rem",
                            border: "none",
                            borderRadius: "4px",
                            background: "#eee",
                            cursor: "pointer"
                        }}>Close</button>
                    </div>
                </div>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles["checkout-method"]}>
                    <button
                        type="button"
                        className={`${styles.button} ${selectedMethod === "card" ? styles["button--active"] : ""
                            } ${styles["card-button"]}`}
                        onClick={() => handleMethodChange("card")}
                    >
                        <BsFillCreditCard2FrontFill />
                    </button>

                    <button
                        type="button"
                        className={`${styles.button} ${selectedMethod === "upi" ? styles["button--active"] : ""
                            } ${styles["upi-button"]}`}
                        onClick={() => handleMethodChange("upi")}
                    >
                        @UPI
                    </button>

                    <button
                        type="button"
                        className={`${styles.button} ${selectedMethod === "qr" ? styles["button--active"] : ""} ${styles["qr-button"]}`}
                        onClick={() => handleMethodChange("qr")}
                    >
                        QR
                    </button>
                </div>

                {selectedMethod === "card" && (
                    <div className={styles["checkout-information"]}>
                        <div className={styles["input-group"]}>
                            <label htmlFor="name">Name on card</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter name"
                                className={styles["card-name-input"]}
                            />
                        </div>

                        <div className={styles["input-group"]}>
                            <label htmlFor="number">Card number</label>
                            <input
                                type="text"
                                id="number"
                                placeholder=".... "
                                className={styles["card-number-input"]}
                            />
                        </div>

                        <div className={styles["horizontal-grid"]}>
                            <div className={styles["input-group"]}>
                                <label htmlFor="date">Expiration date</label>
                                <input
                                    type="text"
                                    id="date"
                                    placeholder="12/27"
                                    className={styles["expiration-date-input"]}
                                />
                            </div>

                            <div className={styles["input-group"]}>
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    type="number"
                                    id="cvv"
                                    placeholder="CVV"
                                    className={styles["cvv-input"]}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedMethod === "upi" && (
                    <div className={styles["checkout-information"]}>
                        <div className={styles["input-group"]}>
                            <label htmlFor="upi-id">UPI ID</label>
                            <input
                                type="text"
                                id="upi-id"
                                placeholder="Enter UPI ID"
                                className={styles["upi-id-input"]}
                            />
                        </div>
                    </div>
                )}

                {selectedMethod === "qr" && (
                    <div className={styles["checkout-information"]} style={{ textAlign: "center" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <img src={qrImage} alt="QR Code for Payment" style={{ width: "180px", height: "180px", objectFit: "contain" }} />
                        </div>
                        <div style={{ marginBottom: "0.5rem", fontWeight: 500, fontSize: "1.1rem" }}>
                            <span>Total Amount: </span>
                            <span style={{ color: "#388e3c", fontWeight: 700 }}>₹{totalAmount}</span>
                        </div>
                        <div style={{ marginBottom: "0.5rem", fontWeight: 500 }}>
                            Scan this QR code with your UPI app to pay directly.
                        </div>
                        <div style={{ fontSize: "0.95rem", color: "#555" }}>
                            After payment, click 'Pay Now' to confirm your order.
                        </div>
                    </div>
                )}

                <button
                    className={`${styles.button} ${styles["button--checkout"]} ${styles["checkout-button"]
                        }`}
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default Payment
