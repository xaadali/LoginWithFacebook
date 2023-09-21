/* eslint-disable react-hooks/rules-of-hooks */
import moment from 'moment';

// get difference b/w two dates
export const getDaysDifferece = (date: string | Date) => {
  if (!date) return null
  let modifyDate = moment(new Date(date))
  let today = moment(new Date());
  if (modifyDate >= today) {
    return true
  } else if (modifyDate < today) {
    return false;
  }
}

export const getDay = (date: string | Date) => {
  if (!date) return null
    // Assuming you have a date string
const dateString = date;
// Parse the date string using Moment.js
const currentDate = moment(dateString);
// Get the day in a specific format
return  currentDate.format('dddd'); // Outputs the day of the week (e.g., Monday, Tuesday)
}