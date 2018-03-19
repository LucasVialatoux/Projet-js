var url = "http://crossorigin.me/http://www.podcastdirectory.com/podcasts/simon-b-the-moonproject-show-5262.html";

var data = new XMLHttpRequest();
data.open('GET', url, true);

// La réponse doit être de type String ou "document"
//data.responseType = 'document';
// La réponse sera parsée en xml
data.overrideMimeType('text/xml');

data.onload = function () {
  if (data.readyState === data.DONE) {
    if (data.status === 200) {
      console.log(data.responseXML);
    }
  }
};

data.send(null);

creerBouton();

function creerBouton(){
	//créer le bouton next
	var boutonNext = document.createElement("button");
	var t = document.createTextNode("Next");  
	boutonNext.appendChild(t);
	document.body.appendChild(boutonNext);

	//créer le bouton previous
	var boutonPrev = document.createElement("button");
	var t = document.createTextNode("Previous");  
	boutonPrev.appendChild(t);
	document.body.appendChild(boutonPrev);

	//créer le bouton play
	var boutonPlay = document.createElement("button");
	var t = document.createTextNode("Play");  
	boutonPlay.appendChild(t);
	document.body.appendChild(boutonPlay);

	//créer le bouton play
	var boutonPause = document.createElement("button");
	var t = document.createTextNode("Pause");  
	boutonPause.appendChild(t);
	document.body.appendChild(boutonPause);
}