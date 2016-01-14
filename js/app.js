App = Ember.Application.create();

App.Router.map(function() {
  this.route('index', { path: '/' });
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

  model: function() {

    var pokemonArray = [];

    toThreeDigits = function(pkdx_id) {
      return ('000'+pkdx_id).slice(-3);
    },

    dividebyTen = function(string) {
      return ((parseInt(string))/10).toString();
    },

    pokemonRequest = function(i){

      return Ember.$.getJSON("http://pokeapi.co/api/v1/pokemon/"+i.toString()+"/").then(function(response) {
        response.pkdx_id = toThreeDigits(response.pkdx_id);

        response.generalStats = [{value: dividebyTen(response.height), name: 'Height'},
                                 {value: dividebyTen(response.weight), name: 'Weight'},
                                 {value: 'F/M', name: 'Gender'}]

        response.baseStats = [{value: response.hp, name: 'HP'},
                              {value: response.attack, name: 'Attack'},
                              {value: response.defense, name: 'Defense'},
                              {value: response.sp_atk, name: 'Special Attack'},
                              {value: response.sp_def, name: 'Special Defense'},
                              {value: response.speed, name: 'Speed'}]
        pokemonArray.pushObject(response);
      });
    };

    collectPokemon = function(noOfPokemon){
      for(var i=1; i<noOfPokemon+1; i++){
        pokemonRequest(i);
      };
      return pokemonArray;
    };
    return collectPokemon(16);
  }
});
