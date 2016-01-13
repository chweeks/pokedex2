App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({

  actions: {
    showPokemon: function(){
      alert('showPokemon');
    }
  },

  model: function() {

    var pokemonArray = [];

    pokemonRequest = function(i){
      return $.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        pokemonArray.push(response);
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
