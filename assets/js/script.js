
//////////////////////////////////// Jarrells Code //////////////////////////////////
var API_KEY = '09f6d2653d8c4ecd9fcbf576a46890d0';

//Event Handler to run when user types in input
$("#general-search").on("change", function (e) {
    //Prevents default functionality to stop page reload
    e.preventDefault();

    //Empties the html results
    $("#recipe-details, #search-results").empty();

    //Gets the value of what the user typed in search bar
    var query = $(this).val();

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

//Find Recipe By Ingredients Code

var myIngredients = [];

$("#ingredients-search").on("change", function (e) {

    //Empties the html results
    $("#recipe-details, #search-results").empty();

    e.preventDefault();

    var ingredient = $(this).val();
    myIngredients.push(ingredient);

    $("#myIngredients").empty();
    myIngredients.forEach(function (ingredient) {
        $("#myIngredients").append("<li class='ingredient'>" + ingredient + "</li>");
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

            if (result.missedIngredients.length > 0) {
                var missingIngredients = [];

                result.missedIngredients.forEach(function (missing) {
                    missingIngredients.push(missing.name);
                });

                missingString = missingIngredients.join(",");
            } else {
                missingString = "None!";
            }

            $("#search-results").append("<li class='main-result' data-recipe-id='" + result.id + "'>" +
                "<h3>" + result.title + "</h3>" +
                "<p>Likes: " + result.likes + "</p>" +
                "<p>Missing Ingredients: " + missingString + "</p>"
                + "<img style='max-width: 400px;' src='" + result.image + "'>" +
                "</li>");
        });
    })
});



//Browse Recipes


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

        ////////////////////////////// END OF JARRELLS CODE ///////////////////////////////////

        ////////////////////////////// START OF JESSICA I CODE ///////////////////////////////


        // $.ajax({
        //     url: "https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=" + API_KEY,
        //     method: "GET"
        // }).then(function (ingredients) {
        //     console.log(ingredients);
        // });

        // $.ajax({
        //     url: "https://api.spoonacular.com/recipes/random?apiKey=" + API_KEY,
        //     method: "GET"
        // }).then(function (popular) {
        //     console.log(popular);
        // });