import { useLocation, Navigate } from "react-router-dom";
import { UseAuth } from "../contexts/AuthContext";

export default function PrivateRoute({children}) {
  const { currentUser } = UseAuth();
  const location = useLocation();

  if(!currentUser){
    console.log("redirected")
    return <Navigate to = "/login" state = {{from: location}} replace></Navigate>
  }
  return children;
}
