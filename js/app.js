App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({

  model: function() {

    var pokemonArray = [];

    var pokemonRequest = function(i){
      return $.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        pokemonArray.push(response);
      });
    };

    for(var i=1; i<17; i++){
      pokemonRequest(i);
    };
    return pokemonArray
  }
});
