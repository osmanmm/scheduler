import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  const interviewerClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected
  })

  const showName = (props) => {
    return (props.selected && <div>{props.name}</div>);
  }

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {showName(props)}
    </li>
  );
}