import moment from 'moment';

export const calendarify = (events, foodEvents) => {
  const lastMonthNumberOfDays = moment()
    .subtract(1, 'month')
    .daysInMonth(); // 31

  const lastMonth = moment()
    .subtract(1, 'month')
    .format('MM'); // 01

  const nextMonth = moment()
    .add(1, 'month')
    .format('MM'); // 03

  const currentMonthNumberOfDays = moment().daysInMonth(); // 28

  const currentMonthFirstDayNumber = moment()
    .startOf('month')
    .day(); // 5

  const numberOfDaysInCalendarForNextMonth =
    42 - currentMonthNumberOfDays - currentMonthFirstDayNumber; // 9

  let arr = Array.from({ length: 42 }, () => {
    return {
      date: moment()
        .startOf('month')
        .format('YYYY-MM-DD'),
      outsideCurrentMonth: false,
      isToday: false,
      events: [],
      foodEvents: []
    };
  });

  for (
    let i = currentMonthFirstDayNumber;
    i < arr.length - numberOfDaysInCalendarForNextMonth;
    i++
  ) {
    arr[i]['date'] = moment(
      `${moment().format('YYYY')}-${moment().format('MM')}-${i -
        (currentMonthFirstDayNumber - 1)}`,
      'YYYY-MM-D'
    ).format('YYYY-MM-DD');
  }

  for (let i = currentMonthFirstDayNumber - 1; i >= 0; i--) {
    arr[i]['date'] = moment(
      `${moment()
        .subtract(1, 'month')
        .format('YYYY')}-${lastMonth}-${lastMonthNumberOfDays -
        (currentMonthFirstDayNumber - 1 - i)}`,
      'YYYY-MM-D'
    ).format('YYYY-MM-DD');
    arr[i]['outsideCurrentMonth'] = true;
  }

  for (let i = 42 - numberOfDaysInCalendarForNextMonth; i < arr.length; i++) {
    arr[i]['date'] = moment(
      `${moment()
        .add(1, 'month')
        .format('YYYY')}-${nextMonth}-${i -
        (42 - numberOfDaysInCalendarForNextMonth - 1)}`,
      'YYYY-MM-D'
    ).format('YYYY-MM-DD');
    arr[i]['outsideCurrentMonth'] = true;
  }

  arr.forEach(el => {
    if (el.date === moment().format('YYYY-MM-DD')) {
      el.isToday = true;
    }
    return el;
  });

  arr = addEvents(arr, events);
  arr = addFoodEvents(arr, foodEvents);

  return arr;
};

export const format = date => {
  return moment(date).format('D');
};

export const currentMonth = () => {
  return moment().format('MMMM');
};

const addEvents = (datesArr, events) => {
  const dates = datesArr;

  events.forEach(el => {
    let foundIndex = dates.findIndex(
      date => date.date === moment(el.date).format('YYYY-MM-DD')
    );
    if (foundIndex !== -1) {
      dates[foundIndex].events.push({
        title: el.title
      });
    }
  });

  return dates;
};

const addFoodEvents = (datesArr, foodEvents) => {
  const dates = datesArr;

  foodEvents.forEach(el => {
    let foundIndex = dates.findIndex(
      date => date.date === moment(el.date).format('YYYY-MM-DD')
    );
    if (foundIndex !== -1) {
      dates[foundIndex].foodEvents.push({
        title: el.title
      });
    }
  });

  return dates;
};

export const formatDateForList = date => {
  return moment(date).format('dddd, MMMM DD, YYYY');
};

export const upcomingEvents = events => {
  return events.filter(event =>
    moment(event.date).isSameOrAfter(moment().format('YYYY-MM-DD'))
  );
};

export const sortedEvents = events => {
  return events.sort(
    (a, b) =>
      moment(a.date).format('YYYYMMDD') - moment(b.date).format('YYYYMMDD')
  );
};

export const getCurrentHour = () => +moment().format('k');

export const getCurrentTime = () => moment().format('h:mm A, YYYY-MMM-DD');
