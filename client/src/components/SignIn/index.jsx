import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#signInClientModal"
        onClick={() => navigate("/signin")}
      >
        <p className="text-light m-0">Sign In</p>
      </button>
    </>
  );
}
