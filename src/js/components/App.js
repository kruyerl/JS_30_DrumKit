import React from 'react'
import { link } from 'fs'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			drums: [
				{
					sound: 'boom',
					data: 1,
					kbd: 'q',
				},
				{
					sound: 'clap',
					data: 2,
					kbd: 'w',
				},
				{
					sound: 'hihat',
					data: 3,
					kbd: 'e',
				},
				{
					sound: 'kick',
					data: 4,
					kbd: 'a',
				},
				{
					sound: 'openhat',
					data: 5,
					kbd: 's',
				},
				{
					sound: 'ride',
					data: 6,
					kbd: 'd',
				},
				{
					sound: 'snare',
					data: 7,
					kbd: 'z',
				},
				{
					sound: 'tink',
					data: 8,
					kbd: 'x',
				},
				{
					sound: 'tom',
					data: 9,
					kbd: 'c',
				},
			],
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeydown)
		const drumArray = Array.from(document.querySelectorAll('.drum'))

		drumArray.forEach(key =>
			key.addEventListener('transitionend', this.removeTransition)
		)
	}
	handleClick = event => {
		let clicked = event.currentTarget
		let x = clicked.dataset.key
		this.playSound(x)
	}
	handleKeydown = event => {
		let keyPress = event.key
		keyPress = keyPress.toLowerCase()
		let x = this.state.drums.filter(drum => {
			return drum.kbd === event.key
		})
		let soundToPlay = x.length > 0 ? x[0].data : null
		try {
			this.playSound(soundToPlay)
		} catch {
			console.log('yikes that key isnt linked')
		}
	}
	playSound = sound => {
		let drumSelectKey = document.querySelector(`li[data-key="${sound}"]`)
		drumSelectKey.classList.add('playing')
		//select audio
		let audioSelectKey = document.querySelector(`audio[data-key="${sound}"]`)
		//set audio to 0
		audioSelectKey.currentTime = 0
		// play audio
		audioSelectKey.play()
	}
	removeTransition = e => {
		if (e.propertyName !== 'transform') return
		e.target.classList.remove('playing')
	}

	render() {
		const { drums } = this.state

		return (
			<React.Fragment>
				<h1>Drum Kit</h1>

				<ul>
					{drums.map(drum => (
						<li
							onClick={this.handleClick}
							className="drum"
							data-key={drum.data}
							index={drum.sound}
							key={drum.sound}
						>
							{drum.sound}
							<span>{drum.kbd}</span>
							<div className="keyBottom" />
						</li>
					))}
				</ul>
				<aside>
					<audio data-key="1" src={require('./../../assets/sounds/boom.wav')} />
					<audio data-key="2" src={require('./../../assets/sounds/clap.wav')} />
					<audio
						data-key="3"
						src={require('./../../assets/sounds/hihat.wav')}
					/>
					<audio data-key="4" src={require('./../../assets/sounds/kick.wav')} />
					<audio
						data-key="5"
						src={require('./../../assets/sounds/openhat.wav')}
					/>
					<audio data-key="6" src={require('./../../assets/sounds/ride.wav')} />
					<audio
						data-key="7"
						src={require('./../../assets/sounds/snare.wav')}
					/>
					<audio data-key="8" src={require('./../../assets/sounds/tink.wav')} />
					<audio data-key="9" src={require('./../../assets/sounds/tom.wav')} />
				</aside>
			</React.Fragment>
		)
	}
}
export default App
