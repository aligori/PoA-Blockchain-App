
const Badge = ({ text, bgColor = 'bg-emerald-500' } : { text: string; bgColor?: string }) => {
    return <div className={`w-full rounded-md px-2.5 py-1.5 text-semibold text-center ${bgColor} text-white`}>
        { text }
    </div>
}

export default Badge