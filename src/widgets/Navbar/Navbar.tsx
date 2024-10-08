import { useState } from 'react';
import { navLinks } from '../../shared/consts/Navbar';

interface NavLink {
  id: number;
  name: string;
  href: string;
}

interface NavItemsProps {
  onClick?: () => void;
  onPlayGameClick: () => void; // New prop for the Play Game button
}

const NavItems: React.FC<NavItemsProps> = ({ onClick = () => {}, onPlayGameClick }) => (
  <ul className="nav-ul">
    {navLinks.map((item: NavLink) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
    {/* Add Play Game Button */}
    <li className="nav-li">
      <button
        onClick={onPlayGameClick}
        className="nav-li_a text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Play Game
      </button>
    </li>
  </ul>
);

interface NavbarProps {
  openGameModal: () => void; // Prop to open the game modal
}

const Navbar: React.FC<NavbarProps> = ({ openGameModal }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Eric's Portfolio
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems onPlayGameClick={openGameModal} />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} onPlayGameClick={openGameModal} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
