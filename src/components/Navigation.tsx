const Navigation = () => {
  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="glass-soft px-3 py-2">
        <div className="flex items-center gap-2">
          <a href="#work" className="pill">Work</a>
          <a href="#about" className="pill">About</a>
          <a href="#contact" className="pill">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;