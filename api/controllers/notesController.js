const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')


// @desc Get all Notes by user
// @router GET /notes
// @ccess Private
const getAllNotes = asyncHandler(async(req, res) => {
    const notes = await Note.find().select().lean()
    if (!notes?.length) return  res.status(400).json({ message: "No Notes Found" })

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithUser = await Promise.all(notes.map(async (note) =>{
        const user = await User.findById(note.user).lean().exec()
        return {...note, username: user.username}
    }))

    res.json(notesWithUser)
})


// @desc Create new note
// @router POST /notes
// @ccess Private
const createNewNote = asyncHandler(async(req, res) => {
    const { user, title, text } = req.body
    

    // confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })            // 400 bad req
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2}).lean().exec()

    
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }
})


// @desc Update a note
// @router PATCH /notes
// @ccess Private


const updateNote = asyncHandler(async(req, res) => {
    const { id, user, title, text, completed } = req.body

      // Confirm data
      if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const note = await Note.findById(id).exec()

    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

     // Check for duplicate title
     const duplicate = await Note.findOne({ title }).collation({ locale: 'en', strength: 2}).lean().exec()


    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }


    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    res.json(`'${updatedNote.title}' updated`)

})

// @desc Delete a note
// @router DELETE /notes
// @ccess Private


const deleteNote = asyncHandler(async(req, res) => {
    const { id } = req.body
    
    // Confirm data
    if (!id) return res.status(400).json({ message: 'Note ID Note found '})
    

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()


    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const result = await note.deleteOne()

    const reply = `Note '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
})


module.exports = { getAllNotes, createNewNote, updateNote, deleteNote }