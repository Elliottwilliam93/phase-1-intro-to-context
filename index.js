function createEmployeeRecord(arr) {
    let firstName = arr[0];
    let familyName = arr[1];
    let title = arr[2];
    let payPerHour = arr[3];
    let timeInEvents = [];
    let timeOutEvents = [];
  
    let employeeRecord = {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: timeInEvents,
      timeOutEvents: timeOutEvents
    };
  
    return employeeRecord;
  }

  function createEmployeeRecords(arr) {
    let employeeRecords = [];
  
    arr.forEach((employeeArr) => {
      let employeeRecord = createEmployeeRecord(employeeArr);
      employeeRecords.push(employeeRecord);
    });
  
    return employeeRecords;
  }

  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    };
    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
    let hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  
    return hoursWorked;
  }

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let payRate = employeeRecord.payPerHour;
    let wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
}

function allWagesFor(employeeRecord) {
    let allWages = employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      let date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return allWages;
  }

  function calculatePayroll(employeeRecords) {
    let totalPayroll = employeeRecords.reduce((totalWages, employeeRecord) => {
      return totalWages + allWagesFor(employeeRecord);
    }, 0);
  
    return totalPayroll;
  }