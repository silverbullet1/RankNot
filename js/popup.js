var alarmClock = {

        onHandler : function(e) {
            localStorage.clear();
            chrome.alarms.create("myAlarm", {delayInMinutes: 0, periodInMinutes: 1} );
            localStorage.setItem(0,document.getElementById("contest_code").value);
            localStorage.setItem(1,document.getElementById("institution").value);
            localStorage.setItem("flag",0);
            window.close();
        },

        offHandler : function(e) {
            chrome.alarms.clear("myAlarm");
                    window.close();
                    localStorage.clear();
        },

        setup: function() {
            var a = document.getElementById('alarmOn');
            a.addEventListener('click',  alarmClock.onHandler );
            var a = document.getElementById('alarmOff');
            a.addEventListener('click',  alarmClock.offHandler );
        }
};

document.addEventListener('DOMContentLoaded', function () {
    alarmClock.setup(); 
});