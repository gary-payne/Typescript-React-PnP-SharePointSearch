/*
//from https://github.com/thomasboyt/react-spin

import * as React from 'react';
import Spinner from './node_modules/spin.js';

interface IReactSpinnerProps {
    // This object is passed in wholesale as the spinner config
    config: any,
    // This is a quick way to overwrite just the color on the config
    color: string
}

export default class ReactSpinner extends React.Component<IReactSpinnerProps,{}> {
  private spinner: Spinner;
  static defaultProps = {
    config: {},
    color: 'black',
  }

  constructor(props: IReactSpinnerProps) {
    super(props);
  }

  componentDidMount() {
    const {color, config} = this.props;
    const spinConfig = {
      // a few sensible defaults
      width: 2,
      radius: 10,
      length: 7,
      // color should not overwrite config
      color,
      // config will overwrite anything else
      config,
    };

    this.spinner = new Spinner(spinConfig);
    this.spinner.spin(this.refs.container);
  }
  componentWillUnmount() {
    this.spinner.stop();
  }
  render() {
    return <span ref="container"/>;
  }
}



// From https://github.com/TheCognizantFoundry/react-loader/blob/master/lib/react-loader.jsx

import * as React from "react";
import * as ReactDOM from "react-dom";

interface ILoaderProps  { 
    className: string, 
    color: string, 
    component: any, 
    corners: number, 
    direction: any, 
    hwaccell: boolean, 
    left: string, 
    length: number, 
    lines: number, 
    loaded: boolean, 
    loadedClassName: string, 
    opacity: number, 
    options: any, 
    parentClassName: string, 
    radius: number, 
    rotate:number, 
    scale: number, 
    shadow: boolean, 
    speed: number, 
    top: string, 
    trail: number, 
    width: number, 
    zIndex: number 
  };

export class Loader extends React.Component<ILoaderProps,ILoaderProps>{ 

  constructor(props: ILoaderProps) {
        super(props);
        this.state = { 
            component: 'div', 
            loadedClassName: 'loadedContent', 
            parentClassName: 'loader' 
        };  
  }

  getDefaultProps () { 
    return { 
      component: 'div', 
      loadedClassName: 'loadedContent', 
      parentClassName: 'loader' 
    }; 
  } 

  componentDidMount () { 
    this.updateState(this.props); 
  } 

  componentWillReceiveProps (nextProps) { 
    this.updateState(nextProps); 
  } 

  updateState (props) { 
    props || (props = {}); 

    var loaded = this.state.loaded; 
    var options = this.state.options; 

    // update loaded state, if supplied 
    if ('loaded' in props) { 
      loaded = !!props.loaded; 
    } 

    // update spinner options, if supplied 
    var allowedOptions = Object.keys(this.state); 
    allowedOptions.splice(allowedOptions.indexOf('loaded'), 1); 
    allowedOptions.splice(allowedOptions.indexOf('options'), 1); 

    // allows passing options as either props or as an option object 
    var propsOrObjectOptions = 'options' in props ? props.options : props; 

    allowedOptions.forEach(function (key) { 
      if (key in propsOrObjectOptions) { 
        options[key] = propsOrObjectOptions[key]; 
      } 
    }); 

    this.setState({ loaded: loaded, options: options }, this.spin); 
  }, 


  spin () { 
    var canUseDOM = !!( 
      typeof window !== 'undefined' && 
      window.document && 
      window.document.createElement 
    ); 

    if (canUseDOM && this.isMounted() && !this.state.loaded) { 
      var spinner = new Spinner(this.state.options); 
      var target =  ReactDOM.findDOMNode(this.refs.loader); 


      // clear out any other spinners from previous renders 
       target.innerHTML = ''; 
       spinner.spin(target); 
     } 
   } 

   render() { 
     var props, children; 

     if (this.state.loaded) { 
       props = { key: 'content', className: this.props.loadedClassName }; 
       children = this.props.children; 
     } else { 
       props = { key: 'loader', ref: 'loader', className: this.props.parentClassName }; 
     } 

     return React.createElement(this.props.component, props, children); 
   } 
 }; 
*/