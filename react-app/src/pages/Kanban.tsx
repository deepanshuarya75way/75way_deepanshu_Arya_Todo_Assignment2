import {} from '@chakra-ui/icons';
import { Button, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../components/Column';
import DarkModeIconButton from '../components/DarkModeIconButton';
import { ColumnType } from '../utils/enums';
import { useLazyGetAllTodoQuery } from '../services/TodoApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TaskModel } from '../utils/models';
import { set } from 'react-hook-form';
import {colors} from '../utils/helpers'
import { useNavigate } from 'react-router-dom';



async function formatTasks(TaskArray: any){
  const tasksF: TaskModel[] = await TaskArray.map((task: any) => ({
    id: task._id,
    title: task.title,
    column: task.status === "Pending" ? ColumnType.IN_PROGRESS :  ColumnType.COMPLETED,
    color: colors[Math.floor(Math.random() * colors.length)]
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



function Kanban() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [tasks, setTasks] = useState<{
    [key in ColumnType]: TaskModel[];
  }>({
    [ColumnType.TO_DO]: [],
    [ColumnType.IN_PROGRESS]: [],
    [ColumnType.BLOCKED]: [],
    [ColumnType.COMPLETED]: [],
  });

  const [
    getAllTodo,
    {
      data: getAllTodoData,
      isSuccess: getAllTodoIsSuccess,
      isError: getAllTodoIsError,
      error: getAllTodoError,
    },
  ] = useLazyGetAllTodoQuery();
  

      useEffect(() => {
        async function fetchData() {
          await getAllTodo();
        }
        fetchData();
      }, []);
    
      useEffect(() => {
        if(getAllTodoIsSuccess){
          const TaskArray = getAllTodoData.tasks
          formatTasks(TaskArray).then((tasksF) => {
            setTasks(tasksF)
          })
        }
        if(getAllTodoIsError){
          console.log("Error", getAllTodoError)
        }
    }, [getAllTodoIsSuccess, getAllTodoIsError])
    
    useEffect(() => {
      if(tasks['In Progress'].length > 0 || tasks['Completed'].length > 0){

        console.log("tasks", tasks)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        setloading(false)
      }

    },[tasks])

if(loading){
  console.log("Loading")
  return <div>Loading...</div>
}

  return (
    
    <main>
      <Heading
        fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        Kanban
      </Heading>
      {/* create a button using chakra ui */}
      {/* <Button onClick={() => getAllTodo()}>Get All Todo</Button> */}
      <Button onClick={() => navigate('/createTodo')}>Create Todo</Button>
      <DarkModeIconButton position="absolute" top={0} right={2} />
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 16, md: 2 }}
          >
            {/* <Column column={ColumnType.TO_DO} /> */}
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </main>
  );
}

export default Kanban;