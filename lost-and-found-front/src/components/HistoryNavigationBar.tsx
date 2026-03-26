import { useNavigate } from "react-router-dom";
import "./NavigationBar.css";

type Props = {
  description: string,
  setDescription: React.Dispatch<React.SetStateAction<string>>,
  title: string
}

const HistoryNavigationBar: React.FunctionComponent<Props> = ({ description, setDescription, title }) => {

  const navigate = useNavigate();

  return (
    <>
      <div className="container-fluid">

        <div className="logo">
          <div className="bordered">
            History
          </div>
        </div>
        <div className="navbar-content">
          <button className="btn btn-primary" onClick={() => navigate("/")}>Take me back</button>

          <input value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder="Search" />


        </div>
      </div>
    </>
  );
};

export default HistoryNavigationBar;