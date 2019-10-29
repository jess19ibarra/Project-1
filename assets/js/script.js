//Fade Out
setInterval(function () {
    $(".fade-out").hide();
}, 3500);


// Initialize Firebase and change the values of the config values with your own Firebase config values.
var config = {
    apiKey: "AIzaSyCIHEL78Eki3saKNSEVF0UbxQm9_uVRSLk",
    authDomain: "nomnom-43b5b.firebaseapp.com",
    databaseURL: "https://nomnom-43b5b.firebaseio.com",
    projectId: "nomnom-43b5b",
    storageBucket: "nomnom-43b5b.appspot.com",
    messagingSenderId: "471286336226",
    appId: "1:471286336226:web:622e73cbcf9ee3b0c82cbb",
    measurementId: "G-KNKHCM19XZ"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//////////////////////////////////// Jarrells Code //////////////////////////////////
var API_KEY = 'f6b0191db074400e9f49de7c57844a19';

//General Search Code 

$("#generalBtn").on("click", function () {
    $(".layout-1").hide();
    $(".layout-2").hide();
    $(".layout-3").show();
    $(".layout-4").hide();
    $("#recipe-details, #instructions, #ingredients").empty();

})

var ingredients = [];
//Event Handler to run when user types in input
$(".btn-add").on("click", function (e) {
    //Prevents default functionality to stop page reload
    e.preventDefault();

    //Empties the html results
    $("#recipe-details, #search-results").empty();
    $("#search-results").append(loader);

    //Gets the value of what the user typed in search bar
    var query = $("#general-search").val();
    //The api call url
    var url = "https://api.spoonacular.com/recipes/search?query=" + query + "&apiKey=" + API_KEY;

    $.ajax({
        url,
        method: "GET"
    }).then(function (response) {
        $("#search-results").empty();

        //Loops through search results and adds the list of recipes that pops up
        response.results.forEach(function (result) {
            $("#search-results").append("<li class='main-result list-group-item' data-recipe-id='" + result.id + "'>" +
                "<div class='media'>" +
                "<img class='mr-3'style='max-width: 150px;' src='https://spoonacular.com/recipeImages/" + result.image + "'>" +
                "<div class='media-body'" +
                "<h3>" + result.title + "</h3>" +
                "<p>Ready in " + result.readyInMinutes + " minutes</p>" +
                "<p>" + result.servings + " servings</p>" +
                "</div>" +
                "</div>" +
                "</li>");
        });
    });

});


//Ingredients Search Code

$("#ingredientBtn").on("click", function () {
    $(".layout-1").show();
    $(".layout-2").hide();
    $(".layout-3").hide();
    $(".layout-4").hide();
    $("#recipe-details, #instructions, #ingredients").empty();

})


var myIngredients = [];

$(".ingredient-add").on("click", function (e) {
    //Empties the html results
    $("#recipe-details, #search-results").empty();

    e.preventDefault();

    var ingredient = $("#ingredients-search").val();
    myIngredients.push(ingredient);

    $("#ingredientsList").empty();
    myIngredients.forEach(function (ingredient) {
        $("#ingredientsList").append("<li class='ingredient list-group-item'><p>" + ingredient + "</p><i class='removeIngredient fas fa-times'></i></li>");
    })

    $("#ingredients-search").val("");

    var queryIngredients = myIngredients.join(",");

    var ingredientsUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + queryIngredients + "&number=10&apiKey=" + API_KEY;

    $("#ingredient-results").empty();
    $("#ingredient-results").append(loader);

    $.ajax({
        url: ingredientsUrl,
        method: "GET"
    }).then(function (response) {
        $("#ingredient-results").empty();

        response.forEach(function (result) {
            var missingString;
            var googleBtn;

            if (result.missedIngredients.length > 0) {
                var missingIngredients = [];

                result.missedIngredients.forEach(function (missing) {
                    missingIngredients.push(missing.name);
                });

                missingString = missingIngredients.join(",");

                ///for the google places modal///　

                googleBtn = "<button type='button' class='btn btn-dark googleBtn 'data-toggle='modal' data-target='#googleModel'>View Nearby Stores</button>";
            } else {
                missingString = "None!";
                googleBtn = "";
            }

            $("#ingredient-results").append("<li class='main-result list-group-item' data-recipe-id='" + result.id + "'>" +
                "<div class='media'>" +
                "<img class='mr-3'style='max-width: 150px;' src='" + result.image + "'>" +
                "<div class='media-body'" +
                "<h3>" + result.title + "</h3>" +
                "<p>Likes: " + result.likes + "</p>" +
                "<p>Missing Ingredients: " + missingString + "</p>" +
                googleBtn +
                "</div>" +
                "</div>" +
                "</li>");
        });
    })
});

$("#ingredientsList").on("click", ".removeIngredient", function () {
    var ingredient = $(this).prev().text();

    var index = myIngredients.indexOf(ingredient);
    myIngredients.splice(index, 1);

    $(this).parent().remove();

    if (myIngredients.length > 0) {
        var queryIngredients = myIngredients.join(",");

        var ingredientsUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + queryIngredients + "&number=10&apiKey=" + API_KEY;

        $("#ingredient-results").empty();
        $("#ingredient-results").append(loader);

        $.ajax({
            url: ingredientsUrl,
            method: "GET"
        }).then(function (response) {
            $("#ingredient-results").empty();

            response.forEach(function (result) {
                var missingString;
                var googleBtn;

                if (result.missedIngredients.length > 0) {
                    var missingIngredients = [];

                    result.missedIngredients.forEach(function (missing) {
                        missingIngredients.push(missing.name);
                    });

                    missingString = missingIngredients.join(",");

                    ///for the google places modal///　

                    googleBtn = "<button type='button' class='btn btn-dark googleBtn 'data-toggle='modal' data-target='#googleModel'>View Nearby Stores</button>";
                } else {
                    missingString = "None!";
                    googleBtn = "";
                }

                $("#ingredient-results").append("<li class='main-result list-group-item' data-recipe-id='" + result.id + "'>" +
                    "<div class='media'>" +
                    "<img class='mr-3'style='max-width: 150px;' src='" + result.image + "'>" +
                    "<div class='media-body'" +
                    "<h3>" + result.title + "</h3>" +
                    "<p>Likes: " + result.likes + "</p>" +
                    "<p>Missing Ingredients: " + missingString + "</p>" +
                    googleBtn +
                    "</div>" +
                    "</div>" +
                    "</li>");
            });
        })
    }
});

///google places api ///

var map;
var service;
var infowindow;

function initMap() {
    var dallas = new google.maps.LatLng(-33.867, 151.195);

    infowindow = new google.maps.InfoWindow();

    map = new google.maps.Map(
        document.getElementById('map'), { center: dallas, zoom: 15 });

    var request = {
        query: 'grocery store',
        fields: ['name', 'geometry'],
    };

    service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
        }
    });
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

