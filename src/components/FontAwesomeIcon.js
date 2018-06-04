import React from 'react';

/**
 * FontAwesome Component (Temporary!)
 *
 * The `react-mde` package we're using doesn't yet
 * use the new official FontAwesomeIcon component
 * provided by FortAwesome, which only includes the
 * icons you need.
 *
 * So because `react-mde` requires the site to include
 * the entire FontAwesome icon set to work properly,
 * we're doing that for now. Hopefully down the road
 * we can remove this component from the project and
 * rely on the official component with the same name.
 *
 * @param {Object}     props      Component props.
 * @param {String}     props.icon FontAwesome icon name.
 * @return {Component}
 */
const FontAwesomeIcon = props => {
    const style = props.style ? props.style : 'fas';
    return <i className={`${style} fa-${props.icon}`} />;
};

export default FontAwesomeIcon;
