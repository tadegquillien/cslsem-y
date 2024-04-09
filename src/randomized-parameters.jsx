// The goal of this file is to randomize the elements that need to be randomized once and 
// presented in the same order all throughout the experiment

// We need this because if we randomize an element within a component, the element will be re-randomized
// every time the component refresh. By creating the element here and then exporting it to the relevant
// component, we avoid this issue.

// we import the shuffle function which will allow us to randomize arrays
import { shuffle } from './convenienceFunctions';

//
// define the different machines that can be shown to participants
//

// single-node machine
export const trialType1 = {
    AState: 0,
    BState: 0,
    CState: 0,
    AWired: 0,
    BWired: 0,
    CWired: 0
};

// two-node machines
export const trialType2 = {
    AState: 0,
    BState: 0,
    CState: 0,
    AWired: 1,
    BWired: 0,
    CWired: 0
};

export const trialType3 = {
    AState: 1,
    BState: 0,
    CState: 0,
    AWired: 1,
    BWired: 0,
    CWired: 0
}

export const trialType4 = {
    AState: 0,
    BState: 0,
    CState: 0,
    AWired: 0,
    BWired: 0,
    CWired: 1
}


export const trialType5 = {
    AState: 0,
    BState: 0,
    CState: 1,
    AWired: 0,
    BWired: 0,
    CWired: 1
}

// three-node machines
export const trialType6 = {
    AState: 0,
    BState: 0,
    CState: 0,
    AWired: 1,
    BWired: 0,
    CWired: 1
}


export const trialType7 = {
    AState: 1,
    BState: 0,
    CState: 0,
    AWired: 1,
    BWired: 0,
    CWired: 1
}

export const trialType8 = {
    AState: 0,
    BState: 0,
    CState: 1,
    AWired: 1,
    BWired: 0,
    CWired: 1
}

export const trialType9 = {
    AState: 1,
    BState: 0,
    CState: 1,
    AWired: 1,
    BWired: 0,
    CWired: 1
}

export const trialType10 = {
    AState: 0,
    BState: 1,
    CState: 0,
    AWired: 0,
    BWired: 1,
    CWired: 0
};

export const trialType11 = {
    AState: 0,
    BState: 1,
    CState: 0,
    AWired: 1,
    BWired: 1,
    CWired: 0
};

export const trialType12 = {
    AState: 0,
    BState: 1,
    CState: 1,
    AWired: 0,
    BWired: 1,
    CWired: 1
};

export const predictionItems = shuffle([
    trialType6, trialType6, trialType6,  trialType6,
    trialType7, trialType7, trialType7, trialType7,
    trialType8, trialType8, trialType8, trialType8,
    trialType9, trialType9, trialType9, trialType9
])


// put the test items together and export them
export const testItems = shuffle([trialType2, trialType3, trialType4, trialType5]);
export const test2Items = shuffle([trialType11, trialType12]);


// the condition: 1 means that A (the node on the left) is the generative node and C (right) is the preventative node, 
// 2 means the reverse
export const condition = shuffle([1,2])[0];

// assign shape to A and C
export const shapeAssignment = shuffle(['triangle', 'square']);

// randomize whether the producer or the preventer is introduced first (in the training phase)
export const display_order = shuffle([0,1])[0] ? [0,1] : [1,0];

// randomize the order of presentation of machines within a given trial (in the training phase)
// machines 0 and 1 (single-node and two-node machines) are always presented first and second,
// and we randomize the order of presentations of the three-node machines
export const display_order_within = shuffle(
    [0,1,2,3]
);


const letterOrdering = shuffle([['X', 'Y'], ['Y', 'X']])[0]
export const focalLetters = testItems.map((i)=>{
    return(letterOrdering)
}).flat();

// the machines we show as a Reminder during the test phase
export const testMachines = [trialType7];
// export const testMachines = [trialType1, 
//     shuffle([trialType3, trialType4]), shuffle([trialType6, trialType7, trialType9])].flat();

//
// declare the colors
//

// the colors we will assign to machine A
const mainColors = [shuffle(['black', 'purple']), shuffle(['blue', 'green'])];

// the first color set (for the first set of machines)
const colors = {
    Aon: mainColors[1][0],
    Aoff: mainColors[0][0],
    Bon: 'olive',
    Boff: 'white',
    Con: mainColors[0][1],
    Coff: mainColors[1][1],
    Eon: 'orange',
    Eoff: 'white'
};

// the second color set (this is a relic of an older implementation)
const colors2 = colors;

// put the two color sets together, and randomize them
export const colorSets = shuffle([colors, colors2]);

// the order of the response options
export const questionOrder = [0, 1];