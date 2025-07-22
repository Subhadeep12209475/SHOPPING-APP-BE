// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });
// (async () => {
//     try {
//         await transporter.verify();
//         console.log("-------- MAIL Server is ready! -----------");
//     } catch (err) {
//         console.log("-------- ❌ MAIL Server is Error! -----------");
//         console.log(err.message);
//     }
// })();

// const sendOtpMail = async (email, otp) => {
//     console.log("--> inside sendOtpMail", email, otp);
//     try {
//         await transporter.sendMail({
//             from: '"Subify" <rounakmukherjee2020@gmail.com>', // sender address
//             to: email, // list of receivers
//             subject: "Otp Verification for login", // Subject line
//             html: `
//                 <html>
//                     <head>
//                         <style>
//                             main{
//                                 height: 500px;
//                                 width: 500px;
//                                 margin: auto;
//                                 display: flex;
//                                 align-items: center;
//                                 justify-content: center;
//                                 background-color: black;
//                                 color: white;
//                                 font-size: 28px;
//                             }
//                         </style>
//                     </head>
//                     <body>
//                         <main>
//                             <h2>Your otp is: ${otp}</h2>
//                         </main>
//                     </body>
//                 </html>
//             `,
//         });
//         console.log("---> email sent!");
//     } catch (err) {
//         console.log("------------ 🔴 Could not send email", err.message);
//         throw "Error in sending Email!";
//     }
// };

// module.exports = { sendOtpMail };


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verify mail server once during server start
(async () => {
    try {
        await transporter.verify();
        console.log("-------- MAIL Server is ready! -----------");
    } catch (err) {
        console.log("-------- ❌ MAIL Server Error! -----------");
        console.log(err.message);
    }
})();

// OTP Mail Function
const sendOtpMail = async (email, otp) => {
    console.log("--> inside sendOtpMail", email, otp);
    try {
        await transporter.sendMail({
            from: '"Subify Store" <rounakmukherjee2020@gmail.com>',
            to: email,
            subject: "🔐 Your OTP for Login - Subify Store",
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                        <div style="max-width: 600px; margin: 20px auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">

                            <h2 style="color: #4CAF50; text-align: center;">Welcome to Subify Store!</h2>
                            <p>Hello,</p>
                            <p>To complete your login or verification process, please use the following One Time Password (OTP):</p>

                            <div style="background-color: #f2f2f2; border: 2px dashed #4CAF50; text-align: center; padding: 20px; font-size: 36px; font-weight: bold; letter-spacing: 4px; margin: 20px 0; color: #333;">
                                ${otp}
                            </div>

                            <p style="color: #FF5722; font-weight: bold;">
                                Note: This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.
                            </p>

                            <p>If you did not request this OTP, please ignore this email or contact our support team immediately.</p>

                            <hr style="margin: 30px 0;" />

                            <p style="font-size: 12px; color: #aaa; text-align: center;">
                                &copy; ${new Date().getFullYear()} Subify Store. All rights reserved.
                            </p>
                        </div>
                    </body>
                </html>
            `,
        });
        console.log("---> OTP email sent!");
    } catch (err) {
        console.log("------------ 🔴 Could not send OTP email", err.message);
        throw "Error in sending OTP Email!";
    }
};


// Order Confirmation Mail Function
const sendOrderConfirmationEmail = async (email, orderDetails) => {
    console.log("--> inside sendOrderConfirmationEmail", email);
    try {
        await transporter.sendMail({
            from: '"Subify Store" <rounakmukherjee2020@gmail.com>',
            to: email,
            subject: "🛒 Your Order Confirmation - Subify Store",
            html: `
                <html>
                    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333;">
                        <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
                            <h2 style="color: #4CAF50;">Thank You for Your Order!</h2>
                            <p>Your order has been successfully placed.</p>
                            <p><strong>Total Amount:</strong> ₹${orderDetails.grandTotal}</p>
                            <p><strong>Payment Mode:</strong> ${orderDetails.paymentMode}</p>
                            <p><strong>Delivery Address:</strong> ${orderDetails.address}</p>
                            <p>We’ll notify you when your items are shipped.</p>
                            <p style="margin-top: 30px;">Warm Regards,<br/>Subify Store</p>
                        </div>
                    </body>
                </html>
            `,
        });
        console.log("---> Order Confirmation email sent!");
    } catch (err) {
        console.log("------------ 🔴 Could not send order confirmation email", err.message);
        throw "Error in sending Order Confirmation Email!";
    }
};

module.exports = {
    sendOtpMail,
    sendOrderConfirmationEmail   // Export the new function
};
