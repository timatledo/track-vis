import React, {useState, useEffect,useCallback} from 'react';
import './App.css';
import {TimeSchedule,getAdjustedTime} from './Utils/Timeschedule';
import {Select,MenuItem,ButtonGroup,Button} from '@material-ui/core';
import {PlayArrow,Pause,SkipNext,SkipPrevious,FastForward,FastRewind,Replay} from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardTimePicker} from '@material-ui/pickers';

function App() {
  const logCoordinates = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log(`${x} - ${y}`);
  };

  const timeSchedule = new TimeSchedule();
  const [currentState,setCurrentState] = useState({activeDay: 0, windDirection: 0, isActive: false, speed: 600, viewmode:1, time: timeSchedule.startEndOfDays[0][0]}); // activeDay: 1 / 2

  const runSimulation = () => setCurrentState({...currentState, isActive: true});
  const stopSimulation = () => setCurrentState({...currentState, isActive: false});
  const resetSimulation = () => {
    setCurrentState({...currentState, isActive: false, time: timeSchedule.startEndOfDays[currentState.activeDay][0]});
  };
  const incrementTime = useCallback((secs) =>
      setCurrentState({...currentState, time: getAdjustedTime(currentState.time,0,secs)}),[currentState]);

  useEffect(() => {
    let interval = null;
    if (currentState.viewmode === 0) {
      timeSchedule.hideSectors.forEach(event => editSVG({sector: event}, false));
      timeSchedule.getActiveEvents(currentState.time, currentState.activeDay, currentState.windDirection).forEach(event => editSVG(event, true));
      if (currentState.isActive && currentState.time < timeSchedule.startEndOfDays[currentState.activeDay][1]) {
        interval = setInterval(() => {
          incrementTime(currentState.speed / 10);
        }, 100);
      }
    }
    if (!currentState.isActive && currentState.time > timeSchedule.startEndOfDays[currentState.activeDay][0]) {
      clearInterval(interval);
    }
    if (currentState.viewmode === 1) {
      timeSchedule.hideSectors.forEach(event => editSVG({sector: event}, false));
      Object.entries(timeSchedule.getAllDaySectors(currentState.activeDay, currentState.windDirection)).forEach(([sector,category]) => editSVG({sector,category,phase:2,color:true}, true));
    }
    return () => clearInterval(interval);
  }, [currentState,incrementTime,timeSchedule]);

  const editSVG = (event, display) => {
    const svgObject = document.getElementById(event.sector);
    if (svgObject) {
      svgObject.style.display = display ? 'block' : 'none';
      if (display) {
        svgObject.setAttribute('data-phase', event.phase);
        const textEl = svgObject.getElementsByTagName('text')[0];
        textEl.textContent = event.category;
        textEl.setAttribute('fill', event.color ? "white" : "darkmagenta" );
      }
    } else {
      console.warn('SVGobject not found: ' + event.sector + ' for ' + event);
    }
  };

  useEffect(() => {
    const svgObject = document.getElementById('map-svg');
    for (var i = 0;i<svgObject.children.length;i++){
      svgObject.children[i].style.display = 'none';
    }
    setCurrentState(prev =>{return{...prev, isActive: true}});
  }, [setCurrentState]);

  return (
    <div className="App">
      <section>
        <div id="controls">
          <Select
              id="view-mode"
              value={currentState.viewmode}
              onChange={(e) => setCurrentState({...currentState, viewmode: e.target.value, isActive: false})}
          >
            <MenuItem value={0}>Live</MenuItem>
            <MenuItem value={1}>Dag totaal</MenuItem>
          </Select>
          <div id="wind-container">
            <Button id="wind-icon-button" onClick={() => setCurrentState({...currentState, windDirection: (currentState.windDirection+1)%2})}>
              <svg className="wind-icon" height="24" viewBox="0 0 512 512" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m405.051 42.294c-24.259 0-48.037 8.364-66.953 23.551-6.46 5.187-7.492 14.627-2.307 21.087 5.187 6.459 14.628 7.493 21.088 2.306 13.61-10.927 30.718-16.944 48.172-16.944 42.43 0 76.949 34.519 76.949 76.949s-34.52 76.949-76.949 76.949h-282.052c-8.284 0-15 6.716-15 15s6.716 15 15 15h282.052c58.972 0 106.949-47.977 106.949-106.949s-47.978-106.949-106.949-106.949z"/><path d="m94.262 196.293h160.237c8.285 0 15-6.716 15-15s-6.715-15-15-15h-160.237c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/><path d="m250.295 286.294h-235.295c-8.284 0-15 6.716-15 15s6.716 15 15 15h235.295c34.025 0 61.707 27.681 61.707 61.706s-27.682 61.706-61.707 61.706c-13.997 0-27.715-4.826-38.63-13.588-6.459-5.186-15.9-4.154-21.087 2.306s-4.154 15.901 2.306 21.087c16.221 13.022 36.61 20.194 57.411 20.194 50.567 0 91.707-41.139 91.707-91.706s-41.14-91.705-91.707-91.705z"/><path d="m15 196.293h20.235c8.284 0 15-6.716 15-15s-6.716-15-15-15h-20.235c-8.284 0-15 6.716-15 15s6.716 15 15 15z"/><path d="m196 361.001c0-8.284-6.716-15-15-15h-90c-8.284 0-15 6.716-15 15s6.716 15 15 15h90c8.285 0 15-6.716 15-15z"/></g></svg>
            </Button>
            <Select
                id="wind-direction"
                value={currentState.windDirection}
                onChange={(e) => setCurrentState({...currentState, windDirection: e.target.value})}
            >
              <MenuItem value={0}>Regulier</MenuItem>
              <MenuItem value={1}>Finish gedraaid</MenuItem>
            </Select>
          </div>
          <Select
              id="meeting-day"
              value={currentState.activeDay}
              onChange={(e) => setCurrentState({...currentState, activeDay: e.target.value, time: timeSchedule.startEndOfDays[e.target.value][0]})}
          >
            <MenuItem value={0}>Zaterdag</MenuItem>
            <MenuItem value={1}>Zondag</MenuItem>
          </Select>

          {/*<Divider orientation="vertical" flexItem />*/}

          <div id="live-controls" className={currentState.viewmode === 0 ? '' : 'hide-controls'}>
            <ButtonGroup id="play-controls">
              <Button onClick={() => incrementTime(-300)}><SkipPrevious/></Button>
              <Button onClick={() => incrementTime(-60)}><FastRewind/></Button>
              {!currentState.isActive ? <Button onClick={runSimulation}><PlayArrow/></Button> : <Button onClick={stopSimulation}><Pause/></Button> }
              <Button onClick={() => incrementTime(60)}><FastForward/></Button>
              <Button onClick={() => incrementTime(300)}><SkipNext/></Button>
              <Button onClick={resetSimulation}><Replay/></Button>
            </ButtonGroup>
            <Select
                id="speed"
                value={currentState.speed}
                onChange={(e) => setCurrentState({...currentState, speed: e.target.value})}
            >
              <MenuItem value={60}>1 min/s</MenuItem>
              <MenuItem value={120}>2 min/s</MenuItem>
              <MenuItem value={300}>5 min/s</MenuItem>
              <MenuItem value={600}>10 min/s</MenuItem>
              <MenuItem value={900}>15 min/s</MenuItem>
              <MenuItem value={1200}>20 min/s</MenuItem>
              <MenuItem value={1800}>30 min/s</MenuItem>
            </Select>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div id="time-picker-container">
                <KeyboardTimePicker id="time-picker" value={currentState.time} ampm={false}
                    onChange={(date) => setCurrentState({...currentState, time: date})}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div id="wind-direction-indication" className={currentState.windDirection ? 'wind-w' : 'wind-o'}><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" width="5em" height="5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1538 1535"><path d="M0 768q0-156 61.5-298.5T226 224T471 60.5T769 0t298.5 60.5T1313 224t164 245t61 299t-61 299t-164 244.5t-245.5 163T769 1535t-298.5-61T225 1310T61 1065T0 768zm170 0q0 245 177 422q176 176 422 176q163 0 301.5-80.5t219-218T1370 768q0-121-47.5-232T1194 344.5t-192-128T769 169q-121 0-231.5 47.5t-191 128T218 536t-48 232zm334-259q-5-11 1-16.5t16-.5l238 89q10 4 23 0l235-89q10-5 16 .5t2 16.5l-253 599q-3 10-13 10q-7 0-10-10z" fill="black"/></svg></div>
        <img src="mapimage.jpg" id="map-image" height="900" width="1471" alt="AV NOP Emmeloord"/>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full"
             width="1471" height="900" className={currentState.viewmode === 0 ? 'live-legend' : 'total-legend'}
             id="map-svg-legend">

          <svg id="legend-0" x="1330" y="10" data-phase="0">
            <rect x="0" y="0" width="90" height="20" className="sector" aria-label="CP"/>
            <text x="10" y="15" className="label" aria-label="CP">-10</text>
          </svg>
          <svg id="legend-1" x="1330" y="40" data-phase="1">
            <rect x="0" y="0" width="90" height="20" className="sector" aria-label="CP"/>
            <text x="10" y="15" className="label" aria-label="CP">Inwerken</text>
          </svg>
          <svg id="legend-2" x="1330" y="70" data-phase="2">
            <rect x="0" y="0" width="90" height="20" className="sector" aria-label="CP"/>
            <text x="10" y="15" className="label" aria-label="CP">Onderdeel</text>
          </svg>
          <svg id="legend-3" x="1330" y="100" data-phase="3">
            <rect x="0" y="0" width="90" height="20" className="sector" aria-label="CP"/>
            <text x="10" y="15" className="label" aria-label="CP">+5</text>
          </svg>

        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full"
             width="1471" height="900"
             id="map-svg" onClick={(e) => logCoordinates(e)}>

          <svg id="CP" x="440" y="265">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="CP"/>
            <text x="10" y="15" className="label" aria-label="CP">CP</text>
          </svg>

          <svg id="100m" x="350" y="690">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="100m"/>
            <text x="10" y="15" className="label" aria-label="100m">100/110m</text>
          </svg>
          <svg id="200m" x="408" y="180">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="200m"/>
            <text x="10" y="15" className="label" aria-label="200m">200m</text>
          </svg>
          <svg id="300m" x="1080" y="175">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="300m"/>
            <text x="10" y="15" className="label" aria-label="300m">300m</text>
          </svg>
          <svg id="400m" x="1040" y="680">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="400m"/>
            <text x="10" y="15" className="label" aria-label="400m">400m</text>
          </svg>

          <svg id="Finish1" x="935" y="705">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="Finish2"/>
            <text x="10" y="15" className="label" aria-label="Finish2">Finish</text>
          </svg>
          <svg id="Finish2" x="510" y="165">
            <rect x="0" y="0" width="65" height="20" className="sector" aria-label="Finish1"/>
            <text x="10" y="15" className="label" aria-label="Finish1">Finish</text>
          </svg>

          <svg id="Hoog1" x="365" y="280">
            <rect x="93" y="30" width="24" height="36" className="sector" aria-label="Hoog1"/>
            <rect x="0" y="0" width="92" height="98" className="sector" aria-label="Hoog1"/>
            <text x="49" y="55" className="label" aria-label="Hoog1">1</text>
          </svg>
          <svg id="Hoog2" x="1018" y="430">
            <rect x="0" y="30" width="24" height="36" className="sector" aria-label="Hoog2"/>
            <rect x="25" y="0" width="92" height="98" className="sector" aria-label="Hoog2"/>
            <text x="33" y="55" className="label" aria-label="Hoog2">2</text>
          </svg>
          <svg id="Hoog3" x="1018" y="530">
            <rect x="0" y="30" width="24" height="36" className="sector" aria-label="Hoog3"/>
            <rect x="25" y="0" width="92" height="98" className="sector" aria-label="Hoog3"/>
            <text x="33" y="55" className="label" aria-label="Hoog3">3</text>
          </svg>
          <svg id="Hoog4" x="365" y="255">
            <rect x="93" y="30" width="24" height="36" className="sector" aria-label="Hoog4"/>
            <rect x="0" y="0" width="92" height="98" className="sector" aria-label="Hoog4"/>
            <text x="49" y="55" className="label" aria-label="Hoog4">4</text>
          </svg>
          <svg id="Hoog5" x="365" y="355">
            <rect x="93" y="30" width="24" height="36" className="sector" aria-label="Hoog5"/>
            <rect x="0" y="0" width="92" height="98" className="sector" aria-label="Hoog5"/>
            <text x="49" y="55" className="label" aria-label="Hoog5">5</text>
          </svg>
          <svg id="Hoog6" x="1018" y="505">
            <rect x="0" y="30" width="24" height="36" className="sector" aria-label="Hoog6"/>
            <rect x="25" y="0" width="92" height="98" className="sector" aria-label="Hoog6"/>
            <text x="33" y="55" className="label" aria-label="Hoog6">6</text>
          </svg>

          <svg id="Ver1" x="520" y="223">
            <rect x="0" y="0" width="55" height="20" className="sector" aria-label="Ver1"/>
            <rect x="56" y="4" width="245" height="12" className="sector" aria-label="Ver1"/>
            <text x="15" y="15" className="label" aria-label="Ver1">1</text>
          </svg>
          <svg id="Ver2" x="520" y="255">
            <rect x="0" y="0" width="55" height="20" className="sector" aria-label="Ver2"/>
            <rect x="56" y="4" width="245" height="12" className="sector" aria-label="Ver2"/>
            <text x="15" y="15" className="label" aria-label="Ver2">2</text>
          </svg>
          <svg id="Ver3" x="697" y="225">
            <rect x="246" y="0" width="55" height="20" className="sector" aria-label="Ver3"/>
            <rect x="0" y="4" width="245" height="12" className="sector" aria-label="Ver3"/>
            <text x="261" y="15" className="label" aria-label="Ver3">3</text>
          </svg>
          <svg id="Ver4" x="697" y="257">
            <rect x="246" y="0" width="55" height="20" className="sector" aria-label="Ver4"/>
            <rect x="0" y="4" width="245" height="12" className="sector" aria-label="Ver4"/>
            <text x="261" y="15" className="label" aria-label="Ver4">4</text>
          </svg>

          <svg id="Polshoog1" x="463" y="604">
            <rect x="246" y="0" width="73" height="38" className="sector" aria-label="Polshoog1"/>
            <rect x="0" y="13" width="245" height="12" className="sector" aria-label="Polshoog1"/>
            <text x="255" y="25" className="label" aria-label="Polshoog1">1</text>
          </svg>
          <svg id="Polshoog2" x="532" y="642">
            <rect x="246" y="0" width="58" height="38" className="sector" aria-label="Polshoog2"/>
            <rect x="0" y="13" width="245" height="12" className="sector" aria-label="Polshoog2"/>
            <text x="255" y="25" className="label" aria-label="Polshoog2">2</text>
          </svg>
          <svg id="Polshoog3" x="709" y="604">
            <rect x="0" y="0" width="73" height="38" className="sector" aria-label="Polshoog3"/>
            <rect x="74" y="13" width="245" height="12" className="sector" aria-label="Polshoog3"/>
            <text x="10" y="25" className="label" aria-label="Polshoog3">1</text>
          </svg>
          <svg id="Polshoog4" x="778" y="642">
            <rect x="0" y="0" width="58" height="38" className="sector" aria-label="Polshoog4"/>
            <rect x="59" y="13" width="245" height="12" className="sector" aria-label="Polshoog4"/>
            <text x="8" y="25" className="label" aria-label="Polshoog4">2</text>
          </svg>

          <svg id="Speer1" x="232" y="223" className="showupto50">
            <rect x="53" y="179" width="147" height="25" className="sector" aria-label="Speer1"/>
            <polygon points="151,191 436,117 436,264" className="sector" aria-label="Speer1"/>
            <path d="M 376 133
                     A 232 232 0 0 1 376 249" className="distance distance-30" aria-label="Speer1" />
            <polygon points="436 117 436 264 496 280 496 102" className="sector sector-50" aria-label="Speer1"/>
            <path d="M 436 117
                     A 293 293 0 0 1 436 264" className="distance distance-40" aria-label="Speer1" />
            <path d="M 496 102
                     A 355 355 0 0 1 496 280" className="distance distance-50" aria-label="Speer1" />
            <text x="133" y="197" className="label" aria-label="Speer1">1</text>
          </svg>
          <svg id="Speer2" x="283" y="250" className="showupto50">
            <rect x="0" y="179" width="200" height="25" className="sector" aria-label="Speer2"/>
            <polygon points="151,191 436,117 436,264" className="sector" aria-label="Speer2"/>
            <path d="M 376 133
                     A 232 232 0 0 1 376 249" className="distance distance-30" aria-label="Speer2" />
            <polygon points="436 117 436 264 496 280 496 102" className="sector sector-50" aria-label="Speer2"/>
            <path d="M 436 117
                     A 293 293 0 0 1 436 264" className="distance distance-40" aria-label="Speer2" />
            <path d="M 496 102
                     A 355 355 0 0 1 496 280" className="distance distance-50" aria-label="Speer2" />
            <text x="82" y="197" className="label" aria-label="Speer2">2</text>
          </svg>
          <svg id="Speer3" x="700" y="250" className="showupto50">
            <rect x="315" y="179" width="200" height="25" className="sector" aria-label="Speer3"/>
            <polygon points="363,191 79,117 79,264" className="sector" aria-label="Speer3"/>
            <path d="M 138 133
                     A 232 232 0 0 0 138 249" className="distance distance-30" aria-label="Speer3" />
            <polygon points="79 117 79 264 19 280 19 102" className="sector sector-50" aria-label="Speer3"/>
            <path d="M 79 117
                     A 293 293 0 0 0 79 264" className="distance distance-40" aria-label="Speer3" />
            <path d="M 19 102
                     A 355 355 0 0 0 19 280" className="distance distance-50" aria-label="Speer3"/>
            <text x="415" y="197" className="label" aria-label="Speer3">3</text>
          </svg>
          <svg id="Speer4" x="752" y="277" className="showupto50">
            <rect x="315" y="179" width="146" height="25" className="sector" aria-label="Speer4"/>
            <polygon points="363,191 79,117 79,264" className="sector" aria-label="Speer4"/>
            <path d="M 138 133
                     A 232 232 0 0 0 138 249" className="distance distance-30" aria-label="Speer4"/>
            <polygon points="79 117 79 264 19 280 19 102" className="sector sector-50" aria-label="Speer4"/>
            <path d="M 79 117
                     A 293 293 0 0 0 79 264" className="distance distance-40" aria-label="Speer4"/>
            <path d="M 19 102
                     A 355 355 0 0 0 19 280" className="distance distance-50" aria-label="Speer4"/>
            <text x="365" y="197" className="label" aria-label="Speer4">4</text>
          </svg>

          <svg id="Kogel1" x="336" y="462">
            <polygon points="6,3 34,131 41,131 100,16 71,5 38,0" className="sector" aria-label="Kogel1"/>
            <circle cx="37" cy="141" r="7" className="sector" aria-label="Kogel1"/>
            <text x="33" y="75" className="label" aria-label="Kogel1">1</text>
          </svg>
          <svg id="Kogel2" x="1060" y="272">
            <polygon points="25,2 18,133 25,135 113,36 87,19 54,7" className="sector" aria-label="Kogel2"/>
            <circle cx="19" cy="143" r="7" className="sector" aria-label="Kogel2"/>
            <text x="33" y="75" className="label" aria-label="Kogel2">2</text>
          </svg>

          <svg id="Discus1" x="524" y="299" className="showupto50">
            <polygon points="8,8 253,8 200,141" className="sector" aria-label="Discus1"/>
            <path d="M 191 8
                     A 183 183 0 0 1 149 106" className="distance distance-30" aria-label="Discus1"/>
            <polygon points="253 8 200 141 250 175 314 8" className="sector sector-50" aria-label="Discus4"/>
            <path d="M 253 8
                     A 245 245 0 0 1 200 141" className="distance distance-40" aria-label="Discus1"/>
            <path d="M 314 8
                     A 306 306 0 0 1 250 175" className="distance distance-50" aria-label="Discus1"/>
            <circle cx="8" cy="8" r="8" className="sector" aria-label="Discus1"/>
            <text x="72" y="31" className="label" aria-label="Discus1">1</text>
          </svg>
          <svg id="Discus2" x="450" y="271" className="showupto50">
            <polygon points="8,294 209,154 253,294" className="sector" aria-label="Discus2"/>
            <path d="M 158 189
                     A 183 183 0 0 1 191 294" className="distance distance-30" aria-label="Discus2"/>
            <polygon points="209 154 253 294 314 294 259 119" className="sector sector-50" aria-label="Discus4"/>
            <path d="M 209 154
                     A 245 245 0 0 1 253 294" className="distance distance-40" aria-label="Discus2"/>
            <path d="M 259 119
                     A 306 306 0 0 1 314 294" className="distance distance-50" aria-label="Discus2"/>
            <circle cx="8" cy="294" r="8" className="sector" aria-label="Discus2"/>
            <text x="72" y="277" className="label" aria-label="Discus2">2</text>
          </svg>
          <svg id="Discus3" x="655" y="299" className="showupto50">
            <polygon points="149,148 350,8 105,8" className="sector" aria-label="Discus3"/>
            <path d="M 200 113
                     A 183 183 0 0 1 167 8" className="distance distance-30" aria-label="Discus3"/>
            <polygon points="149 148 105 8 44 8 99 183" className="sector sector-50" aria-label="Discus3"/>
            <path d="M 149 148
                     A 245 245 0 0 1 105 8" className="distance distance-40" aria-label="Discus3"/>
            <path d="M 99 183
                     A 306 306 0 0 1 44 8" className="distance distance-50" aria-label="Discus3"/>
            <circle cx="350" cy="8" r="8" className="sector" aria-label="Discus3"/>
            <text x="265" y="31" className="label" aria-label="Discus3">3</text>
          </svg>
          <svg id="Discus4" x="620" y="271" className="showupto50">
            <polygon points="105,294 350,294 149,154" className="sector" aria-label="Discus4"/>
            <path d="M 167 294
                     A 183 183 0 0 1 200 189" className="distance distance-30" aria-label="Discus4"/>
            <polygon points="105 294 149 154 99 119 44 294" className="sector sector-50" aria-label="Discus4"/>
            <path d="M 105 294
                     A 245 245 0 0 1 149 154" className="distance distance-40" aria-label="Discus4"/>
            <path d="M 44 294
                     A 306 306 0 0 1 99 119" className="distance distance-50" aria-label="Discus4"/>
            <circle cx="350" cy="294" r="8" className="sector" aria-label="Discus4"/>
            <text x="255" y="277" className="label" aria-label="Discus4">4</text>
          </svg>

        </svg>
      </section>
    </div>
  );
}

//970.0999755859375 - 565

//523 - 298
//531.5499877929688 - 306


export default App;
//30m =

// 6.06px/m (9+ +1)
// 0.165m/px
//1m = 6.114566 px
// 4m = 24.458264 px
// 30m = 183.437 px  -> 1.0675m voor ring: 6.52729+183.437 = 189.9643
//                      8m voor speer: 48.91653+183.437 = 232.35353
// 40m = 244.58264 px -> 8m voor speer: 48.91653+ =293.49917
// 50m = 305.7283 px -> 8m voor speer: 48.91653+ =354.64483
// 15m = 92px
// 16m = 98px

// 1216 - 282 = 934 (breedte in pixels)
// 152.75m in werkelijkheid