import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document {
   _id: string ;
   title: string;
   description?: string;
   location?: string;
   createdAt: Date;
   imageUrl: string;
   startDateTime: Date;
   endDateTime: Date;
   price: string;
   isFree: boolean;
   url?: string;
   category: { _id: string, categoryName: string }
   organizer: { _id: string, firstName: string, lastName: string }
 }
const EventSchema = new Schema({
   title:{type: "string", required: true},
   description:{type: "string"},
   location:{type: "string"},
   createdAt:{type: "Date", default: Date.now},
   imageUrl:{type: "string", required: true},
   startDateTime:{type:'Date',default: Date.now},
   endDateTime:{type:'Date',default: Date.now},
   price:{type: "string"},
   isFree:{type: "boolean", default: false },
   url:{type: "string"},
   category:{type:Schema.Types.ObjectId, ref: 'Category'},
   organizer:{type:Schema.Types.ObjectId, ref: 'UserModel'},
});

const EventModel= models.EventModel || model("EventModel",EventSchema);

export default EventModel;