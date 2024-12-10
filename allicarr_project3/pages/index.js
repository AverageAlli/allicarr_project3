import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to the Alien Recipe Generator!</h1>
      <p>
        Ever wondered what aliens eat? Discover unique and fun recipes from across the galaxy!
        Generate your own recipe, search through the archives, or explore the full collection.
      </p>
      
      <div style={{ marginTop: '2rem' }}>
        <Link href="/generate">
          <span style={styles.button}>Generate a New Recipe</span> {/* Use <span> instead of <a> */}
        </Link>
        <Link href="/search">
          <span style={styles.button}>Search Recipes</span> {/* Use <span> instead of <a> */}
        </Link>
        <Link href="/recipes">
          <span style={styles.button}>View All Recipes</span> {/* Use <span> instead of <a> */}
        </Link>
      </div>
    </div>
  );
};

const styles = {
  button: {
    display: 'inline-block',
    margin: '0.5rem',
    padding: '1rem 2rem',
    textDecoration: 'none',
    backgroundColor: '#4caf50',
    color: 'white',
    borderRadius: '8px',
    fontSize: '1.2rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
};

export default HomePage;