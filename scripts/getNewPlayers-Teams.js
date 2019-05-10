const request = require('request');
let Player = require('../models/oldPlayer');
let Team = require('../models/teams');
let playerController = require('../controllers/oldPlayer.controller')


// starts with fresh player and team DB

// function getMyStarts(){

//     let myResp =[] 
//     myResp = request('https://fantasy.premierleague.com/drf/bootstrap-static', function(error, response, body){
//         if(!error && response.statusCode == 200){
//         let myresp = JSON.parse(body)
//         return myresp
//         }
//     });
 
//     return myResp; 

// }

//  console.log(getMyStarts())


exports.makeRequest =()=>{
    request('https://fantasy.premierleague.com/drf/bootstrap-static',  function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let myresp = JSON.parse(body)
    //console.log(myresp.elements[0].web_name) // Print the google web page.
   
   // playerData.push({"web_name": "Kito"});
   // console.log(playerData)

    const element = myresp.elements //get player info
    Player.deleteMany({}) //delete all players
    .exec(function(err, resp){
        if(err) throw err;
        console.log('deleted all players')
    })
    for(let i=0; i< element.length; i++){
        let playerData= {"web_name": element[i].web_name,
                         "first_name": element[i].first_name,
                          "second_name": element[i].second_name,
                           "squad_number": element[i].squad_number,
                           "player_code": element[i].code,
                           "now_cost": element[i].now_cost,
                           "pointsTotal":element[i].total_points,
                           "pointsWeek": element[i].event_points,
                            "team": element[i].team,
                            "team_code": element[i].team_code,
                             "position": element[i].element_type,
                            "minutes": element[i].minutes,
                             "goals_scored": element[i].goals_scored,
                            "assists": element[i].assists,
                            "clean_sheets": element[i].clean_sheets,
                           "yellow_cards": element[i].yellow_cards,
                        "selected_by_percent": element[i].selected_by_percent,
                      "points_per_game": element[i].points_per_game,
                      "chance_of_playing_this_round": element[i].chance_of_playing_this_round,
                      "chance_of_playing_next_round": element[i].chance_of_playing_next_round,
                       "bonus": element[i].bonus
                      }
        let newPlayer = new Player(playerData)
        newPlayer.save(function(err, resp){
            if(err) throw err;
            // console.log('player saved')
        })
 

    }
    console.log("Added ", element.length, " players")

    // add teams

    const teams = myresp.teams;
    Team.deleteMany({}) //delete all teams
    .exec(function(err, resp){
        if(err) throw err;
    })
    for(let i = 0; i<teams.length; i++){
        let teamData ={"name": teams[i].name, "position": teams[i].position,
                      "short_name": teams[i].short_name, "code": teams[i].code}

                      let newTeams = new Team(teamData)
                      newTeams.save(function(err, resp){
                          if(err) throw err;
                         
                          
                      })

    }
    console.log("added ", teams.length, " teams to db")
    

  

  }
});

}


