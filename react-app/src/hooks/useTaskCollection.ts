import { useLocalStorage } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ColumnType } from '../utils/enums';
import { TaskModel } from '../utils/models';
import { useLazyGetAllTodoQuery } from '../services/TodoApi';
import { set } from 'react-hook-form';

async function formatTasks(TaskArray: any){
  const tasksF: TaskModel[] = await TaskArray.map((task: any) => ({
    id: task._id,
    title: task.title,
    column: task.status === "Pending" ? ColumnType.IN_PROGRESS :  ColumnType.COMPLETED,
    color: 'blue'
  }));
  const segregatedTasks = await segregateTasks(tasksF)
  return segregatedTasks
  
}

async function segregateTasks(tasks: TaskModel[]) {
  const segregatedTasks: {
    [key in ColumnType]: TaskModel[];
  } = {
    [ColumnType.TO_DO]: [],
    [ColumnType.IN_PROGRESS]: [],
    [ColumnType.BLOCKED]: [],
    [ColumnType.COMPLETED]: [],
  };
  tasks.forEach((task) => {
    segregatedTasks[task.column].push(task);
  });
  console.log("segregatedTasks", segregatedTasks)
  return segregatedTasks;
}

function useTaskCollection() {
  const [tasks, setTasks] = useState<{
    [key in ColumnType]: TaskModel[];
  }>({
    [ColumnType.TO_DO]: [],
    [ColumnType.IN_PROGRESS]: [],
    [ColumnType.BLOCKED]: [],
    [ColumnType.COMPLETED]: [],
  });

//   const [
//     getAllTodo,
//     {
//       data: getAllTodoData,
//       isSuccess: getAllTodoIsSuccess,
//       isError: getAllTodoIsError,
//       error: getAllTodoError,
//     },
//   ] = useLazyGetAllTodoQuery();
  
//   useEffect(() => {
//     async function fetchData() {
//       await getAllTodo();
//     }
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if(getAllTodoIsSuccess){
//       const TaskArray = getAllTodoData.tasks
//       formatTasks(TaskArray).then((tasksF) => {
//         setTasks(tasksF)
//       })
//     }
//     if(getAllTodoIsError){
//       console.log("Error", getAllTodoError)
//     }
// }, [getAllTodoIsSuccess, getAllTodoIsError])

// useEffect(() => {
//   if(tasks){
//     console.log("tasks", tasks)
//   }
// }, [tasks])


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
