$(document).ready(function(){
  $("#username").on ("keyup", function(e){
    let username = e.target.value;

    //make Request to github
    $.ajax({
      url:"https://api.github.com/users/" +username,
      data:{
        client_id:"7cb6bb6625f1b701dd10",
        client_secret:"595b03ef4656d97aab1970c3472fab748fbc0c3f"
      }
    }).done(function(user){
      $.ajax({
        url:"https://api.github.com/users/" +username+"/repos",
        data:{
          client_id:"7cb6bb6625f1b701dd10",
          client_secret:"595b03ef4656d97aab1970c3472fab748fbc0c3f"
        }
      }).done(function(repos){
        $.each(repos, function(index,repo){
          $("#repos").append(`
            <div class="well">
            <div class="row">
            <div class="col-md-7">
            <strong>${repo.name}</strong>:${repo.description}
            </div>
            <div class="col-md-3">
            <span class="label label-default">Forks:${repo.fork_count}</span>
            <span class="label label-primary">Watchers:${repo.watchers_count}</span>
            <span class="label label-success">Stars:${repo.stargazers_count}</span>
            </div>
            <div class="col-md-2">
            <a href = "${repo.html_url}" target="_blank" class ="btn btn-default">Repo page</a>
            </div>
            </div>
            </div>
            `)
        });
      });
      $("#profile").html(`
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">${user.name}</h3>
        </div>
        <div class="panel-body">
          <div class = "row">
          <div class = "col-md-3">
          <img style = "width:100%" class = "thumbnail" src = "${user.avatar_url}">
          <a target = "blank" class = "btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
          </div>
          <div class = "col-md-9">
          <span class="label label-default">Public Repos:${user.public_repos}</span>
          <span class="label label-primary">Gists:${user.public_gists}</span>
          <span class="label label-success">Followers:${user.followers}</span>
          <span class="label label-info">Following:${user.following}</span>
          <br><br>
          <ul class = "list-group">
          <li class = "list-group-item">company: ${user.company}</li>
          <li class = "list-group-item">website/blog: ${user.blog}</li>
          <li class = "list-group-item">location: ${user.location}</li>
          <li class = "list-group-item">member Since: ${user.created_at}</li>
          </ul>
          </div>
        </div>
        </div>
        </div>
        <h3 class = "page-header">Latest Repos</h3>
        <div id = "repos"></div>
        `);
    });
  });
});
