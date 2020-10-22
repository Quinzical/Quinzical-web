import React from 'react';
import classNames from 'classnames';
import useAudio from '../Utils/useAudio';
import select from '../Resources/sounds/select.mp3';
import click from '../Resources/sounds/click.mp3';

const Input = ({
    label,
    value,
    className,
    style,
    ...rest
}) => {
    const [, toggleHover] = useAudio(select);
    const [, toggleClick] = useAudio(click);

    return (
        <input
            className={classNames('input', className)}
            style={style}
            aria-label={label}
            value={value}
            onMouseEnter={toggleHover}
            onMouseDown={toggleClick}
            {...rest}
        />
    );
};

export default Input;
