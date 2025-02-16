import { model, models, Schema } from "mongoose";

const EventSchema = new Schema({
   title:{type: "string", required: true},
   description:{type: "string"},
   location:{type: "string"},
   createdAt:{type: "Date", default: Date.now},
   imageUrl:{type: "string", required: true},
   startDateTime:{type:'Date',default: Date.now},
   endDateTime:{type:'Date',default: Date.now},
   price:{type: "number"},
   isFree:{type: "boolean", default: false },
   url:{type: "string"},
   category:{type:Schema.Types.ObjectId, ref: 'Category'},
   organizer:{type:Schema.Types.ObjectId, ref: 'UserModel'},
});

const EventModel= models.EventModel || model("EventModel",EventSchema);

export default EventModel;