import React from 'react';
import classNames from 'classnames';

type Props = {
    type: 'arrow' | 'number';
    direction?: 'left' | 'right'; // for arrow
    pageNumber?: number; // for number
    isActive?: boolean;
    onClick?: () => void;
    // disabled:boolean
};

const CustomPaginationItem: React.FC<Props> = ({
    type,
    direction,
    pageNumber,
    isActive = false,
    onClick,
    // disabled
}) => {
    if (type === 'arrow') {
        const iconSrc =
            direction === 'left'
                ? './images/svgs/leftarrowpagination.svg'
                : './images/svgs/rightarrowpagination.svg';
        return (
            <button
                onClick={onClick}
                // disabled={disabled}
                className="bg-[#A86B63] w-8 h-8 rounded-lg flex items-center justify-center"
            >
                <img src={iconSrc} alt={`${direction} arrow`} width={10} height={10} />
            </button>
        );
    }

    // type === 'number'
    return (
        <button
            onClick={onClick}
            className={classNames(
                'w-8 h-8 rounded-lg flex items-center justify-center border',
                {
                    'bg-[#FFF6EB] border-transparent text-[#9A8D7E]': !isActive,
                    'border-2 border-[#EB6622] text-[#EB6622]': isActive,
                }
            )}
        >
            <span className="text-sm font-semibold">{pageNumber}</span>
        </button>
    );
};

export default CustomPaginationItem;
