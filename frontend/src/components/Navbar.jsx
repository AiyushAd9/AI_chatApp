import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#1f1f1f",
        color: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)"
      }}
    >
      <h2>AI Chat App</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={() => navigate("/home")}
          style={buttonStyle}
        >
          Home
        </button>

        <button
          onClick={logout}
          style={buttonStyle}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

const buttonStyle = {
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  background: "#4cafef",
  color: "white",
  cursor: "pointer"
};

export default Navbar;