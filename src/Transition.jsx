import { textStyle, buttonStyle } from './dimensions';
import { causalRule } from './CausalRule';
import { condition, shapeAssignment } from './randomized-parameters';
import Image from './Image';
import { makeMachine } from './CausalRule';

// this component handles transitions between different parts of the experiment.
// It displays different messages depending on the context in which it is called
// the 'context' variable controls this

const Transition = (props) => {

    const colors = props.colors; 

    const handleClick = () => {
        if (props.context === 'internal') {
            props.setCurrentPhase("test")
        }
        if (props.context === 'internal2') {
            props.setCurrentPhase('test2')
        }
        if (props.context === 'external') {
            props.setCurrentPhase('training2')
        }
    }



    const explanationText = <p>We will now give you an explanation for why the circle is ON in the case below:</p>



    const machineDetails = {'AWired': 1, 
    'BWired': 0,
    'CWired': 1,
    'AState': 1,
    'BState': 0,
    'CState': 0,
    'text': 'textAnC'
    };

    const m = makeMachine(machineDetails, colors, condition);


    const img = <Image AWired={m.AWired} BWired={m.BWired} CWired={m.CWired} Etext={''}
                        Acolor={m.Acolor} Bcolor={m.Bcolor} Ccolor={m.Ccolor} Ecolor={m.Ecolor} 
                        r={20} AState={m.AState} BState={m.BState} CState={m.CState} EState={m.EState}  
                        AShape={shapeAssignment[0]} BShape={'circle'} CShape={shapeAssignment[1]} EShape = {'circle'} 
                        metaVisibility={'visible'} />

    const causalVerbs = condition == 1 ? ['CAUSES', 'ALLOWS'] :
    condition == 2 ? ['ALLOWS', 'CAUSES'] : NaN;

    const ExplanationA = <p>The fact that the {shapeAssignment[0]} is <b><span style={{color: m.Acolor}}>{m.Acolor}</span></b> <b>{causalVerbs[0]}</b> the 
    circle to be <b><span style={{color: m.Ecolor}}>ON</span></b>.</p>;

    const ExplanationC = <p>The fact that the {shapeAssignment[1]} is <b><span style={{color: m.Ccolor}}>{m.Ccolor}</span></b> <b>{causalVerbs[1]}</b> the 
    circle to be <b><span style={{color: m.Ecolor}}>ON</span></b>.</p>




    const text = (props.context === 'internal' | props.context === 'internal2') ?
        <span>
            <p>Next we will ask you to make some predictions about other machines.</p>
            <p>For each of these machines, you will see the color of some of the nodes, and we will ask you if you think the circle 
                is <b><span style={{color: m.Ecolor}}>ON</span></b> or <b>OFF</b>.</p>
        </span>
        :

        <span>
            <p>You have now completed half of the experiment.</p>
            <p>Now we will show you machines of a different type than the ones you saw before (as you will see, their nodes have different shapes). <b>The
                rules that determine how these machines work might be different than for the machines that you saw before.</b></p>
            <p>The procedure will be the same as before. First we will give you information about the machines and ask you to make predictions, and later we will ask you to select explanations.</p>
        </span>

    const nextPageButton = <button style={buttonStyle} onClick={() => handleClick()}>Next</button>;

    return (
        <div style={textStyle}>
            {explanationText}
            {img}
            {ExplanationA}
            {ExplanationC}
            {text}
            {nextPageButton}
            <br></br>
        </div>

    )
}

export default Transition;