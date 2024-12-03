import "./error.css";
export default function ErrorNotFoundPage() {
  return (
    <div id="error-not-found-page">
      <h1 className="mr">Oops!</h1>
      <p className="mr">Sorry, an unexpected error has occurred.</p>
      <p className="status mr">
        <i>Not Found-</i>
        <i>404</i>
      </p>
    </div>
  );
}
