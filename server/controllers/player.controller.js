const Player = require('../models/player.model');

module.exports = {
  findAllPlayers(req, res) {
    Player.find({}).sort('-likes name')
      .then(players => res.json(players))
      .catch(err => res.status(400).json(err));
  },
  createPlayer(req, res) {
    Player.create(req.body)
      .then(player => res.json(player))
      .catch(err => res.status(400).json(err));
  },
  getPlayer(req, res) {
    Player.findById(req.params.id)
      .then(player => res.json(player))
      .catch(err => res.status(400).json(err));
  },
  updatePlayer(req, res) {
    const opt = {
      runValidators: true,
      new: true
    };
    Player.findByIdAndUpdate(req.params.id, req.body, opt)
      .then(player => res.json(player))
      .catch(err => res.status(400).json(err));
  },
  deletePlayer(req, res) {
    Player.findByIdAndDelete(req.params.id)
      .then(player => res.json(player))
      .catch(err => res.status(400).json(err));
  },
  updateStatus(req, res) {
    Player.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(player => res.json(player))
      .catch(err => res.status(400).json(err));
  },
  updateLikes(req, res) {
    const opt = {
      runValidators: true,
      new: true
    };
    Player.findByIdAndUpdate(req.params.id, {$inc: {likes: req.body.inc }}, opt)
      .then(player => res.json(player))
      .catch(err => res.status(400).json(err));
  }
};