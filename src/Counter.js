import React from 'react';
import {connect} from 'react-redux';

function incrementCounter(num){
    return {type:'INCREMENT',num:num}
}

function Counter5(props){
    function hlandleClick(){
        props.incrementCounter(1);
    }
    return <div>
        <p>{props.count}</p>
        <button onClick={hlandleClick}>Increment</button>
    </div>;
}



function mapStateToProps(state){
    return{
        count:state.count
    };
}

const mapDispatchToProps={
    incrementCounter
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter5);