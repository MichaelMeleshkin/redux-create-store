import React from 'react';
import ReactDOM from 'react-dom';

class Store {
    constructor(reducer) {
        this.reducer = reducer;
        this._getState();
        this.subscribers = [];
    }

    _getState(action = {}) {
        return this.state = this.reducer(this.state, action);
    }
  
    getState() {
        return this._getState();
    }

    dispatch(obj) {
        let { type } = obj;
        this._getState({ type })
        this.subscribers.forEach((callback) => {
            if (callback) {
                callback();
            }
        });
    }

    subscribe(fn) {
        this.subscribers.push(fn);
        return () => {
            this.subscribers.length = 0;
        }
    }
}

let reducer = (state = 0, action) => {
    switch (action.type) {
        case 'REMOVE':
            return state - 1;
        case 'ADD':
            return state + 1;
        default:
            return state
    }
}

let store = new Store(reducer);
window.s = store;

function App() {
    return (
        <div>
            <div id="counter"></div>
            <button id="add">Add</button>
            <button id="remove">Remove</button>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'), () => {
    document.getElementById('add').addEventListener('click', () => { store.dispatch({ type: 'ADD' }); });
    document.getElementById('remove').addEventListener('click', () => { store.dispatch({ type: 'REMOVE' }); });

    function updateCounter() { document.getElementById('counter').textContent = store.getState(); };
    updateCounter();
    store.subscribe(() => { updateCounter(); })
});
