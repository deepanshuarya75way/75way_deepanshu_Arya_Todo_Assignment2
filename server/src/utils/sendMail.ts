import nodemailer from "nodemailer";
import { transporter } from "./transporter";

export type Emailcontent = {
    subject: string
    text: string
}

const  sendMail = (email: string[], content:Emailcontent) => {
    var message = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: content.subject,
        html: content.text,
    }
    transporter.sendMail(message, function(err) {
        if (err) {
            console.log(err)
        }
    })
}

export  {
    sendMail
}