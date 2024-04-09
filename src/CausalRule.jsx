

// this script contains functions that determine the state and colors of a machine


// the causal rule

// the abstract causal rule is always the same: we have a generator G and a preventer P, and the outcome E is computed as:
// E := 0 v GWired*G*(1-PWired*P)
// in words: E is 1 if it is connected to G, G is on, and it is NOT connected to a P that is on. E is 0 otherwise. 
// 
// In practice we have two different causal rules, because we want to counterbalance which variable (preventator or generator)
// is on the left vs the right, and implementing different causal rules depending on the circumstance turned out to be the simplest way of doing so.

// CONDIITION=1 : the generator is A (i.e. on the left), and the causal rule is : 
// E := 0 v (AWired*AState*(1-CWired*CState))
// i.e. A=1 is the generator state, and C=1 is the preventator state (i.e. C=0 allows the outcome)
// CONDITION=2 : the generator is C (i.e. on the right), the causal rule is :
// E := 0 v (CWired)*(1-CState)*(1-AWired*(1-AState))
// here C=0 is the generator state, and A=0 is the preventator state (i.e. A=1 allows the outcome)
// this is a bit counter-intuitive (we usually like to think of X=0 as the input default value of a variable),
// but it guarantees a sort of symmetry between the two conditions (C=0 always increases the probability of E, and so does A=1)

// in both conditions, B is also a generative node

// this function computes the state of E given the state of its parent variables,
// and the experimental condition
export const causalRule = (condition,
    AState, BState, CState,
    AWired, BWired, CWired) => {
        console.log(CWired)
    let output = condition === 1 ?
        (0 | AWired*AState*(1-CWired*CState) |
        BWired*BState*(1-CWired*CState)):
        condition === 2 ? 
        (0 | CWired*(1-CState)*(1-AWired*(1-AState)) |
        BWired*BState*(1-CWired*CState)) :
        NaN
    return (output)
}



// this function maps states of the nodes to colors
export const giveColors = (AState, BState, CState, EState, colors) => {
    let Acolor = AState ? colors.Aon : colors.Aoff;
    let Bcolor = BState ? colors.Bon : colors.Boff;
    let Ccolor = CState ? colors.Con : colors.Coff;
    let Ecolor =
        (EState ? colors.Eon : colors.Eoff);
    return ([Acolor, Bcolor, Ccolor, Ecolor]);
}


// this function takes as input the features of a given machine, does some processing
        // on these features (computes colors, and the value of E), and returns the features
        // plus the newly computed information
       export const makeMachine = (content, colors, condition)=>{
            // import features
            let AWired = content.AWired;
            let BWired = content.BWired;
            let CWired = content.CWired;
            let AState = content.AState;
            let BState = content.BState;
            let CState = content.CState;
            // compute value of E
            let EState = causalRule(condition,
                AState, BState, CState,
                AWired, BWired, CWired);
            // compute colors
            let  [Acolor, Bcolor, Ccolor, Ecolor] = giveColors(AState, BState, CState,EState,colors);
            return(
                {'AWired': AWired, 
                'BWired': BWired,
                'CWired': CWired,
                'AState': AState,
                'BState': BState,
                'CState': CState,
                'EState': EState,
                'Acolor': Acolor,
                'Bcolor': Bcolor,
                'Ccolor': Ccolor,
                'Ecolor': Ecolor,
                'text': content.text
            }
            )
        }