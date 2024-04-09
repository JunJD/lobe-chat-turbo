const Logo = ({ className }: { className?: string }) => {
    return (
        <svg className={className} height="36" width="100" xmlns="http://www.w3.org/2000/svg">
            <text fill="currentColor" font-family="Arial" font-size="36" fontWeight="700" x="20" y="30">Eva</text>
        </svg>
    )
}

export default Logo