// this script controls what happens during the test phase

import { useState, useEffect } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import {
    testItems, test2Items, questionOrder, shapeAssignment, focalLetters
} from './randomized-parameters';
import { causalRule, giveColors } from './CausalRule';
import Image from './Image';
import Data from './Data';
import Reminder from './Reminder';
import './TestPhase.css';

const TestPhase = (props) => {

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    //   }, [])

    // import the node colors
    const colors = props.colors;

    // initialize the variable storing the participant's response
    const [response, setResponse] = useState(0);

    // initialize the variable storing the participant's confidence
    const [confidence, setConfidence] = useState(0);

    // the size of a node
    const r = 20;

    // manages what happens when a participant clicks on the next-page button
    const handleClick = () => {

        // stores relevant data to the Data object
        Data.responses.push(
            {
                trialNumber: questionNumber - 1,
                focalLetter: focalLetter,
                AState: AState,
                BState: BState,
                CState: CState,
                EState: EState,
                AWired: AWired,
                BWired: BWired,
                CWired: CWired,
                condition: props.condition,
                Acolor: Acolor,
                Ccolor: Ccolor,
                response: response,
                confidence: confidence
                
            })
        console.log(Data);
        // increment the trial number so as to go to the next trial
        props.incrementTest(props.testNumber)
    }

    // the header
    const questionNumber = props.currentPhase === 'test' ? props.testNumber + 1 :
    props.currentPhase === 'test2' ? props.testNumber + testItems.length + 1 : NaN;
    const text = <p>This is question {questionNumber} / {testItems.length + test2Items.length}.
    </p>;

   

    // import the trial data
    const trialData = props.currentPhase === 'test' ? testItems[props.testNumber] :
        props.currentPhase === 'test2' ? test2Items[props.testNumber] : NaN;

    console.log(props.currentPhase)

    // The states of the exogenous components
    const AState = trialData.AState;
    const BState = trialData.BState;
    const CState = trialData.CState;

    // // whether the components are connected to the machine
    const AWired = trialData.AWired;
    const BWired = trialData.BWired;
    const CWired = trialData.CWired;

    // compute the state of node E
    const EStateNumeric = causalRule(props.condition, AState, BState, CState,
        AWired, BWired, CWired);
    const EState = (EStateNumeric > 0);

    // Give colors to the nodes according to their logical state
    const [Acolor, Bcolor, Ccolor, Ecolor] = giveColors(AState, BState, CState, EState, colors);


    // graphical display of the machine
    const img = <Image
        AWired={AWired} BWired={BWired} CWired={CWired}
        Etext='?' Atext='' Btext='B' Ctext=""
        Acolor={Acolor} Bcolor={Bcolor} Ccolor={Ccolor} Ecolor={'lightgrey'} r={r}
        AState={AState} BState={BState} CState={CState} EState={EState} 
        AShape={shapeAssignment[0]} BShape={'diamond'} CShape={shapeAssignment[1]} EShape = {'circle'} />;


    // the question text
    const questionText = <p>Do you think the circle is <b>ON</b> or <b>OFF</b>?</p>

    // select the letter that the question is about
    const focalLetter = focalLetters[props.testNumber];
    const focalColor = focalLetter === 'X' ? Acolor : 
    focalLetter === 'Y' ? Ccolor : NaN;


    // text for the different response options
    const options = [
        <span>ON</span>,
        <span>OFF</span>
    ]

    // this function updates the response variable when the participant selects an option
    const handleQuestion = (e) => {
        setResponse(e.target.value);
    }

    // this function updates the confidence variable when the participant selects an option
    const handleLikert =(e) => {
        setConfidence(e.target.value);
    }

    // an array containing the html elements that make up the response form
    // we store them in an array so that we can display them in an arbitrary order
    // (to allow between-participants randomization)
    const inputElements = [
        <>
            <input type="radio" id="on" name="question" value="on" className="radio" />
            <label for="on">{options[0]}</label><br /><br />
        </>,
        <>
            <input type="radio" id="off" name="question" value="off" className="radio" />
            <label for="off">{options[1]}</label><br /><br />
        </>

    ]

    // the html multiple-choice response form
    const inputForm = <form onChange={(e) => handleQuestion(e)}>
        {inputElements[questionOrder[0]]}
        {inputElements[questionOrder[1]]}
    </form >;


    const likertText = <p style={{visibility: response===0 ? 'hidden' : 'visible'}}>You 
    answered {response === 0 ? NaN : response.toUpperCase()}. How confident are you in your
     answer? (1: not at all, 7: very confident)</p>

    const likert =  <form style={{visibility: response===0 ? 'hidden' : 'visible'}}
    onChange={(e) => handleLikert(e)}>
        <label><input name="l" type="radio" className='likert' value="1"/><span>1</span></label>
        <label><input name="l" type="radio" className='likert' value="2"/><span>2</span></label>
        <label><input name="l" type="radio" className='likert' value="3"/><span>3</span></label>
        <label><input name="l" type="radio" className='likert' value="4"/><span>4</span></label>
        <label><input name="l" type="radio" className='likert' value="5"/><span>5</span></label>
        <label><input name="l" type="radio" className='likert' value="6"/><span>6</span></label>
        <label><input name="l" type="radio" className='likert' value="7"/><span>7</span></label>
    </form>

    // the button leading to the next page;
    const nextPageButton = <button style={{...buttonStyle, visibility: confidence===0 ? 'hidden': 'visible' }}
    onClick={() => handleClick()}>Next</button>;

    return (
        <div style={textStyle}>
            {text}
            <div
            >
                {/* a div with pictures of the previous machines */}
                <Reminder condition={props.condition} colors={colors} mode={props.mode}
                currentPhase={props.currentPhase} />
            </div>

            <p>Consider the machine below:</p>
            {img}
            {questionText}
            {inputForm}
            {likertText}
            {likert}
            <br></br>
            {nextPageButton}

            <br></br>
        </div>

    )
}

export default TestPhase;