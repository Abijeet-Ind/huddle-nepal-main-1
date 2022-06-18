const mongoose = require("mongoose");

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
  oraganizer: {
    type: String,
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
    enum: ["online", "offline", "live"],
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
  slug: [String],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

registerSchema.pre("save", function (next) {
  this.tag = [`${this.event_name}`, `${this.speakers}`, `${this.oraganizer}`];
  this.slug = this.event_name.replaceAll(" ", "-");
  next();
});

const eventData = mongoose.model("eventData", registerSchema);
module.exports = eventData;
