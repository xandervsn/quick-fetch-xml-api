const api = 'https://ws.audioscrobbler.com/2.0/?';
const apiKey = 'KEY';
const method = 'method=track.getInfo&'

function findDuration(artist, track){
    url = api + artist + track + method + apiKey
    fetch(url)
        .then(res => res.text())
        .then(data => {
            let parser = new DOMParser;
            xmlDoc = parser.parseFromString(data, 'text/xml')
            urlData = xmlDoc.getElementsByTagName('duration')
            duration = urlData[0].firstChild.nodeValue
            secs = duration/1000
            seconds = secs%60
            minutes = (secs-seconds)/60
            document.getElementById('output').innerHTML = minutes + ":" + seconds
        })
}

document.getElementById('button').onclick = function onClick(){
    let input = document.getElementById('textField').value
    let artist = 'artist=' + input.split(' - ')[0] + '&'
    let track = 'track=' + input.split(' - ')[1] + '&'
    findDuration(artist, track);
}
