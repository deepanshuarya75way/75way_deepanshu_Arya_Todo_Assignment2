import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { resetUser, selectAuth } from "../store/reducers/authSlice";
import { toast } from "react-toastify";
import { useLazyLogoutQuery, useLazyGetTodoQuery } from "../services/AuthApi";
import { useEffect } from "react";

const Logout = () => {
  const { user } = useAppSelector(selectAuth);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOutUser,{data, isError, isSuccess, error}] = useLazyLogoutQuery()
  

  useEffect(()=>{

    if(isSuccess){
      toast.success("User Logged Out");
      navigate("/auth")
    }else{
      console.log(error)
    }

  }, [isError, isSuccess])

  const handleLogout = async () => {
    await logOutUser();
    dispatch(resetUser());
    navigate("/auth");
  };
  return (
    <>
      <button className="btn btn-primary" onClick={() => handleLogout()}>
        Logout
      </button>
    </>
  );
};

export default Logout;