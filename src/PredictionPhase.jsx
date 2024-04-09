 
import { useState } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { predictionItems, shapeAssignment } from './randomized-parameters';
import Data from './Data';
import Image from './Image';
import { causalRule, giveColors } from './CausalRule';
import './trainingPhase.css';


const PredictionPhase = (props) => {

    
    const colors = props.colors;

    // a scaling factor that controls the size of the image 
    // technically 'r' refers to the radius of a node, and all other dimensions
    // are multiples of this
    const r = 30;

    // is the state of E shown to the participant?
    const [Eknown, setEknown] = useState(0);

    // a text string showing the participant's prediction
    const [pred, setPred] = useState(<p style={{ visibility: "hidden" }}>hello</p>);

    // are the prediction buttons clickable or disabled?
    const [predButtonState, setPredButtonState] = useState(1);
    // which prediction button has been clicked on?
    const [chosenButton, setChosenButton] = useState(0);

    // manages what happens when we click on the next-page button
    const handleClick = () => {
        // increment the training number so as to go to the next page
        props.incrementTraining(props.trainingNumber)
    }

    // manages what happens when we click on a prediction button
    const handlePred = (response) => {
        // Reveal the state of E
        setEknown(1);
        // compute whether the participant's prediction was correct
        let correct = (EState == 1 & response == "On") | (EState == 0 & response == "Off");
        // adjust the text accordingly
        setPred(<p>You predicted <b>{response}</b>. {correct ? "You are correct!" :
            <span>The correct answer was
                actually <b>{EState == 1 ? "On" : "Off"}</b> </span>}</p>);
        // disable the prediction buttons
        setPredButtonState(0);
        // identify which button was clicked (so we hide the other)
        setChosenButton(response);
        // increment the counters
        props.setCounterCorrect((a) => a + correct);
        props.setCounterTotal((a) => a + 1);
        // record the data
        Data.training.push({
            'trialNumber': props.trainingNumber,
            'AState': AState,
            'BState': BState,
            'CState': CState,
            'AWired': AWired,
            'BWired': BWired,
            'CWired': CWired,
            'EState': EState,
            'prediction': response,
            'correct': correct,
            'condition': props.condition,
            'Acolor': Acolor
        });
    }

    // a pair of buttons that allow participants to make their predictions
    const predictionButtonOn = <button style={{
        ...buttonStyle,
        width: '50px',
        height: '50px',
        backgroundColor: colors.Eon,
        cursor: predButtonState ? 'pointer' : 'default',
        visibility: chosenButton == 0 ? 'visible' :
            (chosenButton == 'On' ? 'visible' : 'hidden')
    }}
        disabled={1 - predButtonState}
        onClick={() => handlePred("On")}>On</button>;

    const predictionButtonOff = <button style={{
        ...buttonStyle,
        // width: '6vw',
        // height: '4.5vw',
        width: '50px',
        height: '50px',
        backgroundColor: colors.Eoff,
        cursor: predButtonState ? 'pointer' : 'default',
        visibility: chosenButton == 0 ? 'visible' :
            (chosenButton == 'Off' ? 'visible' : 'hidden')

    }} disabled={1 - predButtonState}
        onClick={() => handlePred("Off")} > Off</ button>;

    // a text informing participants of their progress
    const text = <p>This is question number {props.trainingNumber+1}/{predictionItems.length}. You have
        answered {props.counterCorrect}/{props.counterTotal} questions
        correctly.
    </p>;

    const questionText = <p>Do you think the node marked with a '?' is on or off? </p>

    // the next-page button (appears once the participant made their prediction)
    const nextPageButton = <button style={{
        ...buttonStyle,
        visibility: Eknown ? 'visible' : 'hidden'
    }} onClick={() => handleClick()}>Next</button>;

    // import the trial data
    const trialData = props.trainingNumber == 0 ? predictionItems[0] : predictionItems[props.trainingNumber-1];
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
    const [Acolor, Bcolor, Ccolor] = giveColors(AState, BState, CState, EState, colors);
    const Ecolor = Eknown == 1 ?
        (EState ? colors.Eon : colors.Eoff) : "lightgrey";

    // displays a '?' inside the E node when its state is unknown
    const Etext = Eknown ? "" : "?";

    // graphical display of the machine
    const img = <Image
        AWired={AWired} BWired={BWired} CWired={CWired} Etext={Etext}
        Acolor={Acolor} Bcolor={Bcolor} Ccolor={Ccolor} Ecolor={Ecolor}
        r={r} AState={AState} BState={BState} CState={CState} EState={EState} 
        AShape={shapeAssignment[0]} BShape ='circle' CShape={shapeAssignment[1]} EShape='circle'
         />;
    

   
        // collect the things to be displayed
        const toBeReturned = 
    
        <div style={textStyle}
        >
            {text}
            {questionText}
            <div className='a'>
                <div className='b' >
                    {predictionButtonOn}
                </div>
                <div className='b' style={{ color: 'white' }}>  "" </div>
                <div className='b'>
                    {predictionButtonOff}
                </div>
            </div>


            {pred}
            {nextPageButton}
            {img}

        </div>
         
    return (
        <div>        {toBeReturned}
        </div>
    )
}

export default PredictionPhase;