// this component is used during the Test phase, and displays the
// different types of machines the participant saw during the Training phase

import {
    shapeAssignment, testMachines, condition, trialType10
} from "./randomized-parameters";
import { giveColors, causalRule, makeMachine } from "./CausalRule";
import Image from "./Image";
import './TestPhase.css';

const Reminder = (props) => {

    // import node colors
    const colors = props.colors;
    // the size of a node
    let r_reminder = 15;

    const machines = testMachines;


    // compute color assignments for all machines
    // (this creates an array of arrays, where each array contains the colors for one machine)
    const nodeColors = machines.map((a) => {
        let c = giveColors(a.AState, a.BState, a.CState,
            causalRule(props.condition, a.AState, a.BState, a.CState,
                a.AWired, a.BWired, a.CWired), colors);
        return (c)
    });

    // create an svg for each machine
    const images = [0].map((i) => {
        return (
            <Image
                AWired={machines[i].AWired} BWired={machines[i].BWired} CWired={machines[i].CWired} Etext=''
                Acolor={nodeColors[i][0]} Bcolor={nodeColors[i][1]} Ccolor={nodeColors[i][2]}
                Ecolor={nodeColors[i][3]} r={r_reminder}
                AState={machines[i].AState} BState={machines[i].AState}
                CState={machines[i].AState} EState={machines[i].AState} 
                AShape={shapeAssignment[0]} BShape={'circle'} CShape={shapeAssignment[1]} EShape = {'circle'}/>
        )
    });

    const machineDetails = {'AWired': 1, 
    'BWired': 0,
    'CWired': 1,
    'AState': 1,
    'BState': 0,
    'CState': 0,
    'text': 'textAnC'
    };

    const m = makeMachine(machineDetails, colors, condition);


    const causalVerbs = condition == 1 ? ['CAUSES', 'ALLOWS'] :
    condition == 2 ? ['ALLOWS', 'CAUSES'] : NaN;

    const ExplanationA = <p>The fact that the {shapeAssignment[0]} is <b><span style={{color: m.Acolor}}>{m.Acolor}</span></b> <b>{causalVerbs[0]}</b> the 
    circle to be <b><span style={{color: m.Ecolor}}>ON</span></b>.</p>;

    const ExplanationC = <p>The fact that the {shapeAssignment[1]} is <b><span style={{color: m.Ccolor}}>{m.Ccolor}</span></b> <b>{causalVerbs[1]}</b> the 
    circle to be <b><span style={{color: m.Ecolor}}>ON</span></b>.</p>;

    const machineDetails2 = {'AWired': 0,
    'BWired': 1,
    'CWired': 0,
    'AState': 0,
    'BState': 1,
    'CState': 0};

    const m2 = makeMachine(machineDetails2, colors, condition)

    // the new machine
    const machines2 = [trialType10]

    // compute color assignments for the new machine
    const nodeColors2 = machines2.map((a) => {
        let c = giveColors(a.AState, a.BState, a.CState,
            causalRule(props.condition, a.AState, a.BState, a.CState,
                a.AWired, a.BWired, a.CWired), colors);
        return (c)
    });
    // create an svg for each machine
    const images2 = [0].map((i) => {
        return (
            <Image
                AWired={machines2[i].AWired} BWired={machines2[i].BWired} CWired={machines2[i].CWired} Etext=''
                Acolor={nodeColors2[i][0]} Bcolor={nodeColors2[i][1]} Ccolor={nodeColors2[i][2]}
                Ecolor={nodeColors2[i][3]} r={r_reminder}
                AState={machines2[i].AState} BState={machines2[i].AState}
                CState={machines2[i].AState} EState={machines2[i].AState} 
                AShape={shapeAssignment[0]} BShape={'diamond'} CShape={shapeAssignment[1]} EShape = {'circle'}/>
        )
    });


    // the part to add to the output in the generalization trials
    const newMachineJSX = props.currentPhase === 'test' ? '' :
    props.currentPhase === 'test2' ? <span>
        <div className="reminderText">
            <p>Here is another observation you made before:</p>
        </div>
        <div className="reminderNodes">

            <span className='reminderContained2'> {images2[0]} </span>
        </div>
    </span> : NaN;

    // return a div
    return (<div className="reminderContainer">

        <div className="reminderText">
            <p>As a reminder, here is one observation you made before, and an explanation 
                of why the circle is <b><span style={{color: m.Ecolor}}>ON</span></b>.</p>

        </div>
        <div className="reminderNodes">

            <span className='reminderContained2'> {images[0]} </span>
        </div>
        {ExplanationA}
        {ExplanationC}
        {newMachineJSX}



    </div>);
};

export default Reminder;