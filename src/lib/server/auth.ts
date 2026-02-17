import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import db from './db';

export interface User {
	id: number;
	email: string;
	password_hash: string;
	email_verified: number;
	verification_token: string | null;
	created_at: string;
	subscription_tier: 'free' | 'pro' | 'business';
	stripe_customer_id: string | null;
	stripe_subscription_id: string | null;
	subscription_status: string | null;
	subscription_updated_at: string | null;
}

export interface Session {
	id: string;
	user_id: number;
	expires_at: string;
	created_at: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
	return bcrypt.hash(password, 10);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}

// Create user
export async function createUser(email: string, password: string): Promise<User | null> {
	try {
		const passwordHash = await hashPassword(password);
		const stmt = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
		const result = stmt.run(email, passwordHash);

		const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid) as User;
		return user;
	} catch (error) {
		// Email already exists or other error
		return null;
	}
}

// Get user by email
export function getUserByEmail(email: string): User | null {
	const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
	return stmt.get(email) as User | null;
}

// Get user by ID
export function getUserById(id: number): User | null {
	const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
	return stmt.get(id) as User | null;
}

// Create session
export function createSession(userId: number): Session {
	const sessionId = randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

	const stmt = db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)');
	stmt.run(sessionId, userId, expiresAt.toISOString());

	const session = db.prepare('SELECT * FROM sessions WHERE id = ?').get(sessionId) as Session;
	return session;
}

// Get session
export function getSession(sessionId: string): Session | null {
	const stmt = db.prepare("SELECT * FROM sessions WHERE id = ? AND expires_at > datetime('now')");
	return stmt.get(sessionId) as Session | null;
}

// Delete session
export function deleteSession(sessionId: string): void {
	const stmt = db.prepare('DELETE FROM sessions WHERE id = ?');
	stmt.run(sessionId);
}

// Clean up expired sessions
export function cleanupExpiredSessions(): void {
	const stmt = db.prepare("DELETE FROM sessions WHERE expires_at <= datetime('now')");
	stmt.run();
}

// Verify login
export async function verifyLogin(email: string, password: string): Promise<User | null> {
	const user = getUserByEmail(email);
	if (!user) {
		return null;
	}

	const valid = await verifyPassword(password, user.password_hash);
	if (!valid) {
		return null;
	}

	return user;
}

// Generate verification token
export function generateVerificationToken(): string {
	return randomBytes(32).toString('hex');
}

// Set verification token for user
export function setVerificationToken(userId: number, token: string): void {
	const stmt = db.prepare('UPDATE users SET verification_token = ? WHERE id = ?');
	stmt.run(token, userId);
}

// Verify email with token
export function verifyEmail(token: string): boolean {
	const stmt = db.prepare('UPDATE users SET email_verified = 1, verification_token = NULL WHERE verification_token = ?');
	const result = stmt.run(token);
	return result.changes > 0;
}

// Get user by verification token
export function getUserByVerificationToken(token: string): User | null {
	const stmt = db.prepare('SELECT * FROM users WHERE verification_token = ?');
	return stmt.get(token) as User | null;
}

// Generate password reset token
export function generateResetToken(): string {
	return randomBytes(32).toString('hex');
}

// Set password reset token for user
export function setResetToken(email: string, token: string): boolean {
	const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
	const stmt = db.prepare('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?');
	const result = stmt.run(token, expiresAt.toISOString(), email);
	return result.changes > 0;
}

// Get user by reset token
export function getUserByResetToken(token: string): User | null {
	const stmt = db.prepare("SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > datetime('now')");
	return stmt.get(token) as User | null;
}

// Reset password with token
export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
	const user = getUserByResetToken(token);
	if (!user) {
		return false;
	}

	const passwordHash = await hashPassword(newPassword);
	const stmt = db.prepare('UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?');
	const result = stmt.run(passwordHash, user.id);
	return result.changes > 0;
}

// Get user by Stripe customer ID
export function getUserByStripeCustomerId(customerId: string): User | null {
	const stmt = db.prepare('SELECT * FROM users WHERE stripe_customer_id = ?');
	return stmt.get(customerId) as User | null;
}

// Update user subscription
export function updateUserSubscription(
	userId: number,
	tier: 'free' | 'pro' | 'business',
	stripeCustomerId: string | null,
	stripeSubscriptionId: string | null,
	status: string | null
): boolean {
	const stmt = db.prepare(`
		UPDATE users
		SET subscription_tier = ?,
		    stripe_customer_id = ?,
		    stripe_subscription_id = ?,
		    subscription_status = ?,
		    subscription_updated_at = datetime('now')
		WHERE id = ?
	`);
	const result = stmt.run(tier, stripeCustomerId, stripeSubscriptionId, status, userId);
	return result.changes > 0;
}
