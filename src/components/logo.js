import { useEffect, useState, useRef } from 'react';
import { paths, colors, DURATION } from '../constants';
export default function Logo(props) {
    let [idx,setIdx] = useState(0);
    const requestRef = useRef();
    const prevTimeRef = useRef();
    const actualTimeRef = useRef();
    const animate = time => {
        if(prevTimeRef.current !== undefined) {
            const interval = time - prevTimeRef.current
            if(interval !== time) {
                if (interval >= DURATION/(paths.length-1)) {
                prevTimeRef.current = time;
                setIdx(prevIdx => (++idx))
                }
            }
            if (time - actualTimeRef.current < DURATION) {
                requestRef.current = requestAnimationFrame(animate);
            }
            else {
                cancelAnimationFrame(requestRef.current)
            }
            return;
        }
        actualTimeRef.current = time;
        prevTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);

    }

    useEffect( () => {
        requestRef.current = animate();
        return () => { cancelAnimationFrame(requestRef.current)}
    },[])

    return (<svg viewBox={`0 0 300 50`} style={{width:300, marginBottom:30}}>
        <g>
          {
            paths.slice(0,idx).map( (path, pathindex) => {
              return <path
              key={`${idx}-path${Math.random()}`}
              style={{transform:'scale(2)'}}
              d={path}
              stroke={'none'}
             fill={pathindex === idx-1 ? colors.last : colors.rest}></path>
            })
          }
        </g>
      </svg>)
}