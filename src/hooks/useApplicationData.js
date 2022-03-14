import { useState, useEffect } from "react";
import axios from "axios";
import { getNumberOfSpots } from "helpers/selectors";

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

// Sets current day on sidebar click
const setDay = day => setState({ ...state, day });

// Initial Page Load useEffect - loads appointments from API
useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

// Adds new interview to database
function bookInterview(id, interview, isUpdate = false) {
  const index = state.days.findIndex(day => day.name === state.day)
  const spots = getNumberOfSpots(state, state.day);
  
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = [
    ...state.days 
  ]

  // Condition used to determine if number of spots should be updated
  if (!isUpdate) {
    const day = {
      ...state.days[index],
      spots: spots - 1
    }
    days.splice(index, 1, day)
  }

  return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
  .then(response => {
    setState({...state, appointments, days: days});
  }).catch(error => {
    console.error('Something went wrong!', error);
    return Promise.reject(error);
  });
}

// Deletes interview from database and updates spots
function cancelInterview(id) {
  const index = state.days.findIndex(day => day.name === state.day)
  const spots = getNumberOfSpots(state, state.day);

  console.log("DELETE INDEX", index)

  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const day = {
    ...state.days[index],
    spots: spots + 1
  }

  const days = [
    ...state.days 
  ]

  days.splice(index, 1, day)

  return axios.delete(`http://localhost:8001/api/appointments/${id}`)
  .then(response => {
    setState({...state, appointments, days: days});
  }).catch(error => {
    console.error('Something went wrong!', error);
    return Promise.reject(error);
  });
}

return {state, setDay, bookInterview, cancelInterview}
}