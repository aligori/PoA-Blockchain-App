const Button = ({
                           label,
                           disabled,
                           onClick,
                           bgColor,
                           bgColorHover,
                           textColor,
                           size = 'md',
                           width = 'flex w-full',
                           border = 'border-transparent',
                           isLoading = false,
                           ...props
                       }: {}) => {
    let sizingClasses = 'py-4 px-6 text-sm';

    if (size === 'xs') {
        sizingClasses = 'py-1 px-2 text-xs';
    } else if (size === 'sm') {
        sizingClasses = 'py-2 px-3 text-xs';
    } else if (size === 'md') {
        sizingClasses = 'py-2.5 px-4 text-sm';
    } else if (size === 'lg') {
        sizingClasses = 'py-4 px-6 text-sm';
    }

    const className = `flex items-center group relative ${width} justify-center border ${border} font-medium rounded-md ${
        textColor || 'text-white'
    } ${sizingClasses} 
  ${disabled ? 'bg-gray-400' : bgColor || 'bg-gray-800'}  ${
        disabled ? '' : bgColorHover || 'hover:bg-gray-700'
    } focus:outline-none transition duration-300`;

    return (
        <button onClick={onClick} className={className} disabled={disabled} {...props}>
            {isLoading && (
                <div
                    style={{ borderTopColor: 'transparent' }}
                    className="w-4 h-4 border-2 border-white border rounded-full animate-spin mr-1"
                />
            )}
            {label}
        </button>
    );
};

export default Button;
