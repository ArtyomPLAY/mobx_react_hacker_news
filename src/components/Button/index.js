import React from 'react';

import './styles.css';

function classMixin(object) {
  let className = '';
  Object.keys(object).forEach(
    key => (className += object[key] ? key + ' ' : '')
  );
  return className.trim();
}

const Button = ({ children, ...props }) => {
  const {
    loading,
    disabled,
    className,
    style,
    icon,
    color = '#ff0000',
    bg,
    outlined,
    filled,
    uppercase,
    padding,
    margin,
    mx,
    my,
    size,
    iconSize,
    px,
    py,
    bradius,
    ...rest
  } = props;

  const colorMix = {
    hover: (bg || color) + (filled ? 'e8' : '1a'),
    active: (bg || color) + (filled ? 'b8' : '4a')
  };

  const styleMix = {
    '--color': color,
    '--bg': bg,
    '--color-bg-hover': colorMix.hover,
    '--color-bg-active': colorMix.active,
    '--border-radius': bradius,
    '--margin-v': my || margin,
    '--margin-h': mx || margin,
    '--padding-v': py || padding || (!children || (loading && '10px')),
    '--padding-h': px || padding || (!children || (loading && '10px')),
    '--font-size': size,
    '--icon-size': iconSize,
    ...style
  };

  const classMix = {
    button: true,
    uppercase: uppercase,
    outlined: outlined,
    filled: filled,
    disabled: disabled
  };

  const iconStyle = {
    marginRight: children ? 5 : 0
  };

  let classes = classMixin(classMix) + (className ? ' ' + className : '');

  const Icon = () =>
    icon ? (
      <i className="material-icons" style={iconStyle}>
        {icon}
      </i>
    ) : (
      ''
    );

  return (
    <button className={classes} style={styleMix} {...rest}>
      {loading ? <div className="loader" /> : <Icon />}
      {!loading && children}
    </button>
  );
};

export default Button;
