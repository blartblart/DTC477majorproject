// function to load text from another file into a DOM element
function loadFileInto(fromFile, whereTo) {

    // initiate the fetch promise
    let remoteData = fetch(fromFile)
        .then( function(response) { 
            // if OK, convert response into text, otherwise trigger the Promise error
            if (response.ok) return response.text();
            else return Promise.reject(response); // trigger error
        } )
        .then( function(responseResult) {
            // update the page
            document.querySelector(whereTo).innerHTML = responseResult;

            // report success
            console.log("Loaded " + fromFile + " into " + whereTo);

        } )
        .catch( function(error){
            // report any errors
            console.log( ("Could not load " + fromFile + " into " + whereTo + ". Specific error: "), error);
        } );
    
}

//define a recipe object constructor
function Recipe(a, b, c, d) {

    //set object properties
    this.name = a;
    this.ingredientsFile = b; // file naem to the HTML snippet containg this recipe's ingredients list
    this.directionsFile = c; //file neame to the HTML snippet containg this recipe's directions list 
    this.imageSource = d; // URL or file name to teh recipe photo

    //update the display with the content for this recipe
    this.display = function() {
        document.querySelector("#hero h1").innerHTML = this.name;
        loadFileInto(this.ingredientsFile, "#ing");
        loadFileInto(this.directionsFile, "#dir");
        document.querySelector("#hero").style.backgroundImage = "url(" + this.imageSource + ")";
        document.title = "Recipe: " + this.name;
    }// end of .display() method

    // add this recipe to the #navbar ul as a new li tag that is clickable
    this.addToNav = function() {

        //create new element for the navbar
        let newNavLI = document.createElement("li");
        newNavLI.innerHTML = this.name;
        document.querySelector("#navbar ul").appendChild(newNavLI);
        
        //preserve recipe self "this" in a different variable to use within the event listener
        let recipeSelf = this;
        newNavLI.addEventListener("click", function() {
            recipeSelf.display();
        })
    }// end of .addToNav() method
}

let shakshuka = new Recipe( "Drake's Shakshuka",
                            "ingredients.html", 
                            "directions.html", 
                            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9055595.jpg&q=60&c=sc&orient=true&poi=auto&h=512");

let tunaSalad = new Recipe( "Barbie's Tuna Salad",
                            "tunaing.html", 
                            "tunadir.html", 
                            "https://www.cookingclassy.com/wp-content/uploads/2020/03/tuna-salad-3.jpg");

let cobbler = new Recipe(  "Patricia's Blackberry Cobbler",
                            "cobblering.html", 
                            "cobblerdir.html", 
                            "https://www.cookingmamas.com/wp-content/uploads/2012/03/Blackberry-Cobbler-1024x793.jpg");



// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    
    shakshuka.addToNav();
    tunaSalad.addToNav();
    cobbler.addToNav();

    
});
