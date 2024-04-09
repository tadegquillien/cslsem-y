// This component displays the instructions
// Technically it is several components (one for each page), nested within one big component
// (there migth be more elegant ways to handle this).

// import external components and methods
import { textStyle, buttonStyle } from './dimensions';
import { useState, useEffect } from 'react';
import { makeMachine } from './CausalRule';
import './Instructions.css';
import Image from './Image';
import { condition, shapeAssignment } from './randomized-parameters';


// the main component
const Instructions = (props) => {

    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    // import colors
    const colors = props.colors;

    //the props we will pass on to each page
    const tutorialProps = {
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
        colors: colors
    };



    //the list of pages (add more as you see fit)
    const instructionTrials = [
        <TaskTutorialOne {...tutorialProps} />,
        <TaskTutorialTwo {...tutorialProps} />,
        //<TaskTutorialThree {...tutorialProps} />,
        //<TaskTutorialFour {...tutorialProps} />,
        //<TaskTutorialFive {...tutorialProps} />,
        // etc
    ]
    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

const TaskTutorialOne = (props) => {

    // make sure the participant starts at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleClick = () => {
        props.incrementTrial()
    };

    const r = 30;
    const text = <span>
        <p style={{ color: "red" }}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
        <br></br>
        <p>Thank you for taking part in this study. </p>
        <p>In this experiment, you will investigate simple machines.</p>
        <p>These machines are composed of basic units, called nodes:</p>
    </span>;

    const img1 = <Image Acolor={'red'} Bcolor={'red'} Ccolor={'red'} Ecolor={'white'} AWired={0} BWired={0} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}
         AShape={'circle'} BShape={'circle'} CShape={'circle'} EShape = {'circle'}/>



    const text2 = <span>
        <p>A node can be in different states: for example this node can be either <span style={{ color: 'orange' }}><b>ON</b></span> or <b>OFF</b>.</p>
    </span>;

    const img2 = <Image Acolor={'red'} Bcolor={'red'} Ccolor={'red'} Ecolor={'orange'} AWired={0} BWired={0} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}  AShape={'circle'} BShape={'circle'} CShape={'circle'} EShape = {'circle'} />

    const img3 = <Image Acolor={'red'} Bcolor={'red'} Ccolor={'red'} Ecolor={'white'} AWired={0} BWired={0} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}  AShape={'circle'} BShape={'circle'} CShape={'circle'} EShape = {'circle'} />





    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>

    return (
        <div style={textStyle}>
            <br></br>
            {text}
            {img1}
            {text2}
            <div className="instContainer" style={{}}>
                {img2}
                {img3}
            </div>
            <br></br>
            {nextPageButton}
            <br></br>
        </div >
    )

}


const TaskTutorialTwo = (props) => {

    // make sure the participant starts at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    const handleClick = () => {
        props.setCurrentPhase("training")
    };

    const r = 20;

    // import colors
    const colors = props.colors;

    // features of each machine we will display here
    const trialContent = condition === 1 ? [
        {'AWired': 1, 
        'BWired': 0,
        'CWired': 0,
        'AState': 1,
        'BState': 0,
        'CState': 0,
        'text': 'someText'
    },
    {'AWired': 1, 
    'BWired': 0,
    'CWired': 1,
    'AState': 1,
    'BState': 0,
    'CState': 1,
    'text': 'someText'
     }
    ] :
    [{'AWired': 0, 
    'BWired': 0,
    'CWired': 1,
    'AState': 0,
    'BState': 0,
    'CState': 0,
    'text': 'someText'
    },
    {'AWired': 1, 
    'BWired': 0,
    'CWired': 1,
    'AState': 0,
    'BState': 0,
    'CState': 0,
    'text': 'someText'
    }];

    // machine illustrating generation
    const mg = makeMachine(trialContent[0], colors, condition);
    // machine illustrating prevention
    const mp = makeMachine(trialContent[1], colors, condition);


    // text explaining how machines work
    const text1 = <span>
        <p>Nodes can be wired together to form a larger machine.
            The state of the node at the origin of the arrow can influence the state of the node at the end of the arrow.</p>
            <p>Different types of nodes can have different effects.</p>
    </span>;

    const textGen =  <p> For example, here the diamond node can make the circle node turn <b><span style={{color: 'orange'}}>ON</span></b>:</p>
    // images of the machines

    // generative node, unwired
    const imgGenUnwired = <Image Acolor={'olive'} Bcolor={'olive'} Ccolor={'olive'} Ecolor={'white'} AWired={0} BWired={0} CWired={0}
    Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={0}  
    AShape={'diamond'} BShape={'diamond'} 
    CShape={'diamond'} EShape = {'circle'} />;

      // generative node, wired, inactive
      const imgGenWiredOff = <Image Acolor={'olive'} Bcolor={'pink'} Ccolor={'olive'} Ecolor={'white'} AWired={0} BWired={1} CWired={0}
      Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={0}  
      AShape={'diamond'} BShape={'diamond'} 
      CShape={'diamond'} EShape = {'circle'} />;

    // generative node, wired
    const imgGenWired = <Image Acolor={'olive'} Bcolor={'olive'} Ccolor={'olive'} Ecolor={'orange'} AWired={0} BWired={1} CWired={0}
        Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={1} CState={0} EState={1}  
        AShape={'diamond'} BShape={'diamond'} 
        CShape={'diamond'} EShape = {'circle'} />;

    // preventative node, unwired
    const imgPrevUnwired = <Image Acolor={'olive'} Bcolor={'olive'} Ccolor={'olive'} Ecolor={'orange'} AWired={0} BWired={0} CWired={0}
    Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}  
    AShape={'diamond'} BShape={'pentagon'} 
    CShape={'diamond'} EShape = {'circle'} />;

    // preventative node, wired, inactive
    const imgPrevWiredOff = <Image Acolor={'olive'} Bcolor={'pink'} Ccolor={'olive'} Ecolor={'orange'} AWired={0} BWired={1} CWired={0}
    Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={0} CState={0} EState={1}  
    AShape={'diamond'} BShape={'pentagon'} 
    CShape={'diamond'} EShape = {'circle'} />;

    // preventative node, wired
    const imgPrevWired = <Image Acolor={'olive'} Bcolor={'olive'} Ccolor={'olive'} Ecolor={'white'} AWired={0} BWired={1} CWired={0}
    Atext={""} Btext={""} Ctext={""} Etext={""} r={r} BState={1} CState={0} EState={1}  
    AShape={'diamond'} BShape={'pentagon'} 
    CShape={'diamond'} EShape = {'circle'} />;


    const textPrev = <p>Here the pentagon node can make the circle node turn <b>OFF</b>:</p>

    const text3 = <p>In the next page we will show you a machine with three nodes. We will show you how the value of the circle node changes as a function of the value of the nodes it is connected to. </p>

    // next page button
    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>

    return (
        <div style={textStyle}>
            <br></br>
            {text1}
            {textGen}
            <div className='instructionsContainer'>
                {imgGenUnwired}
                {imgGenWiredOff}
                {imgGenWired}
            </div>
            
            {textPrev}
            <div className='instructionsContainer'>
                {imgPrevUnwired}
                {imgPrevWiredOff}
                {imgPrevWired}
            </div>
          
            {text3}

            {nextPageButton}
            <br></br>
        </div >
    )

}




export default Instructions;