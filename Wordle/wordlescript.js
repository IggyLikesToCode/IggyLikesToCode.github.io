var span = document.getElementsByClassName("close")[0];
var OK = document.getElementsByClassName("btn")[0];
var modal = document.getElementById("myModal");


span.onclick =function(){
  modal.style.display = "none";
}
OK.onclick =function(){
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
var input = document.getElementById("test");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button1").click();
  }
});


