import { useContext } from "react";
import { AuthContext } from "./AuthContexts";

const useAuth = () => useContext(AuthContext);
export default useAuth;
