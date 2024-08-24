import './card.css' 

import Icons from './Icons'

function Card({onPlay, player, index, gameEnd}) {
  let icon=<Icons/>
  if(player == 'X'){
    icon = <Icons name={'cross'}/>
  }
  else if(player == 'O'){
    icon = <Icons name={'circle'}/>
  }
  return (
    <div className="cards" onClick={() => !gameEnd && player==' ' && onPlay(index)}>
      
      {icon}

    </div>
  )
}

export default Card;