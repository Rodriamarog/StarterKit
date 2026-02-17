import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

// Create transporter with Gmail SMTP
// You'll need to set these environment variables
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: env.GMAIL_USER, // your-email@gmail.com
		pass: env.GMAIL_APP_PASSWORD // Gmail app password (not your regular password)
	}
});

export async function sendVerificationEmail(email: string, token: string) {
	const verificationUrl = `${env.PUBLIC_APP_URL || 'http://localhost:5173'}/verify-email?token=${token}`;

	const mailOptions = {
		from: env.GMAIL_USER,
		to: email,
		subject: 'Verify your email address',
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #111827;">Verify your email address</h2>
				<p style="color: #4b5563; line-height: 1.6;">
					Thank you for creating an account. Please verify your email address by clicking the button below:
				</p>
				<a href="${verificationUrl}"
					 style="display: inline-block; background-color: #111827; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
					Verify Email
				</a>
				<p style="color: #6b7280; font-size: 14px;">
					Or copy and paste this link into your browser:<br>
					<a href="${verificationUrl}" style="color: #3b82f6;">${verificationUrl}</a>
				</p>
				<p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
					If you didn't create an account, you can safely ignore this email.
				</p>
			</div>
		`
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		console.error('Error sending verification email:', error);
		return { success: false, error };
	}
}

export async function sendPasswordResetEmail(email: string, token: string) {
	const resetUrl = `${env.PUBLIC_APP_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

	const mailOptions = {
		from: env.GMAIL_USER,
		to: email,
		subject: 'Reset your password',
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #111827;">Reset your password</h2>
				<p style="color: #4b5563; line-height: 1.6;">
					We received a request to reset your password. Click the button below to create a new password:
				</p>
				<a href="${resetUrl}"
					 style="display: inline-block; background-color: #111827; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
					Reset Password
				</a>
				<p style="color: #6b7280; font-size: 14px;">
					Or copy and paste this link into your browser:<br>
					<a href="${resetUrl}" style="color: #3b82f6;">${resetUrl}</a>
				</p>
				<p style="color: #ef4444; font-size: 14px; margin-top: 20px;">
					This link will expire in 1 hour.
				</p>
				<p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">
					If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.
				</p>
			</div>
		`
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		console.error('Error sending password reset email:', error);
		return { success: false, error };
	}
}

// Generic email sending function
export async function sendEmail(to: string, subject: string, html: string) {
	const mailOptions = {
		from: env.GMAIL_USER,
		to,
		subject,
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				${html}
			</div>
		`
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		console.error('Error sending email:', error);
		return { success: false, error };
	}
}
