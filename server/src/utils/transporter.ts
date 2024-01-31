import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'../.env' });;

interface EmailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

// Create a transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || '',
    port: Number(process.env.EMAIL_PORT) || 0,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASS || '',
    },
} as EmailConfig);

export {
    transporter
}