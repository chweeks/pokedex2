App = Ember.Application.create();

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route("pokemon", { path: "/:pkdx_id" });
});

App.PokemonRoute = Ember.Route.extend({

});

App.IndexRoute = Ember.Route.extend({

  model: function() {

    var pokemonArray = [];

    toThreeDigits = function(pkdx_id) {
      return ('000'+pkdx_id).slice(-3)
    },

    dividebyTen = function(string) {
    return ((parseInt(string))/10).toString()
    }

    pokemonRequest = function(i){

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        response.pkdx_id = toThreeDigits(response.pkdx_id)
        response.height = dividebyTen(response.height)
        response.weight = dividebyTen(response.weight)
        pokemonArray.pushObject(response);
      });
    };

    collectPokemon = function(noOfPokemon){
      for(var i=1; i<noOfPokemon+1; i++){
        pokemonRequest(i);
      };
      return pokemonArray
    };
    return collectPokemon(16);
  }
});
