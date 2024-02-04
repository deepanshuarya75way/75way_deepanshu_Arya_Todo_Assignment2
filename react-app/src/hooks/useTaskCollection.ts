import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import { useLazyGetAllTodoQuery } from '../services/TodoApi';

// async function formatTasks(TaskArray: any){
//   const tasksF: TaskModel[] = await TaskArray.map((task: any) => ({
//     id: task._id,
//     title: task.title,
//     column: task.status === "Pendind" ? ColumnType.IN_PROGRESS :  ColumnType.COMPLETED,
//     color: 'blue'
//   }));
//   return tasksF
// }
function useTaskCollection() {
//   const [tasks1, setTasks] = useState([]);
//   const [
//     getAllTodo,
//     {
//       data: getAllTodoData,
//       isSuccess: getAllTodoIsSuccess,
//       isError: getAllTodoIsError,
//       error: getAllTodoError,
//     },
//   ] = useLazyGetAllTodoQuery();
  
//   useEffect(()=> {
//     async function makeTodoGetReq(){
//       await getAllTodo();
//     }
//     makeTodoGetReq()
//   }, [])

//   useEffect(() => {
//     if(getAllTodoIsSuccess){
//       const TaskArray = getAllTodoData.tasks
//       console.log("TaskArray", TaskArray)
//       console.log(typeof(TaskArray), TaskArray.length)
//       setTasks(formatTasks(TaskArray))
//       console.log("tasks", tasks1)
//     }
//     if(getAllTodoIsError){
//       console.log("Error", getAllTodoError)
//     }
// }, [getAllTodoIsSuccess, getAllTodoIsError])

//   useEffect(() => {
//     if(getAllTodoIsSuccess){
//       const TaskArray = getAllTodoData?.tasks
//       console.log("TaskArray", TaskArray)
//       console.log(typeof(TaskArray), TaskArray.length)
//       formatTasks(TaskArray).then((tasksF) => {
//         setTasks(tasksF)
//       })
//       console.log("tasks", tasks1)
//     }
//     if(getAllTodoIsError){
//       console.log("Error", getAllTodoError)
//     }
//   }, [getAllTodoIsSuccess, getAllTodoIsError])


  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>('tasks', {
    Todo: [
      {
        id: uuidv4(),
        column: ColumnType.TO_DO,
        title: 'Task 1',
        color: 'blue.300',
      },
    ],
    'In Progress': [
      {
        id: uuidv4(),
        column: ColumnType.IN_PROGRESS,
        title: 'Task 2',
        color: 'yellow.300',
      },
    ],
    Blocked: [
      {
        id: uuidv4(),
        column: ColumnType.BLOCKED,
        title: 'Task 3',
        color: 'red.300',
      },
    ],
    Completed: [
      {
        id: uuidv4(),
        column: ColumnType.COMPLETED,
        title: 'Task 4',
        color: 'green.300',
      },
    ],
  });
}

export default useTaskCollection
