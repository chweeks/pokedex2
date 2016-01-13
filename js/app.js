App = Ember.Application.create();

App.Router.map(function() {
  this.route('index', { path: '/' });
  this.route("pokemon", { path: "/:pkdx_id" });
});

App.IndexRoute = Ember.Route.extend({

  actions: {
    showPokemon: function(){
      alert('showPokemon');
    }
  },

  model: function() {

    var pokemonArray = [];

    toThreeDigits = function(string) {
      return ('000'+string).slice(-3)
    },

    pokemonRequest = function(i){

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        response.pkdx_id = toThreeDigits(response.pkdx_id)
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
