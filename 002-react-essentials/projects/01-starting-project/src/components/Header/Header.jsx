import reactImg from '../../assets/react-core-concepts.png';
import './Header.css';

const reactDescriptions = ['Fundamental', 'Crucial', 'Core'];

// Generate random number within the range of `max`
function genRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

// Add Header component
export default function Header(){
	// adding values dynamically
	const description = reactDescriptions[genRandomInt(2)]
	return (
		<header>
				<img src={reactImg} alt="Stylized atom" />
				<h1>React Essentials</h1>
				<p>
					{description} React concepts you will need for almost any app you are
					going to build!
				</p>
			</header>
	);
}