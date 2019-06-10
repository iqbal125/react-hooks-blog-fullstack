import React, { useContext, useState, useEffect, useReducer } from 'react';
import * as ACTIONS from '../store/actions/actions';
import * as Reducer1 from '../store/reducers/plain_reducer';
import Context from '../utils/context';


const HooksContainer1 = () => {
  const context = useContext(Context)

  const [value, setValue] = useState(0)

  const [useEffectValue, setUseEffectValue] = useState(null)

  const [state, dispatch] = useReducer(Reducer1.Reducer1, Reducer1.initialState)

  useEffect(() => {
      setTimeout(() => setUseEffectValue("useEffect worked"), 3000 );
  }, [value])

  const incrementValue = () => {
    setValue(value + 1 )
  }

  const decrementValue = () => {
    setValue(value - 1 )
  }

  const handleuseEffectValue = () => {
    setUseEffectValue("some string")
  }

  const handleDispatchTrue = () => {
    //    dispatch(type: "SUCCESS")
    //    dispatch(ACTIONS.SUCCESS)
    dispatch(ACTIONS.success())
  }

  const handleDispatchFalse = () => {
    //     dispatch(type: "FAILURE")
    //    dispatch(ACTIONS.FAILURE)
    dispatch(ACTIONS.failure())
  }

  const handleContextDispatchTrue = () => {
    context.dispatchContextTrue()
  }

  const handleContextDispatchFalse = () => {
    context.dispatchContextFalse()
  }

  return (
    <div>
      <div>
      <button onClick={() => handleuseEffectValue()}> Handle Value  </button>
      <button onClick={() => handleDispatchTrue()}>Dispatch True </button>
      <button onClick={() => handleDispatchFalse()}>Dispatch False </button>
      <button onClick={() => handleContextDispatchTrue()}>Dispatch Context True </button>
      <button onClick={() => handleContextDispatchFalse()}>Dispatch Context False </button>
      <button onClick={() => incrementValue()}> Add Local Value </button>
      <button onClick={() => decrementValue()}> Dec Local Value </button>
      <br />
      <br />
      {context.useContextSubmitState
        ? <h3> {context.useContextSubmitState} </h3>
        : <h3> No User Text </h3>
      }
      <br />
      {state.stateprop1
        ? <p> Local stateprop1 is true </p>
        : <p> Local stateprop1 is false </p>
      }
      <br />
      {context.stateProp1
        ? <p> Global Context stateprop1 is true </p>
        : <p> Global Context stateprop1 is false </p>
      }
      <br />
      {useEffectValue
        ? <p> { useEffectValue }</p>
        : <p> No value </p>
      }
      <br />
      <p>Local Value: {value}</p>
      <br />
      <br />
      </div>
    </div>
  )
}



export default HooksContainer1;
