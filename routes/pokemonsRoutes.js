const express = require("express");
const pokemonsController = require("../controllers/pokemonsController");

const router = express.Router();

router
  .route("/")
  .get(pokemonsController.getAllPokemons)
  .post(pokemonsController.createPokemon);

router
  .route("/:id")
  .get(pokemonsController.getPokemon)
  .patch(pokemonsController.updatePokemon)
  .delete(pokemonsController.deletePokemon);

module.exports = router;
