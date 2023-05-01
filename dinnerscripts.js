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

let cDinner = new Recipe( "Colleen's Pressure Cooker Pork Chops",
                            "c/cDinnerIng.html", 
                            "c/cDinnerDir.html", 
                            "c/cDinnerDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/cdinner.png");

let dDinner = new Recipe( "Drake's Shakshuka",
                            "d/dDinnerIng.html", 
                            "d/dDinnerDir.html", 
                            "d/dDinnerDes.html",
                            "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F9055595.jpg&q=60&c=sc&orient=true&poi=auto&h=512%22);");

let eDinner = new Recipe(  "Ernie's Sliders",
                            "e/eDinnerIng.html", 
                            "e/eDinnerDir.html", 
                            "e/eDinnerDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/edinner.png");

let aDinner = new Recipe(  "Aspen's Baked Polenta with Radicchio",
                            "a/aDinnerIng.html", 
                            "a/aDinnerDir.html", 
                            "a/aDinnerDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/adinner.png");

let bDinner = new Recipe(  "Barbie's Beef Stir Fry",
                            "b/bDinnerIng.html", 
                            "b/bDinnerDir.html", 
                            "b/bDinnerDes.html",
                            "https://elnazarov.reclaim.hosting/shelter/bdinner.png");

// don't do anything until the DOM loads
document.addEventListener("DOMContentLoaded", function() {
    
    cDinner.addToNav();
    dDinner.addToNav();
    eDinner.addToNav();
    aDinner.addToNav();
    bDinner.addToNav();

    
});