var url = "http://crossorigin.me/http://rss.cnn.com/services/podcasting/studentnews/rss.xml";

var data = new XMLHttpRequest();
data.open('GET', url, true);

// La réponse doit être de type String ou "document"
data.responseType = 'document';
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

var v = new Array();

v[0] = [
        "video.mp4",
        "video2.mp4"
        ];

var video = document.getElementById("VideoPlayer");
var source = document.getElementById("source");

function playVideo() { 
    video.play(); 
} 

function pauseVideo() { 
    video.pause(); 
}

var n = 0;

function nextVideo() {
	
	
	if(n<v[0].length-1){
		video.setAttribute("src", v[0][n+1]);
		video.load(); 
		n+=1;
		console.log(n);
	}
	else{
		video.setAttribute("src", v[0][0]);
		video.load();
		n=0;
		console.log(n);
	}
}

function previousVideo() { 
    
	
	if(n>0){
		video.setAttribute("src", v[0][n-1]);
		video.load();
		console.log(n);
		n=n-1;
	}
	else{
		var max=v[0].length-1;
		
		video.setAttribute("src", v[0][max]);
		video.load();
		n=max;
		console.log(max);
		console.log(n);
	} 
}

function load(){
	video.setAttribute("src", v[0][1]);
	video.load();
}