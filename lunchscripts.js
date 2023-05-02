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
    this.descriptionFile = b; // file name to the HTML snippet containing this recipe's ingredients list
    this.ingredientsFile = c; //file name to the HTML snippet containing this recipe's directions list 
    this.directionsFile = d; //file name to the HTML snippent containing this recipe's description
    this.imageSource = e; // URL or file name to teh recipe photo
 

    //update the display with the content for this recipe
    this.display = function() {
        document.querySelector("#hero h1").innerHTML = this.name;
        loadFileInto(this.descriptionFile, "#des");
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

let bLunch = new Recipe( "Barbie's Tuna Salad",
                            "b/bLunchIng.html", 
                            "b/bLunchDir.html", 
                            "b/bLunchDes.html",
                            "https://www.cookingclassy.com/wp-content/uploads/2020/03/tuna-salad-3.jpg");

let cLunch = new Recipe( "Colleen's Mac N' Cheese",
                            "c/cLunchIng.html", 
                            "c/cLunchDir.html", 
                            "c/cLunchDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/clunch.png");

let dLunch = new Recipe(  "Drake's Cucumber Caprese Salad",
                            "d/dLunchIng.html", 
                            "d/dLunchDir.html", 
                            "d/dLunchDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/dlunch.png");

let eLunch = new Recipe(  "Ernie's Sausage Stuffed Jalepenos",
                            "e/eLunchIng.html", 
                            "e/eLunchDir.html", 
                            "e/eLunchDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/elunch.png");

let aLunch = new Recipe(  "Aspen's Split Pea Soup",
                            "a/aLunchIng.html", 
                            "a/aLunchDir.html", 
                            "a/aLunchDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/alunch.png");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    
    bLunch.addToNav();
    cLunch.addToNav();
    dLunch.addToNav();
    eLunch.addToNav();
    aLunch.addToNav();

    
});