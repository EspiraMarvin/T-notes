import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../rtk/api/apiSlice";

const usersAdapters = createEntityAdapter({})

const initialState = usersAdapters.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, // default 60 seconds for caching data
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    console.log('user at userApiSlice', user)
                    user.id = user._id
                    return user
                })
                return usersAdapters.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', ID: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialState => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST'}
            ]
        }),
        updateUser: builder.mutation({
            query: initialState => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialState
                }
            }),  
            invalidatesTags: ((result, error, arg) => [
                { type: 'User', id: arg.id }
            ]) 
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }                
            }),    
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })

    })
})

export const {
   useGetUsersQuery,
   useAddNewUserMutation,
   useUpdateUserMutation, 
   useDeleteUserMutation
} = usersApiSlice

// return the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// create memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data  // normalized state object with ids & entities
)

// getSelectors create these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers, 
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapters.getSelectors(state => selectUsersData(state) ?? initialState)