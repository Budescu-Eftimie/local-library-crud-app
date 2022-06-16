const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 100 },
});

// Virtual for genre url

GenreSchema.virtual("url").get(function () {
    return "/catalog/genre/" + this.name;
});

module.exports = mongoose.model("Genre", GenreSchema);
