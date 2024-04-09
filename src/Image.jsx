// This component handles the graphical representation of a machine

import {
    graphicalDimensions,
    makeLine, makeLineSq, makeArrow,
    getIntersectionDiamond
} from './graphicalInterface';
import { shapeAssignment } from './randomized-parameters';


const Image = ({ Acolor, Bcolor, Ccolor, Ecolor, AWired, BWired, CWired,
    Atext, Btext, Ctext, Etext, r, AState, BState, CState, EState, AShape, BShape, CShape, EShape, metaVisibility='yes' }) => {

    // whether nodes A and E are diamond- or circle-shaped
    // compute the relevant dimensions, using the graphicalDimensions function we imported
    const [ax, ay, bx, by,
        cx, cy, strTriangleA, strDiamondA, strPentagonA,
         strTriangleB, strDiamondB, strPentagonB,
         strTriangleC, strDiamondC, strPentagonC,
        strDiamondE, ex, ey, circleWidth,
        svgWidth, svgHeight] = graphicalDimensions(r, AWired, BWired, CWired);

    // the angle and length of the arrows
    const theta = .5;
    const arrowLength = .7 * r;

    // get coordinates for the wire connecting node A
    const aeLine = makeLine(ax, ay, ex, ey, r);
    const ae_start = aeLine[0];

    // get the coordinates for the intersection between AE and E
    const diamondCoordinatesE = strDiamondE[0];
    const intersectAE = AShape === "diamond" ?
        getIntersectionDiamond(ax, ay, ex, ey, diamondCoordinatesE) :
        aeLine[1];

    // get the coordinates for the intersection between CE and E
    const ceLine = makeLine(cx, cy, ex, ey, r);
    const intersectCE = CShape === "diamond" ?
        getIntersectionDiamond(cx, cy, ex, ey, diamondCoordinatesE) :
        ceLine[1];

    // compute coordinates for the arrow tips
    const [rightTipAX, rightTipAY, leftTipAX, leftTipAY] = makeArrow(ae_start, intersectAE, theta, arrowLength);

    // get coordinates for the wire connecting node B
    const beLine = makeLine(bx, by, ex, ey, r);
    const be_start = beLine[0];
    const be_end = beLine[1];

    // get get the coordinates for the intersection between BE and E
    const intersectBE = 
    // BShape === "diamond" ?
    //     getIntersectionDiamond(bx, by, ex, ey, diamondCoordinatesE) :
        beLine[1];

    // compute coordinates for the arrow tips
    const [rightTipBX, rightTipBY, leftTipBX, leftTipBY] = makeArrow(be_start, intersectBE, theta, arrowLength);

    // compute coordinates for the arrow tips
    const [rightTipCX, rightTipCY, leftTipCX, leftTipCY] = makeArrow([cx, cy],
        intersectCE, theta, arrowLength);

    // determine item visibility
    const Avisible = metaVisibility === 'hidden' ? 'hidden' :
    (AWired ? "visible" : "hidden");
    const Bvisible = metaVisibility === 'hidden' ? 'hidden' :
        (BWired ? "visible" : "hidden");
    const Cvisible = metaVisibility === 'hidden' ? 'hidden' :
        (CWired ? "visible" : "hidden");
    const Evisible = metaVisibility === 'hidden' ? 'hidden' : 'visible';

    // text coordinate adjustment
    const textAdjustment = [shapeAssignment[0] === 'triangle' ? 6 : 0,
    shapeAssignment[1] === 'triangle' ? 6 : 0];

    
    //
    // generate the svg content for each node (including the corresponding wire and arrow tips)
    //
    // retrieve the shape of the nodes (i.e. diamond or circle)
    const ANode = AShape === "diamond" ?
        <polygon points={strDiamondA[1]} fill={Acolor} visibility={Avisible}
            stroke="black" strokeWidth={circleWidth} /> :
        AShape === 'circle' ?
        <circle cx={ax} cy={ay} r={r} fill={Acolor} visibility={Avisible}
            stroke="black" strokeWidth={circleWidth} /> :
        AShape === 'square' ?
        <rect x={ax - r} y={ay - r} width={2 * r} height={2 * r} fill={Acolor} visibility={Avisible}
        stroke="black" strokeWidth={circleWidth} /> : 
        AShape === 'triangle' ?
        <polygon points={strTriangleA} fill={Acolor} visibility={Avisible}
            stroke="black" strokeWidth={circleWidth} /> : NaN
        ;

    const BNode = BShape === 'diamond' ?
    <polygon points={strDiamondB[1]} fill={Bcolor} visibility={Bvisible}
            stroke="black" strokeWidth={circleWidth} /> :
            BShape === 'circle' ?
            <circle cx={bx} cy={by} r={r} fill={Bcolor} visibility={Bvisible}
            stroke="black" strokeWidth={circleWidth} /> :
            BShape === 'square' ?
            <rect x={bx - r} y={by - r} width={2 * r} height={2 * r} fill={Bcolor} visibility={Bvisible}
        stroke="black" strokeWidth={circleWidth} /> : 
        BShape === 'triangle' ? 
        <polygon points={strTriangleB} fill={Bcolor} visibility={Bvisible}
            stroke="black" strokeWidth={circleWidth} /> :
        BShape === 'pentagon' ?
        <polygon points={strPentagonB[1]} fill={Bcolor} visibility={Bvisible}
            stroke="black" strokeWidth={circleWidth} /> :
        NaN;

       

        const CNode = CShape === 'diamond' ?
        <polygon points={strDiamondC[1]} fill={Ccolor} visibility={Cvisible}
                stroke="black" strokeWidth={circleWidth} /> :
                CShape === 'circle' ?
                <circle cx={cx} cy={cy} r={r} fill={Ccolor} visibility={Cvisible}
                stroke="black" strokeWidth={circleWidth} /> :
                CShape === 'square' ?
                <rect x={cx - r} y={cy - r} width={2 * r} height={2 * r} fill={Ccolor} visibility={Cvisible}
            stroke="black" strokeWidth={circleWidth} /> : 
            CShape === 'triangle' ? 
            <polygon points={strTriangleC} fill={Ccolor} visibility={Cvisible}
                stroke="black" strokeWidth={circleWidth} /> :
            NaN;

    

    const ENode = EShape === "diamond" ?
        <polygon points={strDiamondE[1]} fill={Ecolor}
            stroke="black" strokeWidth={circleWidth} /> :
        <circle cx={ex} cy={ey} r={r} fill={Ecolor} stroke="black" strokeWidth={circleWidth} visibility={Evisible}/>;

    // generate svg for A
    const Aimg = <>
        <line x1={ax} y1={ay} x2={intersectAE[0]} y2={intersectAE[1]} visibility={Avisible}
            stroke="black" strokeWidth="2" />
        <line x1={intersectAE[0]} y1={intersectAE[1]} x2={rightTipAX} y2={rightTipAY} visibility={Avisible}
            stroke="black" strokeWidth="2" />
        <line x1={intersectAE[0]} y1={intersectAE[1]} x2={leftTipAX} y2={leftTipAY} visibility={Avisible}
            stroke="black" strokeWidth="2" />
        {ANode}
        <text x={ax} y={ay + textAdjustment[0] + .45 * r} fontSize={1.3 * r}
            textAnchor='middle' visibility={Avisible}
            fill="white"
        >{Atext}</text>

    </>;

    // generate svg for B
    const Bimg = <>
    <text x={bx} y={by + .45 * r} fontSize={1.3 * r} visibility={Bvisible}
            fill={BState ? "white" : "black"}
            textAnchor='middle'
        >{Btext}</text>
        <line x1={be_start[0]} y1={be_start[1]} x2={be_end[0]} y2={be_end[1]} visibility={Bvisible}
            stroke="black" strokeWidth="2" />
        <line x1={intersectBE[0]} y1={intersectBE[1]} x2={rightTipBX} y2={rightTipBY} visibility={Bvisible}
            stroke="black" strokeWidth="2" />
        <line x1={intersectBE[0]} y1={intersectBE[1]} x2={leftTipBX} y2={leftTipBY} visibility={Bvisible}
            stroke="black" strokeWidth="2" />
        {BNode}
        

    </>;

    // generate svg for C
    const Cimg = <>
        <line x1={cx} y1={cy} x2={ex} y2={ey} stroke="black" strokeWidth="2"
            visibility={Cvisible} />
        {CNode}
        <text x={cx} y={cy + textAdjustment[1] + .45 * r} fontSize={1.3 * r} visibility={Cvisible}
            textAnchor='middle' fill={'white'}
        >{Ctext}</text>
        <line x1={intersectCE[0]} y1={intersectCE[1]} x2={rightTipCX} y2={rightTipCY} stroke="black" strokeWidth="2"
            visibility={Cvisible} />
        <line x1={intersectCE[0]} y1={intersectCE[1]} x2={leftTipCX} y2={leftTipCY} stroke="black" strokeWidth="2"
            visibility={Cvisible} />
    </>;

    // generate svg for E
    const Eimg = <>
        {ENode}
        <text x={ex} y={ey + .45 * r} fontSize={1.3 * r}
            fill={Etext === '?' ? 'black' :
                (EState ? "white" : "black")
            }
            textAnchor='middle' 
        >{Etext}</text>
    </>;

    let svgWidth2 = svgWidth;

    // collect all the svg contents into an svg
    const img = <svg height={svgHeight} width={svgWidth2} 
        xmlns="http://www.w3.org/2000/svg">
        {Aimg}
        {Bimg}
        {Cimg}
        {Eimg}
    </svg>;

    // return the svg
    return (img)

}

export default Image;