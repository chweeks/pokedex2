App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({

  model: function() {
    var pokemonRequest = function(i){
      return $.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        pokemonArray.push(response);
        if(i==16){
          return pokemonArray
        }
      });
    }

    for(var i=1; i<17; i++){
      var pokemonArray = [];
      pokemonRequest(i);
    };
    console.log(pokemonArray)
  }
});
