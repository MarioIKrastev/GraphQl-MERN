export default function SignOut() {
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={onSubmit}>
        <p className="text-light m-0">Sign out</p>
      </button>
    </>
  );
}
