import { useSpring, animated } from '@react-spring/web';
import Link from 'next/link';

const HomePage = () => {
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
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold font-Doto tracking-wide">
        Welcome to the Alien Recipe Generator!
      </h1>
      <p className="mt-4 text-lg">
        Ever wondered what aliens eat? Discover unique and fun recipes from across the galaxy!
        Generate your own recipe, search through the archives, or explore the full collection.
      </p>

      <div
        className="mt-8 relative w-full h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'public/aliens.jpg', 
        }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="text-center">
            <Link href="/generate">
              <animated.span
                style={interactiveButton}
                className="inline-block py-3 px-6 m-2 bg-green-700 text-white rounded-lg text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                Generate a New Recipe
              </animated.span>
            </Link>

            <Link href="/search">
              <animated.span
                style={interactiveButton}
                className="inline-block py-3 px-6 m-2 bg-green-700 text-white rounded-lg text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                Search Recipes
              </animated.span>
            </Link>

            <Link href="/recipes">
              <animated.span
                style={interactiveButton}
                className="inline-block py-3 px-6 m-2 bg-green-700 text-white rounded-lg text-lg shadow-md cursor-pointer hover:bg-green-800 transition duration-300 ease-in-out"
              >
                View All Recipes
              </animated.span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

