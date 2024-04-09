const Logo = ({ className }: { className?: string }) => {
    return (
        <svg className={className} width="100" height="36" xmlns="http://www.w3.org/2000/svg">
            <text x="20" y="30" font-family="Arial" fontWeight="700" font-size="36" fill="currentColor">Eva</text>
        </svg>
    )
}

export default Logo