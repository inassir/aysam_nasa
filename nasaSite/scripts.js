function makeRequest(url, callback) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return callback(null, data)
        })
        .catch(function (error) {
            callback(error)
        })
}

//make one makerequest function
function makeRequestV2(url, callback) {
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "03eca7d594msh34ef155af2e0855p1c1bc1jsnc83e871ff4b9"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return callback(null, data)
        })
        .catch(function (error) {
            callback(error)
        })
}

//variable declaration
var currPicNum = 0;
const nasaURL = "https://images-api.nasa.gov/search?q=";
const deezerURL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
var lastQuery = "";
var searchQuery;

var firstElem =
{
    Pic: document.querySelector(".image1"),
    Desc: 'Earth Planet, bad Planet.',
    Title: 'Earth'
};
var secondElem =
{
    Pic: document.querySelector(".image2"),
    Desc: 'Sun Star, good Star',
    Title: 'Sun'
};
var thirdElem =
{
    Pic: document.querySelector(".image3"),
    Desc: 'Moon Moon, afternoon',
    Title: 'Moon'
};
var dataArray = [firstElem, secondElem, thirdElem];



var myData;

var songData;
function getData() {
    getSearchQuery();
    makeRequest(nasaURL + searchQuery, function (error, data) {
        if (error) {
            console.log(error);
            return;
        }
        var errorFlag = handleDataErrors(data);
        if (errorFlag) {
            return;
        }
        myData = data;
        displayData(myData);
       
    })
    makeRequestV2(deezerURL + searchQuery,
        function (error, data) {
            if (error) {
                labelError.textContent = ('\nerror getting Songs');
                return;
            }
            labelError.textContent = "";
            songData = data;
        })
}
function playSong() {
    window.open(songData.data[0].link, '_blank');
}
function changePic(n) {
    currPicNum += n;
    displayData(myData);
}
labelError = document.getElementById("errorLabel");
function handleDataErrors(data) {
    if (data.collection.items.length < 1) {
        labelError.textContent = "No results were found for: " + searchQuery;
        return false;
    }
    labelError.textContent = "";
}

function displayData(data) {
    var length = data.collection.items.length;
    var counter = currPicNum;
    for (var i = 0; i < 3; i++) {
        if (counter >= length)
            counter = 0;
        if (counter < 0)
            counter = length + counter;
        dataArray[i]['Desc'] = data.collection.items[counter].data[0].description;
        dataArray[i]['Title'] = data.collection.items[counter].data[0].title;
        dataArray[i]['Pic'].src = data.collection.items[counter++].links[0].href;
    }
}

function getSearchQuery() {
    searchQuery = document.getElementById("textbox").value;
    if (!searchQuery) {
        labelError.textContent = "Search field can't be empty!!";
        return false;
    }
    if (searchQuery !== lastQuery) {
        currPicNum = 0;
        details.style.display = 'none';
    }
    lastQuery = searchQuery;
}

searchText = document.getElementById("textbox");
searchText.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        document.getElementById("searchBtn").click();
    }
});
var details = document.querySelector(".imageDetails");
var imgDetails = document.querySelector("#imgDetails");
var descDetails = document.querySelector("#descDetails");
var titleDetails = document.querySelector("#titleDetails");
function viewDetails(n) {
    details.style.display = 'flex';
    imgDetails.src = dataArray[n - 1]['Pic'].src;
    descDetails.textContent = dataArray[n - 1]['Desc'];
    titleDetails.textContent = dataArray[n - 1]['Title'];
    mainSearch.style.display = 'none'
}
var closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
    details.style.display = "none";
    mainSearch.style.display = 'flex';
    mainSearch.style.animation = 'mainAnimation 0.5s ease-in-out';
  }
  var mainSearch = document.querySelector("#mainSearch");