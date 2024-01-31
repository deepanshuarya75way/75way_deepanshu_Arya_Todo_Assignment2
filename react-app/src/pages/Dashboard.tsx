import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { resetUser, selectAuth } from "../store/reducers/authSlice";
import { toast } from "react-toastify";
import { useLazyLogoutQuery, useLazyGetTodoQuery } from "../services/AuthApi";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAppSelector(selectAuth);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOutUser,{data, isError, isSuccess, error}] = useLazyLogoutQuery()
  const [getTodo, {data: dataTodo, isError: isErrorTodo, isSuccess: isSuccessTodo, error: errorTodo}] = useLazyGetTodoQuery()

  useEffect(()=>{

    if(isSuccess){
      toast.success("User Logged Out");
      navigate("/auth")
    }else{
      console.log(error)
    }

  }, [isError, isSuccess])

  useEffect(() =>{
    if(isSuccessTodo){
      console.log(dataTodo)
    }else{
      toast.error((errorTodo as any)?.data?.error)
    }
  },[isSuccessTodo, isErrorTodo])
  const handleLogout = async () => {
    await logOutUser();
    dispatch(resetUser());
    navigate("/auth");
  };
  const handlereq = async () => {
    await getTodo()

  };
  return (
    <>
      <div>Dashboard</div>
      <button className="btn btn-primary" onClick={() => handleLogout()}>
        Logout
      </button>
      <button className="btn btn-primary" onClick={() => handlereq()}>
        getReq
      </button>
    </>
  );
};

export default Dashboard;