import React, { useState } from 'react';
import axios from 'axios';
import { ServerName } from '../constants.js';

function Register() {
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [terms, setTerms] = useState(false);
	const [about, setAbout] = useState('');
	const [profile, setProfile] = useState();
	const [hidePassword, setHidePassword] = useState(true);
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

	console.log(profile);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!username || !fullName || !email || !password || !confirmPassword) {
			alert(' all fields are required...');
		}

		if (password !== confirmPassword) {
			alert('password and confirm password is not same..');
		}

		const formData = new FormData();

		formData.append('profile', profile);
		formData.append('username', username);
		formData.append('fullName', fullName);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('about', about);

		console.log(formData);

		const res = await axios.post(`${ServerName}/register`, formData);

		console.log(res);
	}

	return (
		<>
			<div>
				<input
					type="file"
					name="profile"
					id="profile"
					onChange={(e) => setProfile(e.target.files[0])}
				/>
				<textarea
					name="about"
					id="about"
					value={about}
					onChange={(e) => setAbout(e.target.value)}
				></textarea>
			</div>
			<div>
				<input
					type="text"
					name="username"
					id="username"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="text"
					name="fullName"
					id="fullName"
					placeholder="fullName"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
				/>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type={hidePassword ? 'password' : 'text'}
					name="password"
					id="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input
					type="submit"
					value="show"
					onClick={(e) => setHidePassword(!hidePassword)}
				/>
				<input
					type={hideConfirmPassword ? 'password' : 'text'}
					name="confirmPassword"
					id="confirmPassword"
					placeholder="confirm password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<input
					type="submit"
					value="show"
					onClick={(e) => setHideConfirmPassword(!hideConfirmPassword)}
				/>
				<input
					type="checkbox"
					name="terms"
					id="terms"
					value={terms}
					onChange={(e) => setTerms(e.target.checked)}
				/>
				<input type="submit" value="SignUp" onClick={handleSubmit} />
			</div>
		</>
	);
}

export default Register;
