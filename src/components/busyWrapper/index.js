import React from 'react';
import './style.scss';

const BusyWrapper = (props) => {
  return (
      <div className="busy_wrapper" >
          { props.isBusy
          ? <div className={`overlay_layer ${props.isBusy ? 'show_loader' : ''}`}>
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
            </div>
          : null}
          {props.children}
      </div>
  );
};

BusyWrapper.propTypes = {
  isBusy: React.PropTypes.bool
};

export default BusyWrapper;
