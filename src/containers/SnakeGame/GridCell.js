import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar/Avatar';

import './GridCell.css';

const GridCell = props => {
  const gridCellClass = `grid-cell`;
  let containerClasses = `GridCellContainer`;
  let style = {
    height: `${props.size}px`,
    width: `${props.size}px`,
  };
  // todo clean this up with, probably with withStyles decorator
  if (props.foodCell) {
    style = {
      ...style,
      ...props.foodCell.style,
      height: `${props.size * 0.7}px`,
      width: `${props.size * 0.7}px`,
    };
    containerClasses = `${containerClasses} Food`;
  }
  if (props.snakeCell) {
    style = { ...style, ...props.snakeCell.style };
  }
  if (props.pathCell) {
    style = { ...style, ...props.pathCell.style, opacity: '0.15' };
  }
  return (
    <div
      className={gridCellClass}
      style={{
        height: `${props.size}px`,
        width: `${props.size}px`,
      }}
    >
      <div className={containerClasses} style={style}>
        {props.foodCell && props.foodCell.icon ? (
          <Avatar style={props.foodCell.style}>{props.foodCell.icon}</Avatar>
        ) : (
          ''
        )}
        {props.snakeCell && props.snakeCell.icon ? props.snakeCell.icon : ''}
      </div>
    </div>
  );
};

GridCell.propTypes = {
  foodCell: PropTypes.any,
  snakeCell: PropTypes.any,
  pathCell: PropTypes.any,
  size: PropTypes.number,
};

GridCell.defaultPropTypes = {
  foodCell: false,
  snakeCell: false,
  pathCell: false,
  size: 15,
};

export default GridCell;