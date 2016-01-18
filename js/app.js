App = Ember.Application.create();

App.Router.map(function() {
  this.route("index", { path: "/" });
  this.route("pokemon", { path: "/:pkdx_id" });
});

App.PokemonRoute = Ember.Route.extend({

  model: function(pokemon, transitions) {

    toThreeDigits = function(pkdx_id) {
      if(pkdx_id == "000"){return "151"}
      if(pkdx_id == "152"){return "001"}

      return ("000"+pkdx_id).slice(-3);
    },

    dividebyTen = function(string) {
      return ((parseInt(string))/10).toString();
    },

    createMoveGroups = function(movesArray) {
      return moveGroups = [{moves: movesArray.slice(0,5), colour: "#4A90E2"},
                           {moves: movesArray.slice(5,10), colour: "#606C78"},
                           {moves: movesArray.slice(10,15), colour: "#BE93E7"},
                           {moves: movesArray.slice(15,20), colour: "#A0DA5E"}];
    },

    pokemonRequest = function() {
      newPokemonId = parseInt(pokemon.pkdx_id);
      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+newPokemonId+"/").then(function(pokemon){
        pokemon.previousPokemonId = toThreeDigits(pokemon.national_id-1);
        pokemon.nextPokemonId = toThreeDigits(pokemon.national_id+1);
        pokemon.pkdx_id = toThreeDigits(pokemon.pkdx_id);

        pokemon.generalStats = [{value: dividebyTen(pokemon.height)+'m',
                                  name: "Height"},
                                 {value: dividebyTen(pokemon.weight)+'Kg',
                                  name: "Weight"},
                                 {value: "F/M", name: "Gender"}]

        pokemon.baseStats = [{value: pokemon.hp, name: "HP"},
                              {value: pokemon.attack, name: "Attack"},
                              {value: pokemon.defense, name: "Defense"},
                              {value: pokemon.sp_atk, name: "Special Attack"},
                              {value: pokemon.sp_def, name: "Special Defense"},
                              {value: pokemon.speed, name: "Speed"}]

        pokemon.moveGroups = createMoveGroups(pokemon.moves);

        return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+pokemon.previousPokemonId).then(function(prevPokemon) {
          pokemon.previousPokemon = prevPokemon.name;
          pokemon.previousPokemonLink = pokemon.previousPokemonId

          return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+pokemon.nextPokemonId).then(function(nexPokemon) {
            pokemon.nextPokemon = nexPokemon.name;
            pokemon.nextPokemonLink = pokemon.nextPokemonId

              var descriptionUrl = pokemon.descriptions.pop().resource_uri;
              return Ember.$.getJSON("http://pokeapi.co"+descriptionUrl).then(function(description){
                pokemon.summary = description.description;
                return pokemon;
              });
            })
          });
        });
    }
    return pokemonRequest();
  }
});

App.IndexRoute = Ember.Route.extend({

  actions: {

    loadMore: function() {
      var nextPokemon= this.currentModel.length + 1;
      var totalPokemon = nextPokemon + 15;
      $(".load").hide();
      infiniteScroll(nextPokemon, totalPokemon)
    }
  },

  model: function() {

    var pokemonArray = [];

    infiniteScroll = function(nextPokemon, totalPokemon) {
      $(window).bind("scroll", function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          collectPokemon(nextPokemon, totalPokemon)
          nextPokemon +=16;
          totalPokemon +=16;
        }
      });
    },

    collectPokemon = function(currentPokemon, reqPokemon){
      for(var i=currentPokemon; i<reqPokemon+1; i++){
        pokemonRequest(i);
      };
      return pokemonArray;
    },

    toThreeDigits = function(pkdx_id) {
      if(pkdx_id == '000'){return '151'}
      return ("000"+pkdx_id).slice(-3);
    },

    pokemonRequest = function(i){

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()).then(function(pokemonData) {
        Ember.run(function() {
          pokemonData.pkdx_id = toThreeDigits(pokemonData.pkdx_id);
          pokemonArray.pushObject(pokemonData);
        });
      });
    };
    return collectPokemon(1, 16);
  }
});
