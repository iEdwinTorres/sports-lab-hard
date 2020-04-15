// Deafault App component that all other compents are rendered through
function Team(props) {
	let shotPercentageDiv;

	if (props.stats.shots) {
		const shotPercentage = Math.round((props.stats.score / props.stats.shots) * 100);
		shotPercentageDiv = (
			<div>
				<strong>Shooting %: {shotPercentage}</strong>
			</div>
		);
	}

	return (
		<div className="Team">
			<h2>{props.name}</h2>

			<div className="identity">
				<img src={props.logo} alt={props.name} />
			</div>

			<div>
				<strong>Shots: {props.stats.shots}</strong>
			</div>

			<div>
				<strong>Score: {props.stats.score}</strong>
			</div>

			{shotPercentageDiv}

			<button onClick={props.shotHandler}>Shoot!</button>
		</div>
	);
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			resetCount: 0,
			homeTeamStats: {
				shots: 0,
				score: 0,
			},
			visitingTeamStats: {
				shots: 0,
				score: 0,
			},
		};
		this.shotSound = new Audio("./assets/audio/smb_fireball.wav");
		this.scoreSound = new Audio("./assets/audio/smb_1-up.wav");
	}

	shoot = (team) => {
		const teamStatKey = `${team}TeamStats`;
		let score = this.state[teamStatKey].score;
		this.shotSound.play();

		if (Math.random() > 0.5) {
			score += 1;

			setTimeout(() => {
				this.scoreSound.play();
			}, 300);
		}

		this.setState((state, props) => ({
			[teamStatKey]: {
				shots: state[teamStatKey].shots + 1,
				score,
			},
		}));
	};

	resetGame = () => {
		this.setState((state, props) => ({
			resetCount: state.resetCount + 1,
			homeTeamStats: {
				shots: 0,
				score: 0,
			},
			visitingTeamStats: {
				shots: 0,
				score: 0,
			},
		}));
	};

	render() {
		return (
			<div className="Game">
				<h1>Welcome to {this.props.venue}</h1>
				<div className="stats">
					<Team
						name={this.props.visitingTeam.name}
						logo={this.props.visitingTeam.logoSrc}
						stats={this.state.visitingTeamStats}
						shotHandler={() => this.shoot("visiting")}
					/>
					<div>
						<h1>VS</h1>
						<div>
							<strong>Resets: {this.state.resetCount}</strong>
							<button onClick={this.resetGame}>Reset Game</button>
						</div>
					</div>
					<Team
						name={this.props.homeTeam.name}
						logo={this.props.homeTeam.logoSrc}
						stats={this.state.homeTeamStats}
						shotHandler={() => this.shoot("home")}
					/>
				</div>
			</div>
		);
	}
}

function App(props) {
	const pacers = {
		name: "Indiana Pacers",
		logoSrc: "./assets/images/pacers.png",
	};

	const raptors = {
		name: "Toronto Raptors",
		logoSrc: "./assets/images/raptors.png",
	};

	const lakers = {
		name: "L.A. Lakers",
		logoSrc: "./assets/images/lakers.png",
	};

	const bulls = {
		name: "Chicago Bulls",
		logoSrc: "./assets/images/bulls.png",
	};

	return (
		<div className="App">
			<Game venue="Bankers Life Fieldhouse" homeTeam={pacers} visitingTeam={raptors} />

			<Game venue="The Staples Center" homeTeam={lakers} visitingTeam={bulls} />
		</div>
	);
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
