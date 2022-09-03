import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../rtk/api/apiSlice";

const notesAdapters = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1: -1
})

const initialState = notesAdapters.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, // default 60 seconds for caching data
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    console.log('note at noteApiSlice', note)
                    note.id = note._id
                    return note
                })
                return notesAdapters.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', ID: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Note', id }))
                    ]
                } else return [{ type: 'Note', id: 'LIST' }]
            }
        })
    })
})

export const {
   useGetNotesQuery
} = notesApiSlice

// return the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// create memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data  // normalized state object with ids & entities
)

// getSelectors create these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapters.getSelectors(state => selectNotesData(state) ?? initialState)