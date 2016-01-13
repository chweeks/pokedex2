App = Ember.Application.create();

App.Router.map(function() {
  this.route('index', { path: '/' });
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

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        pokemonArray.pushObject(response);
      });

      // pokemonArray.push({name: 'Bulbasaur', pkdx_id: 1, types: [{name:'grass'}, {name:'poison'}]});
      // pokemonArray.push({name: 'Ivysaur', pkdx_id: 2, types: [{name:'grass'}, {name:'water'}]});
      // pokemonArray.push({name: 'Venasaur', pkdx_id: 3, types: [{name:'grass'}, {name:'poison'}]});
      // pokemonArray.push({name: 'Charmander', pkdx_id: 4, types: [{name:'fire'}, {name:'normal'}]});
      // pokemonArray.push({name: 'Charmeleon', pkdx_id: 5, types: [{name:'fire'}, {name:'normal'}]});
      // pokemonArray.push({name: 'Charizard', pkdx_id: 6, types: [{name:'fire'}, {name:'flying'}]});
      // pokemonArray.push({name: 'Pidgey', pkdx_id: 7, types: [{name:'normal'}, {name:'flying'}]});
      // pokemonArray.push({name: 'Pidgiotto', pkdx_id: 8, types: [{name:'normal'}, {name:'flying'}]});
      //
      // return pokemonArray;
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
