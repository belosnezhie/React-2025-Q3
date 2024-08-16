import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <>
      <header className="header">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/reactHookForm" className="link">
          React Hook Form
        </Link>
        <Link to="/uncontrolledForm" className="link">
          Uncontrolled Form
        </Link>
      </header>
    </>
  );
};

export default Header;
