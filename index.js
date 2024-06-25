class AlarmClock {
  constructor() {
    this.alarms = [];
  }

  displayCurrentTime() {
    setInterval(() => {
      const now = new Date();
      console.log(now.toLocaleTimeString());
    }, 1000);
  }

  addAlarm(time, dayOfWeek) {
    this.alarms.push({ time, dayOfWeek, snoozeCount: 0 });
    console.log(`Alarm set for ${time} on ${dayOfWeek}`);
  }

  snoozeAlarm(index) {
    if (this.alarms[index].snoozeCount < 3) {
      let [hours, minutes] = this.alarms[index].time.split(':');
      let alarmDate = new Date();
      alarmDate.setHours(hours, minutes, 0, 0);
      alarmDate.setMinutes(alarmDate.getMinutes() + 5);

      this.alarms[index].time = alarmDate.toTimeString().split(' ')[0];
      this.alarms[index].snoozeCount += 1;
      console.log(`Alarm snoozed to ${this.alarms[index].time}`);
    } else {
      console.log('Snooze limit reached.');
    }
  }

  deleteAlarm(index) {
    if (index >= 0 && index < this.alarms.length) {
      this.alarms.splice(index, 1);
      console.log('Alarm deleted.');
    } else {
      console.log('Invalid alarm index.');
    }
  }

  checkAlarms() {
    setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().split(' ')[0];
      const currentDay = now.toLocaleString('en-us', { weekday: 'long' });

      this.alarms.forEach((alarm, index) => {
        if (alarm.time === currentTime && alarm.dayOfWeek === currentDay) {
          console.log(`Alarm ringing for ${alarm.time} on ${alarm.dayOfWeek}`);
        }
      });
    }, 1000);
  }
}

// Example Usage
const alarmClock = new AlarmClock();
alarmClock.displayCurrentTime();
alarmClock.addAlarm('14:30:00', 'Tuesday');
alarmClock.addAlarm('15:00:00', 'Wednesday');
alarmClock.snoozeAlarm(0);
alarmClock.deleteAlarm(1);
alarmClock.checkAlarms();
