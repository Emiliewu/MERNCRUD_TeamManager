const PlayerController = require('../controllers/player.controller');

module.exports = function(app) {
  app.get('/api/players', PlayerController.findAllPlayers);
  app.post('/api/players', PlayerController.createPlayer);
  app.get('/api/player/:id([0-9a-f]{24})', PlayerController.getPlayer);
  app.put('/api/player/:id([0-9a-f]{24})', PlayerController.updatePlayer);
  app.delete('/api/player/:id([0-9a-f]{24})', PlayerController.deletePlayer);
  app.put('/api/player/:id([0-9a-f]{24})/status', PlayerController.updateStatus);
  app.put('/api/player/:id([0-9a-f]{24})/likes', PlayerController.updateLikes);
};