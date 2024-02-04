import {} from '@chakra-ui/icons';
import { Button, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../components/Column';
import DarkModeIconButton from '../components/DarkModeIconButton';
import { ColumnType } from '../utils/enums';
import { useLazyGetAllTodoQuery } from '../services/TodoApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';



function Kanban() {
    const [
        getAllTodo,
        {
          data: getAllTodoData,
          isSuccess: getAllTodoSuccess,
          isError: getAllTodoIsError,
          error: getAllTodoError,
          isFetching: getAllTodoIsFetching,
        },
      ] = useLazyGetAllTodoQuery();
  
  useEffect(()=>{

  }, [getAllTodoIsFetching])


    useEffect(()=>{
        if(getAllTodoSuccess){
            console.log(getAllTodoData)
            toast.success("All Todo Fetched");
        }else if(getAllTodoIsError){
            console.log(getAllTodoError)
        }
    }, [getAllTodoSuccess, getAllTodoIsError])

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
      <Button onClick={() => getAllTodo()}>Get All Todo</Button>
      <DarkModeIconButton position="absolute" top={0} right={2} />
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            spacing={{ base: 16, md: 4 }}
          >
            <Column column={ColumnType.TO_DO} />
            <Column column={ColumnType.IN_PROGRESS} />
            <Column column={ColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </main>
  );
}

export default Kanban;