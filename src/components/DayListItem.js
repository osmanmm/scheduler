import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  })

  const formatSpots = (props) => {
    return (
      <div>
        {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
        {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>}
        {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      </div>
    );
  }

  return (
    <li className={dayClass} onClick={() => props.setDay()} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      {formatSpots(props)}
    </li>
  );
}

