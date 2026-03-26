import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    }

    return (
        <>
            <h1 style={{marginTop: '100px'}}>
                404 - Not Found
            </h1>
            <button onClick={goHome}>
                Home
            </button>
        </>
    );
}

export default NotFound;