var url="";
var data = new XMLHttpRequest();
var doc = "";

//url qui fonctionne : http://crossorigin.me/http://rss.cnn.com/services/podcasting/studentnews/rss.xml

function validerURL(){
	console.log("URL prise en compte.");
	url = document.getElementById("urlInput").value;
	data.open('GET', url, true);
	// La réponse doit être de type String ou "document"
	data.responseType = 'document';
	// La réponse sera parsée en xml
	data.overrideMimeType('text/xml');

	data.onload = function () {
	  if (data.readyState === data.DONE) {
	    if (data.status === 200) {
	      //Afficher tout le document XML pour débuguer si besoin :
	      //console.log(data.responseXML);
	      	var doc=data.responseXML;
			nextVideo();
			var items = doc.getElementsByTagName("channel")[0].getElementsByTagName("item");
			titresVideos(items);
	    }
	  }
	};
	data.send(null);
}

var video = document.getElementById("VideoPlayer");

//Lance la prochaine vidéo à la fin de la vidéo principale
video.onended = nextVideo();

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

var m=false;

//Muter la vidéo principale
function mute(){
	if (m===false){
		volume(0,0,0);
		m=true;
			}
	else{
		m=false;
		volume(1,3,5);
	}
}

//Gérer le volume de la vidéo
function volume(volume,img,id) {	
	m=false;
    video.volume = volume;
    document.getElementById("Vol").src="speaker"+img+".png";
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
    for( i=id+1;i<=5;i++){
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
  			var longueur = doc.getElementsByTagName("channel")[0].getElementsByTagName("item").length;
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
  			var longueur = doc.getElementsByTagName("channel")[0].getElementsByTagName("item").length;
				if(n>0){
					n=n-1;
				}
				else{
					var n=longueur-1;
				}
				var title = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("title")[0].textContent;
				var link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("link")[0].textContent;
				changeVideo(title,link);
		}
	}
}
var tab=[];

//Affichage des titres dans la liste de lecture
function titresVideos(items){
	var longueur = items.length;
	if(longueur>0){
		var i=0;
		while(i<longueur){
			var title = items[i].getElementsByTagName("title")[0].textContent;
			var li = document.createElement('li');
			li.innerHTML = title;
			var funct='changerVideo('+i+',link);';
			li.setAttribute("onclick",funct);
			document.getElementById('ProchainsTitres').appendChild(li);
			tab[i]=title;
			i++;
		}
	}
	else{
		var li = document.createElement('li');
		li.innerHTML = "Aucune vidéo trouvée";
		document.getElementById('ProchainsTitres').appendChild(li);
	}
}

//Changer la vidéo lors d'un clic sur la liste de lecture
function changerVideo(n,link){
	var doc=data.responseXML;
	if (data.readyState === data.DONE) {
		if (data.status === 200) {
			var title = tab[n];
			link = doc.getElementsByTagName("channel")[0].getElementsByTagName("item")[n].getElementsByTagName("link")[0].textContent;
			changeVideo(title,link);
		}
	}
}
