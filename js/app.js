App = Ember.Application.create();

App.Router.map(function() {
  this.route("index", { path: "/" });
  this.route("pokemon", { path: "/:pkdx_id" });
});

App.PokemonRoute = Ember.Route.extend({

  afterModel: function(posts, transitions) {
    var descriptionUrl = posts.descriptions.pop().resource_uri;
    return Ember.$.getJSON("http://pokeapi.co"+descriptionUrl).then(function(response) {
      posts.summary = response.description;
    });
  }
});

App.IndexRoute = Ember.Route.extend({

  actions: {
    loadMore: function() {
      var noOfPokemon = this.currentModel.length;
      var requireNoOfPokemon = noOfPokemon + 4;
      for(var i=noOfPokemon; i<requireNoOfPokemon; i++){
        pokemonRequest(i);
      };

      $(window).bind("scroll", function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          loadMore();
        }
      });
    }
  },

  model: function() {

    var pokemonArray = [];

    collectPokemon = function(noOfPokemon){
      for(var i=1; i<noOfPokemon+1; i++){
        pokemonRequest(i);
      };
      return pokemonArray;
    },

    toThreeDigits = function(pkdx_id) {
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

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        response.pkdx_id = toThreeDigits(response.pkdx_id);

        response.generalStats = [{value: dividebyTen(response.height)+'m', name: "Height"},
                                 {value: dividebyTen(response.weight)+'Kg', name: "Weight"},
                                 {value: "F/M", name: "Gender"}]

        response.baseStats = [{value: response.hp, name: "HP"},
                              {value: response.attack, name: "Attack"},
                              {value: response.defense, name: "Defense"},
                              {value: response.sp_atk, name: "Special Attack"},
                              {value: response.sp_def, name: "Special Defense"},
                              {value: response.speed, name: "Speed"}]

        response.moveGroups = createMoveGroups(response.moves);

        pokemonArray.pushObject(response);
      });
    };
    return collectPokemon(16);
  }
});
