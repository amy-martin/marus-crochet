import React from "react";

export const ContactUs = () => {
    return (
        <div className="contact-us">
            <h2>CONTACT US</h2>
            <p>If you have any questions, comments, or concerns, please feel free to contact us using any of the means listed below:</p>
            <div className="contact-info">
                <h3>Email</h3>
                <p><a href="mailto:customerservice@marucrochet.com">customerservice@marucrochet.com</a></p>
            </div>
            <div className="contact-info">
                <h3>Phone</h3>
                <p>+ 1 (800) 282-4094</p>
            </div>
            <div className="contact-info">
                <h3>Address</h3>
                <p>123 Main St<br/> Suite 456<br/> Anytown, USA 12345</p>
            </div>

        </div>

    )
}