var url = "http://crossorigin.me/http://rss.cnn.com/services/podcasting/studentnews/rss.xml";

var data = new XMLHttpRequest();
var doc = "";
data.open('GET', url, true);
// La réponse doit être de type String ou "document"
data.responseType = 'document';
// La réponse sera parsée en xml
data.overrideMimeType('text/xml');

data.onload = function () {
  if (data.readyState === data.DONE) {
    if (data.status === 200) {
      console.log(data.responseXML);
      	var doc=data.responseXML;
		nextVideo();
		var items = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")
		titresVideos(items);
    }
  }
};
data.send(null);




var video = document.getElementById("VideoPlayer");
var m=false;

//Modifier la vidéo principale
function changeVideo(title, link){
	var Titre = document.getElementById("Titre");
	Titre.innerHTML = title;
	var video = document.getElementById("VideoPlayer");
	video.setAttribute("src", link);
}


//Jouer la vidéo principale
function playVideo() { 
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
} 

//Stopper la vidéo principale
function stop() {
    video.pause();
    video.currentTime = 0;
}

function mute(){
	if (m===false){
		volume(0,0,0);
		m=true;
			}
	else{
		m=false;
		volume(1,3,5)
	}
}

function volume(volume,img,id) {	
	m=false;
    video.volume = volume;
    document.getElementById("Vol").src="speaker"+img+".png";
    var couleur;
    for(var i=1;i<=id;i++){
    	if(i<=2){
    		document.getElementById(i).classList.add("vert");
    	}
    	if(i===3){
    		document.getElementById(i).classList.add("jaune");
    	}
    	if(i>=4){
    		document.getElementById(i).classList.add("rouge");
    }
}
    for(var i=id+1;i<=5;i++){
    	if(i<=2){
    		document.getElementById(i).classList.remove("vert");
    	}
    	if(i===3){
    		document.getElementById(i).classList.remove("jaune");
    	}
    	if(i>=4){
    		document.getElementById(i).classList.remove("rouge");
    }
    }
}

//compteur pour savoir dans quel item on se trouve
var n = 0;

//Changer la vidéo principale à la suivante
function nextVideo() {
	var doc=data.responseXML;
	if (data.readyState === data.DONE) {
		if (data.status === 200) {
  			longueur = doc.getElementsByTagName("channel")[0].getElementsByTagName("item").length;
  			if(n<longueur-1){
				n+=1;
			}
			else{
				n=0;
			}
			var title = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("title")[0].textContent;
			var link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("link")[0].textContent;
			changeVideo(title,link);
		}
	}
}

//Changer la vidéo principale à la précédente
function previousVideo() {
	var doc=data.responseXML;
	if (data.readyState === data.DONE) {
		if (data.status === 200) {
  			longueur = doc.getElementsByTagName("channel")[0].getElementsByTagName("item").length;
				if(n>0){
					n=n-1;
				}
				else{
					var n=longueur-1;
				}
				title = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("title")[0].textContent;
				link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("link")[0].textContent;
				changeVideo(title,link);
		}
	}
}

function titresVideos(items){
	longueur = items.length;
	console.log(items);
	if(longueur>0){
		var i=0;
		while(i<longueur){
			console.log("while");
			title = items[i].getElementsByTagName("title")[0].textContent;
			var li = document.createElement('li');
			li.innerHTML = title;
			document.getElementById('ProchainsTitres').appendChild(li);
			i++
		}
	}
	else{

	}
}