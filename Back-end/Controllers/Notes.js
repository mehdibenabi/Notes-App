const Note = require("../Models/note.model.js");


const CreateNote = async (req,res) =>{

    try {
        const {title , content, tags,isPinned}=req.body;
        const {user} = req.user;
        
        if(!title){
            return res.status(400).json({
                error :true,
                message :"Title is required"
            });
        }
        if(!content){
            return res.status(400).json({
              error: true,
              message: "Content is required",
            });

        }   
        
        const note = new Note({
            title,
            content,
            tags: tags || [],
            isPinned,
            user : user._id
        });

        await note.save();

        return res.status(200).json({
            error:false,
            message:"Note created succesfully",
            note
        });

        



    } catch (error) {
        return res.status(500).json({
            error: true,
            message : "internal server error"
        })
    }
}

const EditNote = async (req, res) => {
  try {
    const { title, content, tags, isPinned } = req.body;
    const id  = req.params.NoteId; // ou bien {NoteId}=req.params
    const { user } = req.user;


    if(!title && !content && !tags){
        return res.status(400).json({
            error :true,
            message :"No change provided"
        });
    }


    const note = await Note.findOne(
      { _id: id, user: user._id }); // Find note by ID and ensure it belongs to the user

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note Not Found",
      });
    }

    if(title){
        note.title=title;
    }
    if(content){
        note.content=content;
    }
    if(tags) note.tags=tags;

    if(isPinned) note.isPinned=isPinned;

    await note.save();

    return res.status(200).json({
      error: false,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const DeleteNote = async (req, res) => {
  try {
    const id  = req.params.NoteId; // ou bien {NoteId}=req.params
    const { user } = req.user;


    const note = await Note.findByIdAndDelete(
      { _id: id, user: user._id }, // Find note by ID and ensure it belongs to the user
    ); // can use findOne and after use await Note.DeleteOne({_id:id, user: user._id})

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "No Note with this id found",
      });
    }

    // await Note.DeleteOne({ _id: id, user: user._id });

    return res.status(200).json({
      error: false,
      message: "Note Deleted successfully",
    });
  } catch (error) {
    console.error("Error Deleting note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
};

const GetNotes = async (req, res) => {
    try {
        const {user} = req.user;
        const notes = await Note.find({user:user._id}).sort({isPinned : -1});
        return res.status(200).json({
            error:false,
            data : notes,
            message:"Notes fetched successfuly"
        });
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        });
    }
}

const GetNoteById = async (req, res) => {
    try {
        const id = req.params.NoteId;
        const {user} = req.user;
        const note = await Note.findOne({_id:id , user:user._id}); // can't use findById cuz i can't check if the user authentificated
        return res.status(200).json({
            error:false,
            data : note,
            message:"Note fetched successfuly"
        });
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        });
    }
}

const UpdateIsPinned = async (req,res) =>{

    const {user}=req.user;
    const {id} = req.params;
    const {isPinned}=req.body;

    try {
        const note = await Note.findOne({_id:id,user:user._id});
    
        if(!note){
            return res.status(404).json({
                error:true,
                message:"Note not found"
            });
        }
    
        note.isPinned=isPinned;
    
        await note.save();
    
        return res.status(200).json({
            error:false,
            message : "Pin Updated Succefully ",
            note
        });

    } catch (error) {
        return res.status(505).json({
            error:true,
            message : "Internal server error"
        });
    }

}

const SearchNotes = async (req,res)=>{
  const {user}=req.user;
  const { query } = req.query;
  
  
  if (!query) {
    return res.status(400).json({
      error: true,
      mesage: "Search query is required",
    });
  }
        
    try {
        const notes = await Note.find({
          user: user._id,
          $or: [
            { title: { $regex: new RegExp(query, "i") } },
            { content: { $regex: new RegExp(query, "i") } },
          ],
        });

        return res.status(200).json({
            error:false,
            notes:notes,
            message:"Notes matching the search query retrieved successfully"
        });

    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        });
    }

}


module.exports = {SearchNotes,CreateNote,EditNote,DeleteNote,GetNotes,GetNoteById,UpdateIsPinned};
