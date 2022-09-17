var text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis natus a veniam doloremque ipsa.";
var result = text.substring(0, 50) + '...'; // gives "foo b..."
var elems = document.getElementsByClassName("title-ticket");

for(var i = 0; i < elems.length; i++) {
    elems[i].innerHTML = result;
    console.log(result);
}

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "flex") {
        x.style.display = "none";
    } else {
        x.style.display = "flex";
        x.style.flexDirection = "column";
    }
}