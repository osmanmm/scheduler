// Returns an array of appointments for the given day
export function getAppointmentsForDay(state, day) {
 
const appointmentsForDay = [];
const appointmentList = [];

for (const dayItem of state.days) {
  if (dayItem.name === day) {
    appointmentsForDay.push(...dayItem.appointments);
  }
}

for (const key in state.appointments) {
  const appointmentID = state.appointments[key].id;
  if (appointmentsForDay.includes(appointmentID)) {
    appointmentList.push(state.appointments[key])
  }
}

return appointmentList;
}

// Returns a new object containing the interview data when passed an object that contains the interviewer
export function getInterview(state, interview) {
  const newInterviewObject = interview;

  if (newInterviewObject) {
    const interviewerID = interview.interviewer;
    if (typeof(interviewerID) === 'number') {
      newInterviewObject.interviewer = state.interviewers[interviewerID]
    }
  }

  return newInterviewObject
}

// Return an array of interviewers for the given day
export function getInterviewersForDay(state, day) {
  const interviewsForDay = [];
  const interviewList = [];

for (const dayItem of state.days) {
  if (dayItem.name === day) {
    interviewsForDay.push(...dayItem.interviewers);
  }
}

for (const key in state.interviewers) {
  const inteviewerID = state.interviewers[key].id;
  if (interviewsForDay.includes(inteviewerID)) {
    interviewList.push(state.interviewers[key])
  }
}

return interviewList;
}

// Returns the number of spots available for a given day
export function getNumberOfSpots(state, day) {
  const appointmentsForDay = [];
  let spots = 0;

  for (const dayItem of state.days) {
    if (dayItem.name === day) {
      appointmentsForDay.push(...dayItem.appointments);
    }
  }

  for (const key of appointmentsForDay) {
    console.log("KEY", key)
    if (!state.appointments[key].interview) {
      spots ++
    }
  }

return spots;
}