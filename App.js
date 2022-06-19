import React from 'react';
import './App.css';
import PlayerList from './components/PlayerList';

function App() {
  return (
    <div className="container">
      <PlayerList />
    </div>
  );
}

/*App.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});*/

export default App;
