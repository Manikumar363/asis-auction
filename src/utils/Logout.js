// apiCall.js
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";

export const LogOut = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logOut());
  };

  // Call the logout function here
  handleLogout();
};