$("#ingredient-results").on("click", ".googleBtn", initMap);

//Browse Recipes Code

var loader = '<div class="loader">' +
    '<div class="loader-inner pacman" >' +
    '<div></div>' +
    '<div></div>' +
    '<div></div>' +
    '<div></div>' +
    '<div></div>' +
    '</div>' +
    '</div>';

$("#browseBtn").on("click", function () {

    $(".layout-1").hide();
    $(".layout-2").show();
    $(".layout-3").hide();
    $(".layout-4").hide();
    $("#recipe-details, #instructions, #ingredients").empty();


    $("#browse-results").empty();
    $("#browse-results").append(loader);

    var url = "https://api.spoonacular.com/recipes/random?number=10&apiKey=" + API_KEY;

    $.ajax({
        url,
        method: "GET"
    }).then(function (response) {
        $("#search-results").empty();
        $("#browse-results").empty();

        // Loops through search results and adds the list of recipes that pops up
        response.recipes.forEach(function (result) {
            $("#browse-results").append("<li class='main-result list-group-item' data-recipe-id='" + result.id + "'>" +
                "<div class='media'>" +
                "<img class='mr-3'style='max-width: 150px;' src='" + result.image + "'>" +
                "<div class='media-body'" +
                "<h3>" + result.title + "</h3>" +
                "<p>Ready in " + result.readyInMinutes + " minutes</p>" +
                "<p>" + result.servings + " servings</p>" +
                "</div>" +
                "</div>" +
                "</li>");
        });

    });
})



$("#ingredientsClear").on("click", function () {
    $("#ingredientsList").empty();
    $("#ingredient-results").empty();
    myIngredients = [];
})


function getInstructions(id) {
    $("#instructions").empty();

    //api call for recipe instructions 
    var instructionsUrl = "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=" + API_KEY;

    $.ajax({
        url: instructionsUrl,
        method: "GET"
    }).then(function (steps) {
        //loops the instructions array and adds it to the instructions html
        $("#instructions").append("<h3>Instructions:</h3>");
        steps[0].steps.forEach(function (step) {
            $("#instructions").append("<p><strong>" + step.number + "</strong>: " + step.step + " </p>");
        });
    });
}

function getIngredients(id) {
    $("#ingredients").empty();

    //api call for recipe ingredients 
    var ingredientsUrl = "https://api.spoonacular.com/recipes/" + id + "/ingredientWidget.json?apiKey=" + API_KEY;

    $.ajax({
        url: ingredientsUrl,
        method: "GET"
    }).then(function (ingredients) {
        //loops the ingrediets array and adds it to the ingredients html
        $("#ingredients").append("<h3>Ingredients:</h3>");
        ingredients.ingredients.forEach(function (ingredient) {
            $("#ingredients").append("<p><strong>" + ingredient.name + "</strong>: " + ingredient.amount.us.value + " " + ingredient.amount.us.unit + " </p>");
        });
    });
}

