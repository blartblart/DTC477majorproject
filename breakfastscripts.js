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
function Recipe(a, b, c, d, e) {

    //set object properties
    this.name = a;
    this.ingredientsFile = b; // file name to the HTML snippet containing this recipe's ingredients list
    this.directionsFile = c; //file name to the HTML snippet containing this recipe's directions list 
    this.descriptionFile = d; //file name to the HTML snippent containing this recipe's description
    this.imageSource = e; // URL or file name to teh recipe photo

    //update the display with the content for this recipe
    this.display = function() {
        document.querySelector("#hero h1").innerHTML = this.name;
        loadFileInto(this.ingredientsFile, "#ing");
        loadFileInto(this.directionsFile, "#dir");
        loadFileInto(this.descriptionFile, "#des");
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

let aBreakfast = new Recipe( "Aspen's Tofu Breakfast Bowl",
                            "a/aBreakfastIng.html", 
                            "a/aBreakfastDir.html", 
                            "a/aBreakfastDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/abreakfast.png");

let bBreakfast = new Recipe( "Barbie's Overnight Oats",
                            "b/bBreakfastIng.html", 
                            "b/bBreakfastDir.html", 
                            "b/bBreakfastDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/bbreakfast.png");

let cBreakfast = new Recipe(  "Colleen's Summer Garden Quiche",
                            "c/cBreakfastIng.html", 
                            "c/cBreakfastDir.html", 
                            "c/cBreakfastDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/cbreakfast.png");

let dBreakfast = new Recipe(  "Drake's Chocolate Banana Crepes",
                            "d/dBreakfastIng.html", 
                            "d/dBreakfastDir.html", 
                            "d/dBreakfastDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/dbreakfast.png");

let eBreakfast = new Recipe(  "Ernie's Breakfast Kolaches",
                            "e/eBreakfastIng.html", 
                            "e/eBreakfastDir.html", 
                            "e/eBreakfastDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/ebreakfast.png");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    
    aBreakfast.addToNav();
    bBreakfast.addToNav();
    cBreakfast.addToNav();
    dBreakfast.addToNav();
    eBreakfast.addToNav();

    
});
