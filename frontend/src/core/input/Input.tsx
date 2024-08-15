import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    link?: string;
    to?: string;
    width?: string;
    border?: string;
    error?: string | string[];
    value?: string | number;
    className?: string;
    height?: string;
    extraClasses?: string;
}

const Input = ({
                   id,
                   label = '',
                   placeholder,
                   error,
                   value,
                   className,
                   disabled,
                   ...props
               }: InputProps) => {
    return (
        <div>
            <div
                className={`h-[58px] relative focus-within:text-primary-500 shadow-sm focus-within:ring-primary-500 focus-within:border-primary-500 focus-within:z-10 border ${
                    error ? 'border-red-500' : 'border-[#CFD3D4]'
                } ${disabled ? 'bg-gray-100' : 'bg-transparent'} rounded-lg`}>
                {label && (
                    <div className="absolute font-bold text-xs px-4 text-[#434755] top-1.5">{label}</div>
                )}
                <input
                    id={id}
                    disabled={disabled}
                    value={value || ''}
                    className={`bg-transparent appearance-none focus:outline-none block w-full mt-1 px-4 pt-5 placeholder-gray-400 text-gray-900 text-sm ${className}`}
                    placeholder={placeholder}
                    {...props}
                />
            </div>
            {error && <div className={`text-xs text-red-500 pt-1 ${!error && 'pb-4'}`}>{error}</div>}
        </div>
    );
};

export default Input;
