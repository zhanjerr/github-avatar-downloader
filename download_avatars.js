var request = require('request');
var fs = require('fs')

var owner = process.argv[2];
var repo = process.argv[3];

var GITHUB_USER = "zhanjerr";
var GITHUB_TOKEN = "afb30523e97255f70672386d0110e2d6ca0e0132";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = {
    url : `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers : {
      'User-Agent' : 'GitHub Avatar Downloader - Student Project'
    }
  };

  request (requestURL, (error, response, body) =>{
    if (error){
      cb(error,"");
      return;
    };

    if (response.statusCode == 200){
      var json = JSON.parse(body);
      cb("",json);
    } else if (response.statusCode == 404) {
      console.log("Object not found")
    }
  });
  // request.get(requestURL)
  //   .on('response', function(response){
  //     if(response.statusCode === 200){
  //       console.log(body);
  //     } else{
  //       console.log("error");
  //     }
  //     // console.log(response.statusCode);
  //   })
  //   .on('error',function(error){
  //     cb(error,"");
  //     return;
  //   })
};

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   result.forEach(function(object){
//     console.log(object.avatar_url);
//   });
// });
var temp_url = 'https://avatars3.githubusercontent.com/u/1615?v=3'
var temp_path = './avatars/1615.jpg'

function downloadImageByURL(url, filePath) {
  // ...
request.get(url)
  .on('error', function(err){
    console.log("got an error!");
    return
  })
  .on('response', function(response){
    // console.log('Response Status Code: ', response.statusCode);
    // console.log("response content type: " + response.headers['content-type']);
    console.log("response message: " + response.statusMessage)
  })
  .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL(temp_url,temp_path);


// getRepoContributors makes a request for JSON, getting back an array of contributors.
// var contributorsList = {};

getRepoContributors(owner, repo, callback);

function callback(err, result) {
  result.forEach(function(object){
    downloadImageByURL(object.avatar_url, "./avatars/" + object.login + ".jpg")
    // contributorsList[object.login] = object.avatar_url;
    // console.log(object.avatar_url);
  })
// console.log(contributorsList);
}

// getRepoContributors passes this data to cb, an anonymous callback function that it is given.
// cb loops through each item in the array:
// It constructs a file path using the login value (e.g., "avatars/dhh.jpg")
// It then passes the avatar_url value and the file path to downloadImageByURL
// downloadImageByURL fetches the desired avatar_url and saves this information to the given filePath







