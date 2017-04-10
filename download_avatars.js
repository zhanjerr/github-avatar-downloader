var request = require('request');
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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  result.forEach(function(object){
    console.log(object.avatar_url);
  });
});