import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

const Header = () => {
  const headerStyle = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-20px)' },
    config: { tension: 180, friction: 12 },
  });

  const buttonAnimation = useSpring({
    scale: 1,
    from: { scale: 0.95 },
    config: { tension: 200, friction: 12 },
  });

  const interactiveButton = useSpring({
    to: {
      scale: 1.05,
      rotate: '5deg',
    },
    from: {
      scale: 1,
      rotate: '0deg',
    },
    config: { tension: 180, friction: 14 },
  });

  return (
    <animated.header style={headerStyle} className="bg-green-500 text-white py-4 px-8 flex justify-between items-center relative">
      {/* Circular background image */}
      <div className="absolute w-80 h-80 rounded-full bg-cover bg-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundImage: "public/aliens.jpg" }}></div>

      <h1 className="text-4xl font-bold font-Doto tracking-wide z-10">
        Alien Recipe Generator
      </h1>

      <nav className="z-10">
        <ul className="list-none m-0 p-0 flex gap-4">
          <li>
            <Link href="/">
              <animated.span
                style={buttonAnimation}
                className="bg-green-700 text-white py-2 px-4 rounded-md text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                Home
              </animated.span>
            </Link>
          </li>
          <li>
            <Link href="/generate">
              <animated.span
                style={interactiveButton}
                className="bg-green-700 text-white py-2 px-4 rounded-md text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                Generate a New Recipe
              </animated.span>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <animated.span
                style={interactiveButton}
                className="bg-green-700 text-white py-2 px-4 rounded-md text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                Search Recipes
              </animated.span>
            </Link>
          </li>
          <li>
            <Link href="/recipes">
              <animated.span
                style={interactiveButton}
                className="bg-green-700 text-white py-2 px-4 rounded-md text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                View All Recipes
              </animated.span>
            </Link>
          </li>
        </ul>
      </nav>
    </animated.header>
  );
};

export default Header;

