
export const formatTime = (dtVal) => {
    return dtVal.getHours() + ':' + padValue(dtVal.getMinutes()) + ':' + padValue(dtVal.getSeconds());
};
const padValue = (val) => (val < 10) ? '0'+val : val;
export const getTimeObject = (timeValue) => {
    let minuteVal = timeValue*24;
    const hourVal = Math.round(minuteVal);
    let secondVal = (minuteVal-hourVal)*60;
    minuteVal = Math.round(secondVal);
    secondVal = Math.round((secondVal-minuteVal)*60);
    return new Date(2000,1,1,hourVal, minuteVal, secondVal);
};
export const getAdjustedTime = (dateObject, addMinutes = 0, addSeconds = 0) => {
    return getTimeObject(dateObject.getHours()/24 + (dateObject.getMinutes() + addMinutes)/1440 + (dateObject.getSeconds() + addSeconds)/86400);
};
export const getTimeFormatted = (currentTime) => {
    return formatTime(currentTime);
};
const eventNames = [
    ["Ver 1","Ver3","Ver1","Ver","F"],
    ["Ver 2","Ver4","Ver2","Ver","F"],
    ["Hoog 1","Hoog1","Hoog6","Hoog","F"],
    ["Hoog 2","Hoog3","Hoog4","Hoog","F"],
    ["Hoog 3","Hoog2","Hoog5","Hoog","F"],
    ["Polshoog 1","Polshoog1","Polshoog3","Polshoog","F"],
    ["Polshoog 2","Polshoog2","Polshoog4","Polshoog","F"],
    ["Kogel 1","Kogel1","Kogel1","Kogel","F"],
    ["Kogel 2","Kogel2","Kogel2","Kogel","F"],
    ["Discus 1","Discus4","Discus1","Discus","F"],
    ["Discus 2","Discus3","Discus2","Discus","F"],
    ["Discus 3","Discus3","Discus1","Discus","F"],
    ["Discus 4","Discus4","Discus2","Discus","F"],
    ["Speer 1","Speer1","Speer4","Speer","F"],
    ["Speer 2","Speer2","Speer3","Speer","F"],
    ["Speer 3","Speer3","Speer2","Speer","F"],
    ["Speer 4","Speer4","Speer1","Speer","F"],
    ["CP","CP","CP","CP","C"],
    // ["Finish","Finish1","Finish2","Finish"],
    ["100m","100m","300m","100m","T"],
    ["100mH","100m","300m","100mH","T"],
    ["110mH","100m","300m","110mH","T"],
    ["200m","200m","400m","200m","T"],
    ["1500m","300m","100m","1500m","T"],
    ["400m","400m","200m","400m","T"],
    ["800m","400m","200m","800m","T"],
];
const allSectors = ["Ver1","Ver2","Ver3","Ver4","Hoog1","Hoog2","Hoog3","Hoog4","Hoog5","Hoog6","Polshoog1","Polshoog2","Polshoog3","Polshoog4","Kogel1","Kogel2","Discus1","Discus2","Discus3","Discus4","Speer1","Speer2","Speer3","Speer4","CP","Finish1","Finish2","100m","200m","300m","400m"];
export const categoryNames = ['V18','V20','V','M18','M20','M'];


