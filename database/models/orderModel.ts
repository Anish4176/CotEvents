import { Schema,model,models } from "mongoose";

const orderSchema= new Schema({
    RazorpaymentId:{
        type:String,
        required:true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'EventModel'
    },
    BuyerId: {
        type: Schema.Types.ObjectId,
        required:true,
        ref:'UserModel'
    },
    totalAmount: {
        type:Number,
        required:true
    },
    createdAt:{
        type:Date
    }
})
const orderModel= models.orderModel || model("orderModel",orderSchema);
export default orderModel
