import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { selectAuth } from "../store/reducers/authSlice";

// @ts-ignore
const Protected = ({ Components, url, role }) => {
    function getCookie() {
        var arrayb = document.cookie.split(";");
        for (const item of arrayb) {
          if (item.startsWith("access_token")){
              return item.substr(6);
          }
        }
      }
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate()
  async function getToken() {
    try {
      const token = getCookie();
      if (token && role.includes(user.role)) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  useEffect(() => {
    getToken().then((res) => {
      if (!res) {
        navigate("/auth/login");
      } else {
        navigate(url);
      }
    });
  }, []);
  return (<>{Components}</>);
};
export default Protected;