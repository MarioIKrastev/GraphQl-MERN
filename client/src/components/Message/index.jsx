export default function Message({ path }) {
  const url = !path ? "/" : path;

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 flex-column">
      <p className="text-danger fs-3 m-0 fw-bold mb-5">Something went wrong</p>
      <div className="d-flex flex-row gap-4">
        <a href={url} className="btn btn-dark">
          <p className="text-light m-0 fs-6">Reload</p>
        </a>
        <a href="/" className="btn btn-dark ">
          <p className="text-light m-0 fs-6">Home</p>
        </a>
      </div>
    </div>
  );
}
