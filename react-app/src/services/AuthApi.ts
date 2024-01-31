import {Api} from './Api';

export const authApi = Api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: 'POST',
                body,
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.query<void, void>({
            query: () => ({
                url: 'auth/logout',
                method: 'get'
            }),
        }),
        getTodo: builder.query<Object, void >({
            query: ()=>({
                url: '/user',
                method: 'get'
            })
        })
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useRegisterMutation, useLogoutQuery, useLazyLogoutQuery, useGetTodoQuery, useLazyGetTodoQuery } = authApi
