import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={classes.container + " center"}>
      <h2>404</h2>
      <h3>The page is not found</h3>
      <Link type="button" to="/">
        Return to Dashboard
      </Link>
    </div>
  );
}
