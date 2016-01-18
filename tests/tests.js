// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
  setup: function() {
    // before each test, ensure the application is ready to run.
    Ember.run(App, App.advanceReadiness);
  },

  teardown: function() {
    // reset the application state between each test
    App.reset();
  }
});

test("Checks basic layout", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal($(".banner p").text(), "POKÉDEX", "Application header is rendered");
    equal($(".title").text(), "POKÉDEX", "Title is rendered");
    ok($(".buttonCentre"), "load more button rendered");
  });
});

// QUnit test case
test("Checks retrieval of first 16 pokemon", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal($(".pokeSquare").length, 16, "16 Pokemon are rendered");
    equal($('.pokeId h4:first').text(), 'Bulbasaur', 'Bulbasaur rendered first');
    ok(($(".pokeId h4").text().indexOf('Ivysaur') > -1), "Ivysaur rendered");
    ok(($(".pokeId h4").text().indexOf('Venusaur') > -1), "Venusaur rendered");
    ok(($(".pokeId h4").text().indexOf('Charmander') > -1), "Charmander rendered");
    ok(($(".pokeId h4").text().indexOf('Charmeleon') > -1), "Charmeleon rendered");
    ok(($(".pokeId h4").text().indexOf('Charizard') > -1), "Charizard rendered");
    ok(($(".pokeId h4").text().indexOf('Squirtle') > -1), "Squirtle rendered");
    ok(($(".pokeId h4").text().indexOf('Wartortle') > -1), "Wartortle rendered");
    ok(($(".pokeId h4").text().indexOf('Blastoise') > -1), "Blastoise rendered");
    ok(($(".pokeId h4").text().indexOf('Caterpie') > -1), "Caterpie rendered");
    ok(($(".pokeId h4").text().indexOf('Metapod') > -1), "Metapod rendered");
    ok(($(".pokeId h4").text().indexOf('Butterfree') > -1), "Butterfree rendered");
    ok(($(".pokeId h4").text().indexOf('Weedle') > -1), "Weedle rendered");
    ok(($(".pokeId h4").text().indexOf('Kakuna') > -1), "Kakuna rendered");
    ok(($(".pokeId h4").text().indexOf('Beedrill') > -1), "Beedrill rendered");
    equal($('.pokeId h4:last').text(), 'Pidgey', "Pidgey rendered last");
  });
});

test("Checks correct types are rendered", function() {
  // async helper telling the application to go to the '/' route
  visit("/");

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal($(".typeContainer").length, 16, "16 type containers are rendered");
    ok(($('.typeContainer:first').text().indexOf('poison') > -1), 'Bulbasaur has type poison');
    ok(($('.typeContainer:first').text().indexOf('grass') > -1), 'Bulbasaur has type grass');
    ok(($('.typeContainer:last').text().indexOf('normal') > -1), 'Pidgey has type normal');
    ok(($('.typeContainer:last').text().indexOf('flying') > -1), 'Pidgey has type flying');
  });
});

test("After pokemon clicked", function() {
  // async helper telling the application to go to the '/' route
  visit("/151");
  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal($(".pokemonName h1").text(), 'Mew', "correct pokemon name rendered");
    equal($(".pokemonName span").text(), '#151 ', "correct pokemon Id name rendered");
    ok(($('.rightnav h3').text(), ('#001 bulbasaur')), "correct pokemon name in nav bar");
    ok(($(".leftNav h3").text(), ('#150 mewtwo')), "correct pokemon name in nav bar");
    ok(($(".profileTypeLeft").text().indexOf('psychic') >-1), "correct left pokemon type rendered");
    equal($(".profiileTypeRight").text(), '', "correct right pokemon name rendered");
    ok(($(".summary").text().indexOf('MEW is said to possess the genetic composition of all POKMON.') >-1), "correct pokemon summary rendered");
    equal($(".leftStats h3").text(), 'HeightWeightGender', "correct stat names rendered");
    equal($(".leftStats p").text(), '0.4m4KgF/M', "correct stat values rendered");
    equal($(".rightStats p").text(), 'Unknownsynchronize', "correct species/ability name rendered");
    ok(($(".barKey p").text().indexOf('Attack') >-1), "HP stat rendered rendered");
    ok(($(".barLevel p").text().indexOf('100') >-1), "Correct hp stat rendered");
    ok(($(".barKey p").text().indexOf('Attack') >-1), "Attack stat rendered rendered");
    ok(($(".barLevel p").text().indexOf('100') >-1), "Correct attack stat rendered");
    ok(($(".barKey p").text().indexOf('Defense') >-1), "Defense stat rendered");
    ok(($(".barLevel p").text().indexOf('100') >-1), "Correct defense stat rendered");
    ok(($(".barKey p").text().indexOf('Special Attack') >-1), "Special Attack stat rendered");
    ok(($(".barLevel p").text().indexOf('100') >-1), "Correct special attack stat rendered");
    ok(($(".barKey p").text().indexOf('Special Defense') >-1), "Special Defense stat rendered");
    ok(($(".barLevel p").text().indexOf('100') >-1), "Correct special defense stat rendered");
    ok(($(".barKey p").text().indexOf('Speed') >-1), "Speed stat rendered");
    ok(($(".barLevel p").text().indexOf('100') >-1), "Correct speed stat rendered");
    ok($(".explore"), "explore more pokemon button rendered");
  });
});