//Populate search results in list form code

//Event Handler for when user clicks result item
$("#search-results, #favorite-results, #browse-results, #ingredient-results").on("click", ".main-result", function () {

    //Empties the html results
    $("#recipe-details, #instructions, #ingredients").empty();
    $("#current-recipe").append(loader);

    //Gets id of recipe
    var id = $(this).data("recipe-id");

    //The api call url
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + API_KEY;

    $.ajax({
        url,
        method: "GET"
    }).then(function (response) {
        $("#current-recipe .loader").remove();
        //Displays recipe details
        $("#recipe-details").html("<h3>" + response.title + "</h3>" +
            "<p>Likes: " + response.aggregateLikes + "</p>" +
            "<p class='favorite' data-id='" + response.id + "'>Favorite Me</p>" +
            "<p>Health Score: " + response.healthScore + "</p>" +
            "<p>Ready in " + response.readyInMinutes + " minutes</p>" +
            "<p>Price per serving: $" + response.pricePerServing + "</p>" +
            "<p>Servings: " + response.servings + "</p>");
    });

    //Gets Ingredients
    getIngredients(id);
    //Gets Instructions
    getInstructions(id);


});

$("#recipe-details").on("click", ".favorite", function () {
    var recipeId = $(this).data("id");

    var user = firebase.auth().currentUser;

    var userEmail = user.email.replace(".", "");

    if (user) {
        firebase.database().ref("users/" + userEmail + "/favorites/").push({
            recipeId
        })
    }
})

$("#myRecipes").on("click", function (e) {
    e.preventDefault();
    $(".layout-1").hide();
    $(".layout-2").hide();
    $(".layout-3").hide();
    $(".layout-4").show();
    $("#recipe-details, #instructions, #ingredients").empty();

    $("#favorite-results").empty();
    $("#favorite-results").append(loader);

    var user = firebase.auth().currentUser;

    var userEmail = user.email.replace(".", "");

    if (user) {
        firebase.database().ref("users/" + userEmail + "/favorites/").on("child_added", function (data) {

            var url = "https://api.spoonacular.com/recipes/" + data.val().recipeId + "/information?apiKey=" + API_KEY;

            $.ajax({
                url,
                method: "GET"
            }).then(function (result) {
                $("#favorite-results").empty();
                $("#favorite-results").append("<li class='main-result list-group-item' data-recipe-id='" + result.id + "'>" +
                    "<div class='media'>" +
                    "<img class='mr-3'style='max-width: 150px;' src='" + result.image + "'>" +
                    "<div class='media-body'" +
                    "<h3>" + result.title + "</h3>" +
                    "<p>Ready in " + result.readyInMinutes + " minutes</p>" +
                    "<p>" + result.servings + " servings</p>" +
                    "</div>" +
                    "</div>" +
                    "</li>");
            });

        })
    }
})

////////////////////////////// END OF JARRELLS CODE ///////////////////////////////////

////////////////////////////// START OF JESSICA I CODE ///////////////////////////////



$(".signupbtn").on("click", function (event) {
    event.preventDefault();

    var email = $("#email").val();
    var password = $("#psw").val();

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var userEmail = user.email.replace(".", "");

            firebase.database().ref('users/' + userEmail).set({
                email: userEmail
            })

            window.location.href = "index.html";
        }
    });
})

$("#login").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    var email = $("#email").val();
    var password = $("#psw").val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href = "index.html";
        }
    });
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        $("#loginLink").hide();
        $("#logoutLink").show();
        $("#userLoggedIn").show();
        $("#userLoggedOut").hide();
        var emailArr = user.email.split("@");
        var email = emailArr[0];
        $("#user-email").text(email);
        $("#myRecipes").show();
        $("#myRecipesSignedout").hide();
    } else {
        // No user is signed in.
        $("#loginLink").show();
        $("#logoutLink").hide();
        $("#myRecipes").hide();
        $("#myRecipesSignedout").show();
        $("#userLoggedIn").hide();
        $("#userLoggedOut").show();
    }
});


$("#logoutLink").on("click", function (e) {
    e.preventDefault();

    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        $("#loginLink").show();
        $("#logoutLink").hide();
    })
})


///function for menu/// Junko's code///

function openNav() {
    $("#mysidenav").css({ "transform": "translateX(0)" });
};

function closeNav() {
    $("#mysidenav").css({ "transform": "translateX(-100%)" });
};

