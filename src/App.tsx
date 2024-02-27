import { useEffect, useState } from 'react'
import './App.css'
import { mathTerms } from './constants/mathWords'

function App() {
	const [count, setCount] = useState(0)
	const inc = () => setCount(count + 1)
	const [words, setWords] = useState(mathTerms)
	const [randomWord, setRandomWord] = useState<null | string>(null)
	const getRandomWord = () => {
		if (words.length === 0) {
			setRandomWord('No more words')
		} else {
			const randomIndex = Math.floor(Math.random() * words.length)
			const word = words[randomIndex]
			setRandomWord(word)
			setWords(prevWords =>
				prevWords.filter((_, index) => index !== randomIndex)
			)
		}
	}
	const [seconds, setSeconds] = useState(0)
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		let intervalId: number | undefined
		if (isActive) {
			intervalId = setInterval(() => {
				if (seconds > 0) {
					setSeconds(prevSeconds => prevSeconds - 1)
				} else {
					setIsActive(false)
					clearInterval(intervalId)
					console.log('Timer has ended!')
					// Добавьте здесь код для выполнения действий по окончании таймера
				}
			}, 1000)
		}
		return () => clearInterval(intervalId)
	}, [seconds, isActive])

	const handleStart = () => {
		setSeconds(60)
		setIsActive(true)
	}

	const handleReset = () => {
		setSeconds(0)
		setIsActive(false)
	}
	return (
		<div className='text-black flex flex-col gap-10 items-center mx-auto w-screen'>
			<div className='flex flex-col gap-2'>
				<p>Time: {seconds} sec</p>
				<button onClick={handleStart}>Start</button>
				<button onClick={handleReset}>Reset</button>
			</div>
			<div className='flex flex-col gap-2 items-center'>
				<button onClick={getRandomWord}>Get Random Word</button>
				<p>{randomWord}</p>
			</div>
			<div className='flex gap-3 items-center'>
				<button onClick={inc}>прибавить</button>
				{count}
				<button onClick={() => setCount(count - 1)}>Следующее слово</button>
			</div>
		</div>
	)
}

export default App
