/*var url = "http://crossorigin.me/http://www.podcastdirectory.com/podcasts/simon-b-the-moonproject-show-5262.html";

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
*/
var v = new Array();

v[0] = [
        "video.mp4",
        "video2.mp4",
        "video3.mp4"
        ];

var video = document.getElementById("VideoPlayer");
var source = document.getElementById("source");

function playVideo() { 
    video.play(); 
} 

function pauseVideo() { 
    video.pause(); 
}

function nextVideo() { 
    video.pause(); 
}

function previousVideo() { 
    video.pause(); 
}

function load(){
	source.setAttribute("src", v[0][0]);
}