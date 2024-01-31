import {Api} from './Api';

export const TodoApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        createTodo: builder.mutation({
            query: (body) => ({
                url: '/admin/create',
                method: 'POST',
                body,
            }),
        }),
        getAllTodo: builder.query<void, void>({
            query: () => ({
                url: '/employee/tasks',
                method: 'get'
            }),
        }),
        getUserTodo: builder.query<Object, void >({
            query: ()=>({
                url: 'employee/my',
                method: 'get'
            })
        })
    }),
    overrideExisting: false,
});

export const { useCreateTodoMutation, useGetAllTodoQuery, useLazyGetAllTodoQuery ,useGetUserTodoQuery, useLazyGetUserTodoQuery  } = TodoApi
