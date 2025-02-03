import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth);
  const loading = false; // O usa un estado real si es necesario

  return { user, loading };
};

export default useAuth;
