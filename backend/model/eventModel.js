const mongoose = require("mongoose");
const userModel = require("./reviewModel");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const cookiess = async (req, res) => {
  const cookie = req.cookies.jwt;
  return cookie;
};

const registerSchema = new mongoose.Schema({
  event_name: {
    type: String,
    require: [true, "event name is require"],
    unique: true,
  },
  speakers: {
    type: String,
    require: [true, "speakers req"],
  },
  speaker_profile: {
    type: [String],
  },
  covered_topics: {
    type: [String],
    require: true,
  },
  banner: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  event_type: {
    type: String,
    enum: ["online", "offline", "live", "Online", "Offline", "Live"],
    default: "online",
  },
  event_held_at: {
    type: String,
    require: true,
  },
  event_start_At: {
    type: Date,
    default: new Date(),
  },
  tag: {
    type: [String],
  },

  //organizer information
  oraganizer: {
    type: String,
    require: true,
  },
  oraganizer_email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  oraganizer_website: {
    type: String,
  },

  slug: String
});

registerSchema.pre("save", function (next) {
  this.tag = [`${this.event_name}`, `${this.speakers}`, `${this.oraganizer}`];
  this.slug = this.event_name.replaceAll(" ", "-");
  next();
});

// only for accessing event created by user
const createdEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
  },
  eventObjectId: {
    type: String,
  },
  eventCreator: {
    type: String,
  },
});



const eventData = mongoose.model("eventData", registerSchema);
const eventId = mongoose.model("eventId", createdEventSchema);

module.exports = { event: eventData, eventPoster: eventId }; // this allows schema to be exported at the sametime
