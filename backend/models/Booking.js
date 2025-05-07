import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true
    },
    userEmail: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/],
      immutable: true
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
      immutable: true
    },
    tourName: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    fullName: {
      type: String,
      required: true,
      minlength: 3
    },
    guestSize: {
      type: Number,
      required: true,
      min: 1
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^\d+$/.test(v);
        }
      }
    },
    bookAt: {
      type: Date,
      required: true,
      validate: {
        validator: function(v) {
          return v >= new Date(new Date().setHours(0, 0, 0, 0));
        }
      }
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Completed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);