const timeschedulesSource = [
    [[0.416666666666667,"100m","M",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.422222222222222],[0.444444444444444,"Ver 1","M",12,"MK",36,0.000601851851851852,0,0.0125,0.0216666666666667,0.466111111111111],[0.489583333333333,"Kogel 1","M",12,"MK",36,0.000555555555555556,0,0.0104166666666667,0.02,0.509583333333333],[0.552083333333333,"Hoog 1","M",12,"MK",12,0.00416666666666667,0,0.0145833333333333,0.05,0.602083333333333],[0.631944444444444,"400m","M",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.6375],[0.427083333333333,"100m","M20",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.432638888888889],[0.454861111111111,"Ver 2","M20",12,"MK",36,0.000601851851851852,0,0.0125,0.0216666666666667,0.476527777777778],[0.5,"Kogel 2","M20",12,"MK",36,0.000555555555555556,0,0.0104166666666667,0.02,0.52],[0.5625,"Hoog 2","M20",12,"MK",12,0.00416666666666667,0,0.0145833333333333,0.05,0.6125],[0.638888888888889,"400m","M20",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.644444444444444],[0.4375,"100m","M18",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.443055555555556],[0.482638888888889,"Ver 1","M18",12,"MK",36,0.000601851851851852,0,0.0125,0.0216666666666667,0.504305555555556],[0.524305555555556,"Kogel 1","M18",12,"MK",36,0.000555555555555556,0,0.0104166666666667,0.02,0.544305555555556],[0.572916666666667,"Hoog 3","M18",12,"MK",12,0.00416666666666667,0,0.0145833333333333,0.05,0.622916666666667],[0.645833333333333,"400m","M18",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.651388888888889],[0.447916666666667,"100mH","V",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.453472222222222],[0.475694444444444,"Hoog 1","V",12,"MK",12,0.00416666666666667,0,0.0145833333333333,0.05,0.525694444444444],[0.548611111111111,"Kogel 2","V",12,"MK",36,0.000555555555555556,0,0.0104166666666667,0.02,0.568611111111111],[0.607638888888889,"200m","V",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.613194444444444],[0.458333333333333,"100mH","V20",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.463888888888889],[0.486111111111111,"Hoog 2","V20",12,"MK",12,0.00416666666666667,0,0.0145833333333333,0.05,0.536111111111111],[0.559027777777778,"Kogel 1","V20",12,"MK",36,0.000555555555555556,0,0.0104166666666667,0.02,0.579027777777778],[0.614583333333333,"200m","V20",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.620138888888889],[0.46875,"100mH","V18",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.474305555555556],[0.496527777777778,"Hoog 3","V18",12,"MK",12,0.00416666666666667,0,0.0145833333333333,0.05,0.546527777777778],[0.583333333333333,"Kogel 2","V18",12,"MK",36,0.000555555555555556,0,0.0104166666666667,0.02,0.603333333333333],[0.621527777777778,"200m","V18",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.627083333333333]]
    ,
    [[0.503472222222222,"110mH","M",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.509027777777778],[0.53125,"Discus 2","M",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.55625],[0.600694444444444,"Polshoog 1","M",6,"MK",6,0.00694444444444444,0,0.0125,0.0416666666666667,0.642361111111111],[0.600694444444444,"Polshoog 2","M",6,"MK",6,0.00694444444444444,0,0.0125,0.0416666666666667,0.642361111111111],[0.663194444444444,"Speer 2","M",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.688194444444444],[0.708333333333333,"1500m","M",12,"MK",1,0.00416666666666667,0.00347222222222222,0.000694444444444444,0.00347222222222222,0.711805555555556],[0.722916666666667,"CP","M",1,"CP",1,0.00694444444444444,0,0,0.00208333333333333,0.725],[0.416666666666667,"110mH","M20",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.422222222222222],[0.444444444444444,"Discus 4","M20",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.469444444444444],[0.597222222222222,"Speer 1","M20",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.622222222222222],[0.680555555555555,"1500m","M20",12,"MK",1,0.00416666666666667,0.00347222222222222,0.000694444444444444,0.00347222222222222,0.684027777777778],[0.720833333333333,"CP","M20",1,"CP",1,0.00694444444444444,0,0,0.00208333333333333,0.722916666666667],[0.427083333333333,"110mH","M18",12,"MK",2,0.00347222222222222,0.00208333333333333,0.00138888888888889,0.00555555555555555,0.432638888888889],[0.451388888888889,"Discus 3","M18",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.476388888888889],[0.597222222222222,"Speer 4","M18",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.622222222222222],[0.673611111111111,"1500m","M18",12,"MK",1,0.00416666666666667,0.00347222222222222,0.000694444444444444,0.00347222222222222,0.677083333333333],[0.71875,"CP","M18",1,"CP",1,0.00694444444444444,0,0,0.00208333333333333,0.720833333333333],[0.503472222222222,"Polshoog 1","M18+20",12,"MK",12,0.00659722222222222,0,0.0236111111111111,0.0791666666666667,0.582638888888889],[0.503472222222222,"Polshoog 2","M18+20",12,"MK",12,0.00659722222222222,0,0.0236111111111111,0.0791666666666667,0.582638888888889],[0.479166666666667,"Ver 1","V",12,"MK",36,0.000601851851851852,0,0.0125,0.0216666666666667,0.500833333333333],[0.53125,"Speer 1","V",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.55625],[0.576388888888889,"800m","V",12,"MK",1,0.00347222222222222,0.00277777777777778,0.000694444444444444,0.00277777777777778,0.579166666666667],[0.5875,"CP","V",1,"CP",1,0.00694444444444444,0,0,0.00208333333333333,0.589583333333333],[0.434027777777778,"Ver 2","V20",12,"MK",36,0.000601851851851852,0,0.0125,0.0216666666666667,0.455694444444444],[0.489583333333333,"Speer 1","V20",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.514583333333333],[0.569444444444444,"800m","V20",12,"MK",1,0.00347222222222222,0.00277777777777778,0.000694444444444444,0.00277777777777778,0.572222222222222],[0.585416666666667,"CP","V20",1,"CP",1,0.00694444444444444,0,0,0.00208333333333333,0.5875],[0.4375,"Ver 1","V18",12,"MK",36,0.000601851851851852,0,0.0125,0.0216666666666667,0.459166666666667],[0.489583333333333,"Speer 4","V18",12,"MK",36,0.000694444444444444,0,0.0125,0.025,0.514583333333333],[0.5625,"800m","V18",12,"MK",1,0.00347222222222222,0.00277777777777778,0.000694444444444444,0.00277777777777778,0.565277777777778],[0.583333333333333,"CP","V18",1,"CP",1,0.00694444444444444,0,0,0.00208333333333333,0.585416666666667]]
];

