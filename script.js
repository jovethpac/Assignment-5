// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ul>
   <li>Name: ${json[index].name}</li>
   <li>Diameter: ${json[index].diameter}</li>
   <li>Star: ${json[index].star}</li>
   <li>Distance from Earth: ${json[index].distance}</li>
   <li>Number of Moons: ${json[index].moons}</li>
</ul>
<img src="${}">
*/

//TODO 1: set up a window load handler
window.addEventListener("load", function () {
   //TODO 7: fetch planet data
   //TODO 8: randomly choose one of the planets
   //TODO 9: at 25:10 in video; display info about the chosen planet
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         let i = Math.floor(Math.random() * json.length);
         let missionTarget = document.getElementById("missionTarget");
         missionTarget.innerHTML = `
         <h2>Mission Destination</h2>
<ol>
   <li>Name: ${json[i].name}</li>
   <li>Diameter: ${json[i].diameter}</li>
   <li>Star: ${json[i].star}</li>
   <li>Distance from Earth: ${json[i].distance}</li>
   <li>Number of Moons: ${json[i].moons}</li>
</ol>
<img src="${json[i].image}" height=250></img>`;
         //index = (index + 1) % json.length;
      });

      //TODO 2: set up a submit handler for the form
      let form = document.querySelector("form");
      form.addEventListener("submit", function (event) {

         //TODO 3: cancel submissions using event.preventDefault()
         event.preventDefault();

         //TODO 4: validate that all input have data in them and commit
         //TODO 5: check fuel level and cargo mass, and report launch status (lots of work here)


         let pilotInput = document.querySelector("input[name=pilotName]");
         let copilotInput = document.querySelector("input[name=copilotName]");
         let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
         let cargoMassInput = document.querySelector("input[name=cargoMass]");
         if (pilotInput.value === "" || copilotInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
            alert("All fields are required!"); //alert's user if any field is empty
         } else if (!pilotInput.value.match(/^[A-Za-z ]+$/) || !copilotInput.value.match(/^[A-Za-z ]+$/) || isNaN(Number(fuelLevelInput.value)) || isNaN(Number(cargoMassInput.value))) {
            alert("Enter valid data type."); //forces user to only input letters for pilot and copilot. alert's user if they did not enter a number for fuel level or Cargo Mass
         }
         //TODO 6: make the list visible
         let itemStatus = document.getElementById("itemStatus");  //makes launch information visible
         itemStatus.style.visibility = "visible";

         let pilotStatus = document.getElementById("pilotStatus");
         pilotStatus.innerHTML = `Pilot ${pilotInput.value} is ready for launch`;

         let copilotStatus = document.getElementById("copilotStatus");
         copilotStatus.innerHTML = `Co-pilot ${copilotInput.value} is ready for launch`;

         //If fuel level is too low, then it's not ready for launch and changes launch information to red
         let fuelStatus = document.getElementById("fuelStatus");
         let fuelLevel = Number(fuelLevelInput.value);
         let launchStatus = document.getElementById("launchStatus");
         if (fuelLevel < 10000) {
            fuelStatus.innerHTML = `Fuel level too low for launch`;
            //launchStatus.innerHTML = `Shuttle not ready to launch`;
            //launchStatus.style.color = "red";
         } else {  //if fuel level is greater than 10000, fuel level passes
            fuelStatus.innerHTML = `Fuel level check passed`;
            //launchStatus.innerHTML = `Awaiting Information Before Launch`;
            //launchStatus.style.color = "black";
         }

         //If cargo mass is too high, then it's not ready for launch and changes launch information to red
         let cargoStatus = document.getElementById("cargoStatus");
         let cargoMass = Number(cargoMassInput.value);
         if (cargoMass > 10000) {
            cargoStatus.innerHTML = `Cargo mass is too high for launch`;
            //launchStatus.innerHTML = `Shuttle Not Ready to Launch`;
            //launchStatus.style.color = "red";
         } else { //if cargo mass is less than 10,000, then cargo mass passes
            cargoStatus.innerHTML = `Cargo mass check passed`;
           //launchStatus.innerHTML = `Awaiting Information Before Launch`;
           //launchStatus.style.color = "black";
         }

         if (fuelLevel >= 10000 && cargoMass <= 10000) {
            launchStatus.innerHTML = `Shuttle is Ready to Launch`;
            launchStatus.style.color = "green";
         } else {
            launchStatus.innerHTML = `Shuttle not ready to launch`;
            launchStatus.style.color = "red";
         }

         

       //  form.submit();

      }); //curly bracket for submit handler
   }); //curly bracket for window load handler
});

