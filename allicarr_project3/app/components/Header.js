import Link from 'next/link';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Alien Recipe Generator</h1>
      <nav>
        <ul style={styles.navList}>
          <li>
            <Link href="/">
              <span style={styles.button}>Home</span> {/* Home button with span */}
            </Link>
          </li>
          <li>
            <Link href="/generate">
              <span style={styles.button}>Generate a New Recipe</span>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <span style={styles.button}>Search Recipes</span>
            </Link>
          </li>
          <li>
            <Link href="/recipes">
              <span style={styles.button}>View All Recipes</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
  },
  navList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    gap: '1rem',
  },
  button: {
    textDecoration: 'none',
    backgroundColor: '#388e3c',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    fontSize: '1rem',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer', // Added to indicate clickable behavior
  },
};

export default Header;
