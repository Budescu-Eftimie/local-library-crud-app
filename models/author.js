const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    family_name: { type: String, required: true, maxlength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for Author's full_name
AuthorSchema.virtual("name").get(function () {
    let fullname = ""; // to avoid errors in case an author does not have either a family name or first name
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name} ${this.first_name}`;
    }
    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
});

// Virtual for author's lifespan
AuthorSchema.virtual("lifespan").get(function () {
    var lifetime_string = "";
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += " - ";
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear();
    }
    return lifetime_string;
});

AuthorSchema.virtual("url").get(function () {
    return "/catalog/author/" + this._id;
});

model.exports = mongoose.model("Author", AuthorSchema);
