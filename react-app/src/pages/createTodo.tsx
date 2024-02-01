
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useCreateTodoMutation } from "../services/TodoApi";
import { useLazyGetRoleQuery } from "../services/AuthApi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import "bootstrap/dist/css/bootstrap.css";
type CreateTodoFields = {
    title: string;
    body: string;
    assignedTo: string;
    priority: 'High' | 'Medium' | 'Low';
    deadline: Date | null;
};


const initialState = {
    title: "",
    body: "",
    assignedTo: "",
    priority: "",
    deadline: null
};
const CreateTodo = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState(initialState);
    const { title, body, assignedTo, priority, deadline } = formValues;
    const [
        createTodo,
        {
          data: createTodoData,
          isSuccess: createTodoSuccess,
          isError: createTodoIsError,
          error: createTodoError,
        },
      ] = useCreateTodoMutation();

      const [
        getRole,
        {
          data: getRoleData,
          isSuccess: getRoleIsSuccess,
          isError: getRoleIsError,
          error: getRoleError,
        },
      ] = useLazyGetRoleQuery();
    // const dispatch = useAppDispatch()
    const schema = yup.object({
        assignedTo: yup
            .string()
            .email("enter valid email")
            .min(1, "email can't be empty")
            .required("Field required"),
        title: yup
            .string()
            .min(1, "Field can't be empty")
            .min(1, "invalid length")
            .required("Field required"),
        priority: yup
            .string()
            .oneOf(['High', 'Medium', 'Low'], 'Invalid priority')
            .required('Priority is required'),
        deadline: yup
            .date()
            .min(new Date(), 'Deadline must be in the future')
            .required('Deadline is required')
            .nullable(),
        body: yup
            .string()
            .min(1, "Field can't be empty")
            .min(1, "invalid length")
            .required("Field required"),

    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTodoFields>({ resolver: yupResolver(schema) });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    useEffect(() => {
        if (createTodoSuccess) {
            const { user } = createTodoData
            console.log(user)
            toast.success("Todo created successfully");
            navigate("/dashboard");
        }
        else if (createTodoIsError) {
            toast.error((createTodoError as any)?.data.error)
        }

    }, [createTodoSuccess, createTodoIsError]);

   

    // useEffect(()=>{
    //     const asF = async ()=>{
    //         await getRole()
    //         if(getRoleError?.error?.data?.error == "jwt_expired"){
    //             setTimeout(async () => {
    //                await getRole()
    //               }, 1000)
    //         }
    //         if(getRoleIsSuccess){
    //             console.log(getRoleData?.data?.role)
    //         }else(console.log(getRoleError?.error?.data?.error))
    //     }
    //     asF()

         
    // }, [])
    


    const onSubmit: SubmitHandler<CreateTodoFields> = async (data) => {
         let prio = data.priority
          if(title && body && assignedTo && data.priority && deadline){
            await createTodo({title, body, assignedTo, prio, deadline});
            

          } else {
            toast.error("All1 firlds are required");
          }
    };
    return (
        <>
            <h1>Create Todo</h1>
            <Logout />
            <form className="row g-3" method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12">
                    <label htmlFor="validationServer01" className="form-label">
                        Title
                    </label>
                    <input
                        className={
                            errors.title ? "form-control is-invalid" : "form-control"
                        }
                        {...register("title", {
                            required: "Title is required fields",
                        })}
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={handleChange}
                        autoFocus
                    />
                    <div className={errors.title ? "invalid-feedback" : "valid-feedback"}>
                        {errors.title ? errors.title.message : ""}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="validationServer01" className="form-label">
                        Body
                    </label>
                    <input
                        className={
                            errors.body ? "form-control is-invalid" : "form-control"
                        }
                        {...register("body", {
                            required: "Body is required fields",
                        })}
                        type="text"
                        placeholder="Description"
                        name="body"
                        onChange={handleChange}
                    />
                    <div className={errors.body ? "invalid-feedback" : "valid-feedback"}>
                        {errors.body ? errors.body.message : ""}
                    </div>
                </div>
                <div className="col-md-12">
                    <label htmlFor="validationServer01" className="form-label">
                        Assign to (email)
                    </label>
                    <input
                        className={
                            errors.assignedTo ? "form-control is-invalid" : "form-control"
                        }
                        {...register("assignedTo", {
                            required: "Field is required fields",
                        })}
                        type="email"
                        placeholder="Description"
                        name="assignedTo"
                        onChange={handleChange}
                    />
                    <div className={errors.assignedTo ? "invalid-feedback" : "valid-feedback"}>
                        {errors.assignedTo ? errors.assignedTo.message : ""}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select {...register('priority')} name="priority" className="form-control" id="priority"
                        onChange={handleChange}>
                            <option value="">Select priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        {errors.priority && <p className="text-danger">{errors.priority.message}</p>}
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="deadline">Date and Time</label>
                        <input {...register('deadline')} type="datetime-local" className="form-control" id="deadline" 
                        onChange={handleChange}
                        />
                        {errors.deadline && <p className="text-danger">{errors.deadline.message}</p>}
                    </div>
                </div>
                {/* bootstrap radiobutton for priority */}

                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CreateTodo
