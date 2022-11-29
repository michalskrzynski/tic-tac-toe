const boardModule = (() => {

  const board = document.getElementById('tttBoard');
  let theGame = null;

  const clean = () => {
    board.childNodes.forEach( field => {
      field.childNodes.forEach( pawn => field.removeChild( pawn ) )
      field.innerText = "";
    });
  }

  const translateYX = ( flatIndex ) => {

    const x = flatIndex % 3;
    const y = Math.floor( flatIndex / 3 );

    return [y, x];
  }


  const placePawn = (target) => {
    let pawn = "O"
    target.innerText = pawn;

    const id = Number( target.id.substring(8,9) );
    if( theGame ) {
      try { theGame.place( pawn, ...translateYX( id ) ); } 
      catch( err ) { alert( err + 'Field already ocuppied.' ); }
    }
    else {
      console.log('GAME NOT HOOKED');
    }
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

