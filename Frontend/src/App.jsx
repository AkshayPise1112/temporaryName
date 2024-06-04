import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
	const submitbtn = async () => {
		console.log('hii');
		const res = await axios.post('http://localhost:8000/api/register', {});
		console.log(res);
	};

	return (
		<>
			<input type="submit" value="submit" onClick={submitbtn} />
		</>
	);
}

export default App;
