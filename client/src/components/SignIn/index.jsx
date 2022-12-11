import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <>
      <Link className="btn btn-info" to="signin">
        <p className="text-light m-0">Sign In</p>
      </Link>
    </>
  );
}
