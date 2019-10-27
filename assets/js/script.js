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
var API_KEY = '09f6d2653d8c4ecd9fcbf576a46890d0';

//General Search Code 
var ingredients = [];
//Event Handler to run when user types in input
$(".btn-add").on("click", function (e) {
    //Prevents default functionality to stop page reload
    e.preventDefault();

    //Empties the html results
    $("#recipe-details, #search-results").empty();

    //Gets the value of what the user typed in search bar
    var query = $("#general-search").val();
    //The api call url
    var url = "https://api.spoonacular.com/recipes/search?query=" + query + "&apiKey=" + API_KEY;

    $.ajax({
        url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#search-results").empty();

        //Loops through search results and adds the list of recipes that pops up
        response.results.forEach(function (result) {
            $("#search-results").append("<li class='main-result' data-recipe-id='" + result.id + "'>" +
                "<h3>" + result.title + "</h3>" +
                "<p>Ready in " + result.readyInMinutes + " minutes</p>" +
                "<p>" + result.servings + " servings</p>"
                + "<img style='max-width: 400px;' src='https://spoonacular.com/recipeImages/" + result.image + "'>" +
                "</li>");
        });
    });

});


//Recipe Search Code

var myIngredients = [];

$("#ingredients-search").on("change", function (e) {
    console.log(this)
    //Empties the html results
    $("#recipe-details, #search-results").empty();

    e.preventDefault();

    var ingredient = $(this).val();
    myIngredients.push(ingredient);

    $("#ingredientsList").empty();
    myIngredients.forEach(function (ingredient) {
        $("#ingredientsList").append("<li class='ingredient'>" + ingredient + "</li>");
    })

    $(this).val("");

    var queryIngredients = myIngredients.join(",");
    console.log(queryIngredients);

    var ingredientsUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + queryIngredients + "&number=10&apiKey=" + API_KEY;

    $("#search-results").empty();

    $.ajax({
        url: ingredientsUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        response.forEach(function (result) {
            var missingString;
            var googleBtn;

            if (result.missedIngredients.length > 0) {
                var missingIngredients = [];

                result.missedIngredients.forEach(function (missing) {
                    missingIngredients.push(missing.name);
                });

                missingString = missingIngredients.join(",");

                ///for the google places modal///　ジェイラ

                googleBtn = "<button type='button' class='btn btn-dark'data-toggle='modal' data-target='#googleModel' id='googleBtn'>View Nearby Stores</button>";
            } else {
                missingString = "None!";
                googleBtn = "";
            }

            $("#search-results").append("<li class='main-result' data-recipe-id='" + result.id + "'>" +
                "<h3>" + result.title + "</h3>" +
                "<p>Likes: " + result.likes + "</p>" +
                "<p>Missing Ingredients: " + missingString + "</p>" +
                googleBtn +
                "<img style='max-width: 400px;' src='" + result.image + "'>" +
                "</li>");
        });
    })
});

///google places api is the worst/// グーグルプレイズは最悪だ。

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

// $("#googleBtn").on("click", initMap);



//Browse Recipes Code


$("#browseButton").on("click", function () {
    var url = "https://api.spoonacular.com/recipes/random?number=10&apiKey=" + API_KEY;

    $.ajax({
        url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // $("#search-results").empty();

        //Loops through search results and adds the list of recipes that pops up
        response.recipes.forEach(function (result) {
            $("#search-results").append("<li class='main-result' data-recipe-id='" + result.id + "'>" +
                "<h3>" + result.title + "</h3>" +
                "<p>Ready in " + result.readyInMinutes + " minutes</p>" +
                "<p>" + result.servings + " servings</p>"
                + "<img style='max-width: 400px;' src='" + result.image + "'>" +
                "</li>");
        });

    });
})



$("#ingredientsClear").on("click", function () {
    $("#myIngredients").empty();
})


function getInstructions(id) {
    $("#instructions").empty();

    //api call for recipe instructions 
    var instructionsUrl = "https://api.spoonacular.com/recipes/" + id + "/analyzedInstructions?apiKey=" + API_KEY;

    $.ajax({
        url: instructionsUrl,
        method: "GET"
    }).then(function (steps) {
        // console.log(steps);
        //loops the instructions array and adds it to the instructions html
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
        // console.log(ingredients);
        //loops the ingrediets array and adds it to the ingredients html
        ingredients.ingredients.forEach(function (ingredient) {
            $("#ingredients").append("<p><strong>" + ingredient.name + "</strong>: " + ingredient.amount.us.value + " " + ingredient.amount.us.unit + " </p>");
        });
    });
}

//Populate search results in list form code

//Event Handler for when user clicks result item
$("#search-results").on("click", ".main-result", function () {

    //Empties the html results
    $("#recipe-details, #instructions, #search-results").empty();

    //Gets id of recipe
    var id = $(this).data("recipe-id");

    //The api call url
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=" + API_KEY;

    $.ajax({
        url,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        //Displays recipe details
        $("#recipe-details").html("<h3>" + response.title + "</h3>" +
            "<p>Likes: " + response.aggregateLikes + "</p>" +
            "<p class='favorite' data-id='" + response.id + "'>Favorite Me</p>" +
            "<p>Health Score: " + response.healthScore + "</p>" +
            "<p>Ready in " + response.readyInMinutes + " minutes</p>" +
            "<p>Price per serving: $" + response.pricePerServing + "</p>" +
            "<p>Servings: " + response.servings + "</p>");
    });

    //Gets Instructions
    getInstructions(id);
    //Gets Ingredients
    getIngredients(id);


});

$("#recipe-details").on("click", ".favorite", function () {
    var recipeId = $(this).data("id");

    var user = firebase.auth().currentUser;

    if (user) {
        firebase.database().ref("users/" + user.uid + "/favorites/").push({
            recipeId
        })
    }
})

$("#myRecipes").on("click", function () {
    var user = firebase.auth().currentUser;

    if (user) {
        firebase.database().ref("users/" + user.uid + "/favorites/").on("child_added", function (data) {
            console.log(data.val().recipeId);
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
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid
            })

            window.location.href = "index.html";
        }
    });
})

$("#login").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    console.log("yes");

    var email = $("#email").val();
    var password = $("#psw").val();

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
        console.log(user);
    } else {
        // No user is signed in.
        $("#loginLink").show();
        $("#logoutLink").hide();
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
    console.log("working");
};

function closeNav() {
    $("#mysidenav").css({ "transform": "translateX(-100%)" });
    console.log("close working");
};