const timeschedulesProcessed = timeschedulesSource.map(day =>
    day.reduce((acc, timeEvent) => {
        const names = eventNames.find(el => el[0] === timeEvent[1]) ?? null;
        if (names === null) {return acc}
        return [...acc, {
            "warmup": getTimeObject(timeEvent[0]-timeEvent[8]),
            "start": getTimeObject(timeEvent[0]),
            "end": getTimeObject(timeEvent[10]),
            "event": names[3],
            "category": timeEvent[2],
            "sector": [names[1],names[2]],
            "TF": names[4],
        }];
    }, []).sort((event1, event2) => event1.start > event2.start)
);
const startEndOfDays = timeschedulesProcessed.map(day =>
    day.reduce((acc, cur) => {
        let tAcc = acc;
        if (cur.warmup < acc[0]) {
            tAcc[0] = getAdjustedTime(cur.warmup, -5);
        }
        if (cur.end > acc[1]) {
            tAcc[1] = getAdjustedTime(cur.end, 5);
        }
        return tAcc;
    }, [new Date(2000,1,1,23,59,59),new Date(2000,1,1,0,0,1)])
);
const finishEvents = [[{
    "warmup": startEndOfDays[0][0],
    "start": startEndOfDays[0][0],
    "end": startEndOfDays[0][1],
    "event": "Finish",
    "category": "Finish",
    "sector": "Finish1",
    "phase": 2,
    "TF": "C",
},{
    "warmup": startEndOfDays[0][0],
    "start": startEndOfDays[0][0],
    "end": startEndOfDays[0][1],
    "event": "Finish",
    "category": "Finish",
    "sector": "Finish2",
    "phase": 2,
    "TF": "C",
}],[{
    "warmup": startEndOfDays[1][0],
    "start": startEndOfDays[1][0],
    "end": startEndOfDays[1][1],
    "event": "Finish",
    "category": "Finish",
    "sector": "Finish1",
    "phase": 2,
    "TF": "C",
},{
    "warmup": startEndOfDays[1][0],
    "start": startEndOfDays[1][0],
    "end": startEndOfDays[1][1],
    "event": "Finish",
    "category": "Finish",
    "sector": "Finish2",
    "phase": 2,
    "TF": "C",
}]];

//export const getTimeSchedule = (day = 1) => timeschedulesProcessed[day-1];

export class TimeSchedule {
    constructor() {
        this.timeschedule = timeschedulesProcessed;
        this.startEndOfDays = startEndOfDays; // array of time (timeValue)
        this.hideSectors = allSectors;
    }

    getActiveEvents(currentTime,activeDay,windDirection,categories, beforeMinutes = 10, afterMinutes = 5) {
        const activeSchedules = this.timeschedule[activeDay].reduce((acc, cur) => {
            if (cur.event === "CP") {beforeMinutes = 0; afterMinutes = 0;}
            if (cur.TF === "T") {beforeMinutes = 3; afterMinutes = 3;}
            if (currentTime >= getAdjustedTime(cur.warmup, -beforeMinutes) && getAdjustedTime(cur.end, afterMinutes) >= currentTime && (categories === [] || categories.indexOf(cur.category) !== -1)) {
                let currentPhase = 0;
                if (currentTime >= cur.start) {
                    currentPhase = 2;
                    if (currentTime > cur.end) {
                        currentPhase = 3;
                    }
                } else {
                    if (currentTime >= cur.warmup) {
                        currentPhase = 1;
                    }
                }
                return [...acc, {...cur, 'sector': cur.sector[windDirection], 'phase': currentPhase}];
            }
            return acc;
        },[]);
        activeSchedules.push(finishEvents[activeDay][windDirection]);
        return activeSchedules;
    }

    getAllDaySectors(activeDay,windDirection,categories) {
        const activeSchedules = this.timeschedule[activeDay].reduce((acc, cur) => {
            if (!Array.isArray(categories) || !categories.length || categories.indexOf(cur.category) !== -1 || (
                (categories.includes("M18") || categories.includes("M20")) && cur.category === "M18+20")){
                if (cur.TF === "F") {
                    return {...acc,
                        [cur.sector[windDirection]]: [
                            ...(acc?.[cur.sector[windDirection]] || []),
                            cur.category
                        ]};
                } else if (cur.TF === "T") {
                    return {...acc,
                        [cur.sector[windDirection]]: [
                            ...((new Set(acc?.[cur.sector[windDirection]] || [])).add(cur.event))
                        ]};
                }
            }
            return acc;
        },{});
        activeSchedules[finishEvents[activeDay][windDirection].sector] = ["Finish"];
        if (activeDay > 0) activeSchedules["CP"] = ["CP"];
        return activeSchedules;
    }
}
