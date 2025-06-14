'use client';

import pbclient from "@/lib/db";
import { createContext, useContext, useState, useEffect } from "react"

const authContext = createContext({});

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState(pbclient.authStore.record);
	const [loading, setLoading] = useState(true);

	// Initialize authentication state
	useEffect(() => {
		// Set initial user state
		setUser(pbclient.authStore.record);
		setLoading(false);

		// Listen for auth changes
		const unsubscribe = pbclient.authStore.onChange((token, record) => {
			setUser(record);
		});

		return unsubscribe;
	}, []);

	async function Login(emailOrUsername, password, role) {
		try {
			if (emailOrUsername !== '' || emailOrUsername !== null) {
				const identity = emailOrUsername;
				const res = await pbclient.collection('users').authWithPassword(identity, password);
				if (role === res.record.role) {
					setUser(res.record);
					return res;
				} else {
					alert("Role don't match")
				}
			} else {
				console.error("Email or Username must not be empty!!!");
			}
		} catch (err) {
			console.error(err);
		}
	}

	async function Register(email, username, password, passwordConfirm, role) {
		try {
			const data = {
				"email": email,
				"emailVisibility": true,
				"username": username,
				"password": password,
				"passwordConfirm": passwordConfirm,
				"role": role
			};
			const res = await pbclient.collection('users').create(data);
			return res;
		} catch (err) {
			throw new Error(err)
		}
	}

	async function Logout() {
		try {
			pbclient.authStore.clear();
			setUser(null);
			localStorage.removeItem('pocketbase_auth');
			localStorage.removeItem('record');
			localStorage.removeItem('role');
			localStorage.removeItem('rememberMe');
		} catch (err) {
			console.error(err);
		}
	}

	const value = {
		user,
		loading,
		Login,
		Logout,
		Register
	};

	return (
		<authContext.Provider value={value}>
			{children}
		</authContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthLayoutProvider')
	}
	return context;
} 
