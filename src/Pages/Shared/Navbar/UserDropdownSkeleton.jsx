const UserDropdownSkeleton = () => {
    return (
        <div className="hidden lg:flex items-center relative z-50">
            <div className="relative pl-1 py-1 pr-9 bg-white/10 backdrop-blur-3xl border border-black/5 shadow-inner rounded-full flex items-center group">
                {/* Atmospheric glowing backdrop pulse */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full blur-md opacity-40 animate-pulse"></div>
                
                {/* Avatar placeholder */}
                <div className="w-[55px] h-[55px] rounded-full bg-black/10 animate-pulse relative z-10 shadow-sm"></div>
                
                {/* Arrow identifier placeholder */}
                <div className="absolute right-4 w-3.5 h-3.5 rounded-full bg-black/5 animate-pulse"></div>
            </div>
        </div>
    );
};

export default UserDropdownSkeleton;
