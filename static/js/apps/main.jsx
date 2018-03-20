import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

//const dataprod = require ('./../../../data/mock.json');
// React component
class Counter extends Component {
constructor(){
  super();
  this.state = {
      data: null,
      wait: true
    }
}

componentDidMount(){
  let items = [];
  fetch('http://localhost:1337/items')
  .then(function(response){
    return (response.json());
  }).then(function(data){
      data = data.catalog;
      console.log(data)
  }).then((data) => {
      this.setState({
        data: data,
        wait: false    
      })
    }).catch(error => {
      console.log('error: ' + error);
    })
}
  render() {
    const { value, onIncreaseClick } = this.props
    return (
  <div className="product-container">
        <h1>Carrito</h1>
        <button ><span>{value}</span></button>
        <div className="row">
          <div className="col-md-4">
            <div className="contenedor">
              <p>imagen del producto</p>
              <p>precio del producto</p>
              <button onClick={onIncreaseClick}>Agregar al carro</button>
              <button >Quitar al carro</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/*

*/
Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }
//const decreaseAction = { type: 'decrease' }

// Reducer
//funcion para sumar valores del carrito y descontarlos
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    /*
    case 'decrease':
      return {count: count - 1}
    */
    default:
      return state
  }
}

//cada vez que haga click a agregar al carro se sume al contador
function addCart(){

}

//funcion remover edl carro
function removeCart(){

}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    //value debe ser el valor actual del 
    //span + el precio de lo que se 
    //agrego al carrito
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
const App = connect(mapStateToProps, mapDispatchToProps)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)