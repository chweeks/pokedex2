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
      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+newPokemonId+"/").then(function(pageData){
        pageData.previousPokemonId = toThreeDigits(pageData.national_id-1);
        pageData.nextPokemonId = toThreeDigits(pageData.national_id+1);
        pageData.pkdx_id = toThreeDigits(pageData.pkdx_id);

        pageData.generalStats = [{value: dividebyTen(pageData.height)+'m',
                                  name: "Height"},
                                 {value: dividebyTen(pageData.weight)+'Kg',
                                  name: "Weight"},
                                 {value: "F/M", name: "Gender"}]

        pageData.baseStats = [{value: pageData.hp, name: "HP"},
                              {value: pageData.attack, name: "Attack"},
                              {value: pageData.defense, name: "Defense"},
                              {value: pageData.sp_atk, name: "Special Attack"},
                              {value: pageData.sp_def, name: "Special Defense"},
                              {value: pageData.speed, name: "Speed"}]

        pageData.moveGroups = createMoveGroups(pageData.moves);

        return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+pageData.previousPokemonId).then(function(prevPokemon) {
          pageData.previousPokemon = prevPokemon.name;
          pageData.previousPokemonLink = pageData.previousPokemonId

          return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+pageData.nextPokemonId).then(function(nexPokemon) {
            pageData.nextPokemon = nexPokemon.name;
            pageData.nextPokemonLink = pageData.nextPokemonId

            var descriptionUrl = pageData.descriptions.pop().resource_uri;
            return Ember.$.getJSON("http://pokeapi.co"+descriptionUrl).then(function(description){
              pageData.summary = description.description;
              return pageData;
            })
          });
        });
      })
    }
    return pokemonRequest();
  }
});

App.IndexRoute = Ember.Route.extend({

  actions: {

    loadMore: function() {
      var nextPokemon= this.currentModel.length + 1;
      var totalPokemon = nextPokemon + 3;
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
          nextPokemon +=4;
          totalPokemon +=4;
        }
      });
    }

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

    dividebyTen = function(string) {
      return ((parseInt(string))/10).toString();
    },

    createMoveGroups = function(movesArray) {
      return moveGroups = [{moves: movesArray.slice(0,5), colour: "#4A90E2"},
                           {moves: movesArray.slice(5,10), colour: "#606C78"},
                           {moves: movesArray.slice(10,15), colour: "#BE93E7"},
                           {moves: movesArray.slice(15,20), colour: "#A0DA5E"}];
    },

    pokemonRequest = function(i){

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()).then(function(pageData) {
        pageData.previousPokemonId = toThreeDigits(pageData.national_id-1);
        pageData.nextPokemonId = toThreeDigits(pageData.national_id+1);
        pageData.pkdx_id = toThreeDigits(pageData.pkdx_id);

        pageData.generalStats = [{value: dividebyTen(pageData.height)+'m',
                                  name: "Height"},
                                 {value: dividebyTen(pageData.weight)+'Kg',
                                  name: "Weight"},
                                 {value: "F/M", name: "Gender"}]

        pageData.baseStats = [{value: pageData.hp, name: "HP"},
                              {value: pageData.attack, name: "Attack"},
                              {value: pageData.defense, name: "Defense"},
                              {value: pageData.sp_atk, name: "Special Attack"},
                              {value: pageData.sp_def, name: "Special Defense"},
                              {value: pageData.speed, name: "Speed"}]

        pageData.moveGroups = createMoveGroups(pageData.moves);

        return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+pageData.previousPokemonId).then(function(prevPokemon) {
          pageData.previousPokemon = prevPokemon.name;
          pageData.previousPokemonLink = pageData.previousPokemonId

          return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+pageData.nextPokemonId).then(function(nexPokemon) {
            pageData.nextPokemon = nexPokemon.name;
            pageData.nextPokemonLink = pageData.nextPokemonId

            var descriptionUrl = pageData.descriptions.pop().resource_uri;
            return Ember.$.getJSON("http://pokeapi.co"+descriptionUrl).then(function(description){
              pageData.summary = description.description;
              pokemonArray.pushObject(pageData);
            })
          });
        });
      });
    };
    return collectPokemon(1, 16);
  }
});
