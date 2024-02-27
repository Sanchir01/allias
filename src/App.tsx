import { useState } from 'react'
import './App.css'

function App() {
	const [count, setCount] = useState(0)
	const inc = () => setCount(count + 1)

	return (
		<div className='text-black flex gap-10 items-center'>
			<button onClick={inc}>прибавить</button>
			{count}
			<button onClick={() => setCount(count - 1)}>Следующее слово</button>
		</div>
	)
}

export default App
