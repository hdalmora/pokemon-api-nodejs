const mongoose = require("mongoose");
const slugify = require("slugify");

const pokemonSchema = new mongoose.Schema(
  {
    pokemonName: {
      type: String,
      required: [true, "A Pokemon must have a name"],
      unique: true,
      trim: true,
      minlength: [
        5,
        "A Pokemon name must have more or equal then 5 characters",
      ],
    },
    pokemonType: {
      type: String,
      enum: [
        "Bug",
        "Ghost",
        "Steel",
        "Fire",
        "Rock",
        "Water",
        "Electric",
        "Psychic",
      ],
      default: "Bug",
      unique: false,
      required: [true, "A Pokemon must have a type"],
    },
    pokemonImageUrl: {
      type: String,
      required: [true, "A Pokemon must have a image URL"],
      unique: true,
      trim: true,
      minlength: [
        5,
        "A Pokemon image URL must have more or equal then 5 characters",
      ],
    },
    strength: {
      type: Number,
      required: [true, "A Pokemon must have a strength"],
      unique: false,
      min: [1, "A Pokemon strength must be at least  1"],
      max: [100, "A Pokemon strength must be at least  100"],
    },
    speed: {
      type: Number,
      required: [true, "A Pokemon must have a speed"],
      unique: false,
      min: [1, "A Pokemon speed must be at least  1"],
      max: [100, "A Pokemon speed must be at least  100"],
    },
    defence: {
      type: Number,
      required: [true, "A Pokemon must have a strength"],
      unique: false,
      min: [1, "A Pokemon defence must be at least  1"],
      max: [100, "A Pokemon defence must be at least  100"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pokemonSchema.pre("save", function (next) {
  this.slug = slugify(this.pokemonName, { lower: true });
  next();
});

pokemonSchema.pre(/^find/, function (next) {
  this.find({ secretPokemon: { $ne: true } });

  this.start = Date.now();
  next();
});

pokemonSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

const Pokemon = mongoose.model("pokemons", pokemonSchema);

module.exports = Pokemon;
