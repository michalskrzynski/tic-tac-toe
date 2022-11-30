const gameFactory = () => {

  const fields = [0,1,2].map( e => Array(3).fill( null ));

  const canPlace = ( y, x ) => {
    return fields[y][x] === null;
  }

  const place = ( pawn, y, x ) => {
    if( canPlace( y, x ) ) fields[y][x] = pawn;
    else throw new Error( 'cannot place pawn here');
  }

  const isWon = ( pawn ) => {
    //checking rows
    for( let y  = 0; y < 3; y++ ) {
      if( fields[y].every( p => p === pawn ) ) return true;
    }

    //columns 
    for( let x = 0; x < 3; x++ ) {
      if( fields[0][x] === fields[1][x] &&
          fields[1][x] === fields[2][x] &&
          fields[2][x] === pawn )
      return true;
    }

    //diagonal ascending
    if( [0, 1, 2].every( coord => fields[coord][coord] === pawn )) return true;

    //diagonal descending 
    if( [0, 1, 2].every( coord => fields[coord][2-coord] === pawn)) return true;

    return false;
  }

  const areAllMovesMade = () => {
    return fields.flat().every( p => p !== null );
  }

  return { canPlace, place, isWon, areAllMovesMade };
}