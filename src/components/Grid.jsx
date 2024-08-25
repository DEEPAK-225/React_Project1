import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from 'react'

import isWinner from './isWinner';
import Card from "./Card"
import './grid.css'

let indexArray = [];  

function Grid({numberOfCards}){
  const [turn, setTurn] = useState(true); // false-> X, true->O
  const [board, setBoard] = useState(Array(numberOfCards).fill(" "));
  const [winner, setWinner] = useState(null);
  // function play(index){
  //   if(turn){
  //     board[index]='O';
  //   }
  //   else{
  //     board[index]='X';
  //   }
  //   if(isWinner(board, turn?'O':'X')){
  //     setWinner(board[index]);
  //     toast.success(`Congratulation * ${board[index]} * won the game!`);
  //   }
  //   setBoard([...board]);
  //   setTurn(!turn);
  // }

  // function play(index) {
  //   if (board[index] !== " " || winner) return; // Prevent overriding moves or playing after a win
  //   indexArray.push(index);
  //   if(indexArray.length == 6){
  //     var resetcard = indexArray.shift();
  //   }
  //   const newBoard = [...board]; // Copy board array
  //   newBoard[index] = turn ? 'O' : 'X';
  //   newBoard[resetcard] = " ";
  //   if (isWinner(newBoard, turn ? 'O' : 'X')) {
  //     setWinner(newBoard[index]);
  //     toast.success(`Congratulations! ${newBoard[index]} won the game!`);
  //   }
  
  //   setBoard(newBoard);
  //   setTurn(!turn);
  // }

  function aiMove(board) {
    // Check for winning move
      setTimeout(() => {
      for (let i = 0; i < board.length; i++) {
        if (board[i] === ' ') {
          board[i] = 'X';
          if (isWinner(board, board[i]) === 'X') {
            indexArray.push(i);
            setWinner('X');
            toast.success(`Congratulations! ${'X'} won the game!`);
            let b=[...board]; 
            setBoard(b);
            return;
          } else {
            board[i] = ' '; // Undo move
          }
        }
      }

      // Block opponent's winning move
      for (let i = 0; i < board.length; i++) {
        if (board[i] === ' ') {
          board[i] = 'O';
          // let b=[...board]
          if (isWinner(board, board[i]) === 'O') {
            board[i] = 'X'; // Block the opponent
            indexArray.push(i);
            if(indexArray.length == 6){
              var resetcard = indexArray.shift();
            }
            board[resetcard] = " ";
            let b=[...board];
            setBoard(b);
            return;
          } else {
            board[i] = ' '; // Undo move
          }
        }
      }

      // Otherwise, pick a random move
      let availableMoves = board.map((value, index) => value === ' ' ? index : null).filter(value => value !== null);
      let randomIndex = Math.floor(Math.random() * availableMoves.length);
      board[availableMoves[randomIndex]] = 'X';
      indexArray.push(availableMoves[randomIndex]);
      if(indexArray.length == 6){
        var resetcard = indexArray.shift();
      }
      board[resetcard] = " ";
      let b=[...board];
      setBoard(b);
      
    }, 500);
  }
 

  function play(index) {
    if (board[index] !== " " || winner) return; // Prevent overriding moves or playing after a win
    indexArray.push(index);
    const newBoard = [...board]; // Copy board array
    newBoard[index] = 'O';
    !isWinner(newBoard,'O') && aiMove(newBoard);
    if (isWinner(newBoard,'O')) {
      setWinner(newBoard[index]);
      toast.success(`Congratulations! ${newBoard[index]} won the game!`);
    }
    if(indexArray.length == 6 && !isWinner(newBoard,'O')){
      var resetcard = indexArray.shift();
    }
    newBoard[resetcard] = " ";
    setBoard(newBoard);
  }


  function reset(){
    setBoard(Array(numberOfCards).fill(" "));
    setTurn(true);
    setWinner(null);
    indexArray = []; 
  }

  return(
    <>
      {winner && (
        <>
        <h1 className='turn-highligh'> Winner is {winner} </h1>
        <button className='resetBtn' onClick={reset}>Reset game</button>
        </>
        )}
      {!winner && <h1 className='turn-highligh'>Current Turn : {(turn)?'O':'X'}</h1>}
      <div className='grid'>
      {board.map((value, idx) => <Card gameEnd={winner?true:false} onPlay={play} player={value} key={idx} index={idx}/>)}
      </div>
      <ToastContainer position='top-center'/>
    </>
  )
}

export default Grid;