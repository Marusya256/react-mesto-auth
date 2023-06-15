import './../App.css';
import logoMesto from './../images/Logo.svg';

function Header() {
  return (
      <header className="header">
          <img className="logo"  src={logoMesto} alt="Логотип"/>
      </header>
  );
}

export default Header;
