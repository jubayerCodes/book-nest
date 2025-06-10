import React from 'react';

const Separator = ({ text, gap = 10 }) => {
    return (
        <div className={`border-t border-[var(--border-color)] block`} style={{ margin: `${gap}px 0` }}>
            <span className='-mt-[15px] block bg-white w-fit justify-self-center px-2'>{text}</span>
        </div>
    );
};

export default Separator;