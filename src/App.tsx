import { useEffect, useState } from 'react'
import './App.css'
import { isEven } from './components/IsEven'
import { Button } from './components/ui/button'
import { mathTerms } from './constants/mathWords'

function App() {
	const [secondPlayerScore, setSecondPlayerScore] = useState(0)

	const [words, setWords] = useState(mathTerms)
	const [randomWord, setRandomWord] = useState<null | string>(null)

	const [seconds, setSeconds] = useState(0)
	const [isActive, setIsActive] = useState(false)
	const [firstPlayerScore, setFirstPlayerScore] = useState(0)
	const [playerTurn, setPlayerTurn] = useState(0)
	// const [modalOpen, setModalOpen] = useState<boolean>(false)

	useEffect(() => {
		let intervalId: number | undefined | NodeJS.Timeout
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

	const plusSecondPlayer = () => setSecondPlayerScore(prev => prev + 1)
	const plusFirstdPlayer = () => setFirstPlayerScore(prev => prev + 1)
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
	const handleStart = async () => {
		setPlayerTurn(prev => prev + 1)
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
		setSeconds(60)
		setIsActive(true)
	}

	const handleReset = () => {
		setPlayerTurn(0)
		setSecondPlayerScore(0)
		setFirstPlayerScore(0)
		setSeconds(0)
		setIsActive(false)
	}
	return (
		<div className='flex flex-col items-center justify-center w-screen min-h-screen gap-10 text-black'>
			<div className='flex gap-2'>
				<div className='flex flex-col items-center gap-1'>
					<div className=''>Игрок 1</div>
					<div className=''>{secondPlayerScore}</div>
				</div>
				<div className='flex flex-col items-center gap-1'>
					<div className=''>Игрок 2</div>
					<div className=''>{firstPlayerScore}</div>
				</div>
			</div>

			<div className='flex flex-col gap-2'>
				<p>Time: {seconds} sec</p>
				<Button onClick={handleStart}>Start</Button>
				<Button onClick={handleReset}>Reset</Button>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<p className='text-xl font-bold'>{randomWord}</p>
			</div>
			<div className='flex items-center gap-3'>
				<Button
					onClick={isEven(playerTurn) ? plusFirstdPlayer : plusSecondPlayer}
					disabled={seconds === 0}
				>
					прибавить
				</Button>
				{isEven(playerTurn) ? firstPlayerScore : secondPlayerScore}
				<Button onClick={getRandomWord}>следущее слово</Button>
			</div>
			{/* <Modal
				open={
					firstPlayerScore === 30 || (secondPlayerScore === 30 && modalOpen)
				}
				person={isEven(playerTurn) ? 1 : 2}
				setOpen={(false) => setModalOpen(false)}
			/> */}
		</div>
	)
}

export default App
