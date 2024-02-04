import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { resetUser, selectAuth } from "../store/reducers/authSlice";
import { toast } from "react-toastify";
import { useLazyLogoutQuery, useLazyGetTodoQuery } from "../services/AuthApi";
import { useEffect } from "react";
import { number } from "yup";

const Dashboard = () => {
  //get local storage
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOutUser, { data, isError, isSuccess, error }] = useLazyLogoutQuery()
  const [getTodo, { data: dataTodo, isError: isErrorTodo, isSuccess: isSuccessTodo, error: errorTodo }] = useLazyGetTodoQuery()

  useEffect(() => {
    if (isSuccess) {
      toast.success("User Logged Out");
      navigate("/auth")
    } else if(isError) {
      console.log(error)
    }

  }, [isError, isSuccess])

  useEffect(() => {
    if (isSuccessTodo) {
      console.log(dataTodo)
    } else if(isErrorTodo) {
      toast.error((errorTodo as any)?.data?.error)
    }
  }, [isSuccessTodo, isErrorTodo])

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

      <div>User: {user.name}</div>

      {user.role === "admin" && (
        <>
          <button className="btn btn-primary" onClick={() => navigate("/createTodo")}>
            Create Todo
          </button> <span>&nbsp;</span>
        </>
      )}

      <button className="btn btn-primary" onClick={() => navigate("/user")}>
        View Todo
      </button><span>&nbsp;</span>

      <button className="btn btn-primary" onClick={() => handleLogout()}>
        Logout
      </button><span>&nbsp;</span>


    </>
  );
};

export default Dashboard;