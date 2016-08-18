/* eslint-disable no-underscore-dangle */
import React, {PropTypes} from 'react';
import classnames from 'classnames';
import styles from './SvgIcon.css';

const CLEAN = [
  / +fill="(none|#[0-9a-f]+)"/i,
  / +style="([\s\S]+?)"/i
];

function getSize(svg) {
  const viewbox = svg.match(/ +viewBox="([\d\s\.]+)"/i);
  if (viewbox) {
    const dimensions = viewbox[1].split(' ');
    return {
      width: `${dimensions[2]}px`,
      height: `${dimensions[3]}px`
    };
  }

  return null;
}

function SvgIcon({svg, className, svgClassName, width, height, style, component = 'i', ...otherProps}) {
  if (!svg) return <svg />;
  const Component = component;
  let size = { width, height };
  if (!width && !height) {
    // If no size was defined, calculate default size from viewBox
    size = getSize(svg);
  }

  // Clean the SVG, to remove some attributes
  const cleanedSVG = CLEAN.reduce((prev, regex) => prev.replace(regex, ''), svg);
  const __html = cleanedSVG.replace(/<svg/,
    `<svg class="${styles.svg} ${svgClassName || ''}"`
  );

  return (
    <Component
      className={classnames(styles.sprite, className)}
      style={{...size, ...style}}
      {...otherProps}
      dangerouslySetInnerHTML={{__html}}
    />
  );
}

SvgIcon.propTypes = {
  className: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  svg: PropTypes.string.isRequired,
  svgClassName: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default SvgIcon;