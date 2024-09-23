import headerTitle from '../images/header__title.png';

function Header() {
    return (
        <header className="header">
             <img src={headerTitle} alt="header-title" className="header__title" />
        </header>
    );
}

export default Header;