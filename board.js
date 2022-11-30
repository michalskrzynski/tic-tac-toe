const boardModule = (() => {

  const pawns = ['X', 'O'];
  let rot = 0;
  let eog = false; //end of game

  const board = document.getElementById('tttBoard');
  const monitor = document.getElementById('tttMonitor');
  let theGame = null;

  const translateYX = ( flatIndex ) => {

    const x = flatIndex % 3;
    const y = Math.floor( flatIndex / 3 );

    return [y, x];
  }

  const yieldResultOrPlayer = () => {
    const lastMove = pawns[ (rot+1)%2 ];

    if( theGame.isWon( lastMove ) ) { 
      eog = true;
      return `Player ${lastMove} won!`;
    }
    else if( theGame.areAllMovesMade() ) {
      return "It's a draw!";
    }
    else {
      return `Player's ${pawns[rot]} move.`;
    }
  }

  const clean = () => {
    board.childNodes.forEach( field => {
      field.childNodes.forEach( pawn => field.removeChild( pawn ) )
      field.innerText = "";
    });

    rot = 0;
    eog = false;
    monitor.innerText = yieldResultOrPlayer();
  }

  const placePawn = (target) => {

    if( !theGame ) { console.log('GAME NOT HOOKED'); return; }
    if( eog ) { return; }


    let pawn = pawns[ rot++ ];
    const id = Number( target.id.substring(8,9) );
    try { 
      theGame.place( pawn, ...translateYX( id ) ); 
      target.innerText = pawn;
      rot = rot % 2;
      monitor.innerText = yieldResultOrPlayer();
    } 
    catch( err ) { alert( 'Field already ocuppied.' ); }
  
  } 


  const initialize = () => {
    board.childNodes.forEach( field => {
      field.addEventListener( 'click', e =>  placePawn( e.target ) );
    });
  }

  const hookGame = (game) => {
    theGame = game;
  }

  return {board, clean, initialize, hookGame}

})();

