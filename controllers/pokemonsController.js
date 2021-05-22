const Pokemon = require("../models/pokemonModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllPokemons = async (req, res) => {
  try {
    const features = new APIFeatures(Pokemon.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const pokemons = await features.query;

    res.status(200).json({
      status: "success",
      results: pokemons.length,
      pokemons,
    });
  } catch (err) {
    res.status(404).json({
      status: "Bad Request (404)",
      message: err,
    });
  }
};

exports.getPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id);

    if (pokemon) {
      res.status(200).json({
        status: "success",
        pokemon,
      });
    } else {
      res.status(404).json({
        status: "404",
        message: "Pokemon document not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Pokemon document not found (404)",
      message: err,
    });
  }
};

exports.createPokemon = async (req, res) => {
  try {
    const newPokemon = await Pokemon.create(req.body);

    res.status(201).json({
      status: "success",
      newPokemon,
    });
  } catch (err) {
    res.status(400).json({
      status: "Bad Request (400)",
      message: err,
    });
  }
};

exports.updatePokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      pokemon,
    });
  } catch (err) {
    res.status(404).json({
      status: "Bad Request (404)",
      message: err,
    });
  }
};

exports.deletePokemon = async (req, res) => {
  try {
    await Pokemon.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Bad Request (404)",
      message: err,
    });
  }
};
