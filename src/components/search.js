import { useState, useContext, useRef } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { useNavigate  } from "react-router-dom";
import _ from 'underscore';
import { AddressDispatchContext } from '../Context';
import { API, KEYCODES } from '../constants'
import '../styles/Search.css';


export default function Search() {
  const [state, setState] = useState({
    error: false,
    results: [],
    focus: null
  });
  const AppStateSet = useContext(AddressDispatchContext);
  const [userinput, setInput] = useState('');
  const ddRef = useRef(null);
  const Navigate = useNavigate();
  const onChange = (e) => {
    setState({...state,
      error: false,
      focus: null,
      results: []
    });
    setInput(e.target.value)
    throttledApiRequest(e.target.value)
  };

  const getData = async (val) => {
    // basic input validation
    if (!val) {
      return;
    }
    const input = val.split(' ')
    if (input.length<2){ 
      return;
    }
    if (!input[1]){
      return;
    }
    if (isNaN(input[1]))  // user must enter a numeric digit for house number
    {
      setState({...state,
        error: true});
      return;
    }
    // network call
    const params = {
      postcode:input[0],
      huisnummer:input[1]
    }
    const url = new URL(API);
    for (let key in params) {
      url.searchParams.append(key, params[key])
    }
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json()
      setState({...state,
        results:data
      })
    }
    else {
      console.log(response.status)
    }
  }
 
  const throttledApiRequest = _.throttle(getData, 200);
 
  const onKeyDown = (e) => {
    const { focus, results } = state;
    if (KEYCODES.indexOf(e.keyCode) >= 0) {
        e.preventDefault();
        if (focus === null) {
            setState({...state, focus:0 });
        }
        else if (e.keyCode === 38) { // Down Key
            setState({...state, focus: ((focus - 1) < 0 ? 0 : (focus-1))})
            if(ddRef.current)
                ddRef.current.scrollTo({top:ddRef.current.scrollTop-40});
        }
        else if (e.keyCode === 40) { // Up Key
            setState({...state, focus: (focus + 1) });
            if(ddRef.current)
                ddRef.current.scrollTo({top:ddRef.current.scrollTop+40});
        }

        else if (e.keyCode === 13 && results[focus]) { // Enter Key
            selectOption(results[focus]);
        }
    }
    else if (e.keyCode === 27) {  // Escape Key
        setState({
          ...state,
          results:[],
          focus: null
        });
    }
  }

  const selectOption = (opt) =>  {
    AppStateSet(opt);
    Navigate('/confirmation');
  };

  return (<><div className='flex searchwrap'>
    <div className='search'>
        <TextField 
          id='searchbar'
          variant='outlined'
          style={{width:'100%', minWidth:250}}
          onChange={onChange}
          value={userinput}
          error={state.error}
          label={state.error ? 'Incorrect address, please verify':'Enter your zipcode and housenumber'}
          onKeyDown={onKeyDown}
        />
    </div>
    <IconButton onClick={getData} aria-label="search" color='primary'><SearchIcon /></IconButton>
    {
      // state.results.map( (item) => {
      //   return <div>{item.openbareruimtee}, {item.huisnummer} - {item.huisletter} {item.postcode}</div>
      // })
      state.results.length > 0 && <div className='autolist' ref={ddRef}>
        <ul aria-label='Address List'>
          {
            state.results.map( (item, idx) => {
              const isFocus = (state.focus != null && state.focus === idx) ? true : false;
              const classes = `${isFocus ? 'focused' : ''}`;
              return <DropDownEl
                key={idx} 
                onMouseDown={(e) => {e.preventDefault();selectOption(item)}}
                className={classes}
                item={item}
                isFocus={isFocus}
              />
            })  
          }
        </ul>
        </div>
    }
  </div>
  </>)
}

const DropDownEl = (props) => {
  return (<li onMouseDown={props.onMouseDown} className={props.className}>
    <svg width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg" fill={props.isFocus ? '#FFF': '#297AFF'}><path d="M18.8721 5.13679L17.6883 6.39326L4.00102 20.9203H5.77012L19.6569 6.1815C19.5239 5.75797 19.2578 5.37679 18.8721 5.13679ZM14.3629 2.38385L0.25 17.3486V19.2262L15.4935 3.07562L14.3629 2.38385ZM10.8912 0.252086C10.4256 -0.0302672 9.88029 -0.0726201 9.40143 0.110909L3.48226 6.39326L0.25 9.80973V11.6874L5.23806 6.39326L7.91166 3.55562L10.9843 0.294439L10.8912 0.252086ZM5.25136 2.62385L1.1412 5.13679C1.1146 5.15091 1.07469 5.17914 1.04809 5.19326C0.848567 5.33444 0.675651 5.51797 0.542636 5.72973C0.356415 6.0262 0.25 6.39326 0.25 6.76032V7.91797L1.68656 6.39326L5.25136 2.62385ZM12.1149 1.00032L7.92497 5.44738L7.03376 6.39326L0.25 13.5791V15.4568L8.80286 6.39326L13.2323 1.69209L12.1149 1.00032ZM16.6241 3.76738L14.1501 6.39326L7.92497 13.0003L0.462818 20.9203H2.23192L7.92497 14.878L15.9192 6.39326L17.7548 4.44503L16.6241 3.76738ZM7.91166 20.5391L7.55253 20.9203H9.32162L19.7367 9.86621V7.98856L7.91166 20.5391ZM9.9867 22.1203V23.998L19.75 13.6356V11.758L9.9867 22.1203ZM18.2868 20.8497H19.7234C19.7367 20.7509 19.75 20.638 19.75 20.525V19.2968L18.2868 20.8497ZM14.722 20.8497H16.4911L19.7367 17.405V15.5274L14.722 20.8497Z"></path></svg> 
    <span>{props.item.openbareruimte} {props.item.huisnummer}-{props.item.huisletter}</span><small style={{marginLeft:10}}>{props.item.postcode}, {props.item.woonplaats}</small>
  </li>);
}