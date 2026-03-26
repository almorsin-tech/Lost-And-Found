import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import { useAuth } from "../AuthContext";

type Props = {
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

const HomeNavigationBar: React.FunctionComponent<Props> = ({ description, setDescription }) => {

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid">
        <div className="navbar-content">
          <input value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder="Search" />
          {user && <div className="">
            <button className="btn btn-primary me-2" onClick={() => navigate("/new-item")}>Submit an item</button>
            <button className="btn btn-danger" onClick={logout}>Log out</button>
          </div>}
          {!user && <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>}

        </div>
      </div>
    </>
  );
};

export default HomeNavigationBar;