// import $ from 'jquery';

class Holidays {
    constructor(nav) {
        this.navigation = nav;
        this.CzechHolidays =
            {
                "restoration of the czech independence day": 
                    {
                        cz: "Den obnovy samostatného českého státu",
                        en: "Restoration of the Czech Independence Day, New Year's Day"
                    },
                "new Year's day": 
                    {
                        cz: "Nový rok",
                        en: "New Year's Day"
                    }, 
                "good friday": 
                    {
                        cz: "Velký pátek",
                        en: "Good Friday"
                    }, 
                "easter monday": 
                    {
                        cz: "Velikonoční pondělí",
                        en: "Easter Monday"
                    },
                "labor day": 
                    {
                        cz: "Svátek práce",
                        en: "Labor Day / May Day"
                    },
                "victory in europe day": 
                    {
                        cz: "Den vítězství",
                        en: "Victory in Europe Day"
                    },
                "saints cyril and methodius": 
                    {
                        cz: "Den slovanských věrozvěstů Cyrila a Metoděje",
                        en: "Saints Cyril and Methodius"
                    },
                "jan hus day": 
                    {
                        cz: "Den upálení mistra Jana Husa",
                        en: "Jan Hus Day"
                    },
                "st. wenceslas day": 
                    {
                        cz: "Den české státnosti",
                        en: "St. Wenceslas Day"
                    },
                "independent czechoslovak state day": 
                    {
                        cz: "Den vzniku samostatného československého státu",
                        en: "Independent Czechoslovak State Day"
                    },
                "struggle for freedom and democracy day": 
                    {
                        cz: "Den boje za svobodu a demokracii",
                        en: "Struggle for Freedom and Democracy Day"
                    },
                "christmas eve": 
                    {
                        cz: "Štědrý den",
                        en: "Christmas Eve"
                    },
                "christmas day": 
                    {
                        cz: "1. svátek vánoční",
                        en: "Christmas Day"
                    },
                "st. stephen's day": 
                    {
                        cz: "2. svátek vánoční",
                        en: "St. Stephen's Day"
                    }
        };
        
        this.HolidaysCZ;
        this.HolidaysCZYearAhead;
        this.getHolidaysData();
    }

    getHolidaysData() {
        var _self = this;

        $.get("https://www.googleapis.com/calendar/v3/calendars/en.czech%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC0_YQ9tuOphHXitIFVZAn0ltCgq9zjCOo", 
            function( data ) {
                console.log('Retrieved holidays from Google API.');
                _self.HolidaysCZ = _self.getPublicHolidays(data);
                _self.HolidaysCZYearAhead = _self.getPublicHolidaysYearAhead(_self.HolidaysCZ);
                _self.updateUI(_self.HolidaysCZYearAhead);
            }
        );
    }

    getPublicHolidays(data) {
        let czechHolidays = [];
        for (let i=0; i < data.items.length; i++) {
            let keyAPI = data.items[i].summary.toLowerCase().trim();
            if (this.CzechHolidays[keyAPI]) {
                czechHolidays.push(
                    {
                        key: keyAPI,
                        name: this.CzechHolidays[keyAPI],
                        date: data.items[i].start.date
                    }
                )
            }
        }
        return czechHolidays;
    }

    getPublicHolidaysYearAhead(data) {
        let czechHolidaysYearAhead = [];
        let now = new Date();
        let yearAhead = new Date(now.getTime() + 365 * 60 * 60 * 24 * 1000);
        for (let i=0; i < data.length; i++) {
            let date = new Date(data[i].date);
            // console.log(date, yearAhead);
            if (date >= now && date < yearAhead) {
                czechHolidaysYearAhead.push(data[i]);
            }
        }
        return czechHolidaysYearAhead;
    }

    updateUI(data) {
        let thisWeekHolidays = [];
        let now = new Date();
        // now.setDate(20);
        let startweek = new Date(now.getTime() - (now.getDay()-1)*60*60*24*1000 - now.getHours()*60*60*1000 - now.getMinutes()*60*1000 - now.getSeconds()*1000);
        let endweek = new Date(startweek.getTime() + 6 *60 * 60 * 24 * 1000);
        for (let i=0; i < data.length; i++) {
            let date = new Date(data[i].date);
            // console.log(date, startweek, endweek);
            if (date >= startweek && date <= endweek) {
                // console.log('date... ' + date.toLocaleDateString());
                thisWeekHolidays.push(data[i].name.en + ', '+ date.toLocaleDateString() + ' ');
            }
        }
        if (thisWeekHolidays.length>0) {
            $('.site-card__publicholidays--week').show();
            $('.site-card__publicholidays--week-holder').text(thisWeekHolidays);
            this.navigation.updateGrid();
        }
    }

};

export default Holidays;
