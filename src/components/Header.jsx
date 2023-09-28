export default function Header() {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#333",
    color: "#fff",
  };

  const navStyle = {
    display: "flex",
    gap: "20px",
  };
  return (
    <header style={headerStyle}>
      <h1>Stranger's Things</h1>
      <nav style={navStyle}>
        <a href="/home" style={{ color: "#fff", textDecoration: "none" }}>
          Home
        </a>
        <a href="/posts" style={{ color: "#fff", textDecoration: "none" }}>
          Posts
        </a>
        <a href="/profile" style={{ color: "#fff", textDecoration: "none" }}>
          Profile
        </a>
        <a href="/login" style={{ color: "#fff", textDecoration: "none" }}>
          Login
        </a>
      </nav>
    </header>
  );
}
