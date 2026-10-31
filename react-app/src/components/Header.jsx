import { useState } from 'react';
export default function Header({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [{id:'portfolio',label:'Portfolio'},{id:'components',label:'Components'},{id:'blog',label:'Blog UI'}];
  function go(id) { onNavigate(id); setMenuOpen(false); }
  return <header className="header">
    <a className="logo" href="#top" onClick={e => {e.preventDefault(); go('portfolio')}}>S<span>.</span> Dev</a>
    <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
    <nav className={menuOpen ? 'nav open' : 'nav'}>
      {links.map(link => <button key={link.id} className={activePage === link.id ? 'nav-link active' : 'nav-link'} onClick={() => go(link.id)}>{link.label}</button>)}
    </nav>
  </header>;
}
