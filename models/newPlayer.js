const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newPlayer = new Schema({
    web_name: String,
    player_code: String,
    first_name: String,
    second_name: String,
    squad_number: Number,
    previous_cost: Number,
    now_cost: Number,
    change: Number,
    base_cost: Number,
    teamName: String,
    pointsTotal: Number,
    pointsWeek: Number,
    pointsLastWeek: Number,
    address: String,
    team_code: Number,
    position: Number,
    minutes: Number,
    goals_scored: Number,
    assists: Number,
    clean_sheets: Number,
    yellow_cards: Number,
    selected_by_percent: Number,
    points_per_game: Number,
    chance_of_playing_this_round: Number,
    chance_of_playing_next_round: Number,
    bonus: Number


})
newPlayer.methods.getChange = ()=>{
    return now_cost-previous_cost
}


module.exports = mongoose.model('newPlayer', newPlayer)