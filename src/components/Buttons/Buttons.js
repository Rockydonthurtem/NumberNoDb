import React from 'react';

function Button(props) {
    return (
        <p>
            {props.fact}
            <button onClick={() => props.sendUpdate(props.index, props.update)}>
                Edit
            </button>
            <button onClick={() => props.deleteFact(props.index)}>Delete</button>
            <input onChange={e => props.handleUpdate(e)} type="text" />
        </p>
    )
}

export default Button