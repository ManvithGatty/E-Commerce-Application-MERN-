import { Link } from "react-router-dom";

function Error({ message }) {
  const is404 = !message;

  return (
    <div className="error-page">
      <h1>{is404 ? "404" : "⚠️"}</h1>
      <h2>{is404 ? "Page Not Found" : "Something went wrong"}</h2>
      <p>
        {is404
          ? "Oops! The page you're looking for doesn't exist."
          : message}
      </p>
      <Link to="/" className="error-home-link">
        Go to Home
      </Link>
    </div>
  );
}

export default Error;
