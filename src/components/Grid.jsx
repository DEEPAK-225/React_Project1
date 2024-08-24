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

  function play(index) {
    if (board[index] !== " " || winner) return; // Prevent overriding moves or playing after a win
    indexArray.push(index);
    if(indexArray.length == 6){
      var resetcard = indexArray.shift();
    }
    const newBoard = [...board]; // Copy board array
    newBoard[index] = turn ? 'O' : 'X';
    newBoard[resetcard] = " ";
    if (isWinner(newBoard, turn ? 'O' : 'X')) {
      setWinner(newBoard[index]);
      toast.success(`Congratulations! ${newBoard[index]} won the game!`);
    }
  
    setBoard(newBoard);
    setTurn(!turn);
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