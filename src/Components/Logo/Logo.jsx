import { useNavigate } from "react-router-dom";
import concord from "../../assets/concord.png";

const Logo = ({ 
    imageWidthClass = "w-[110px] min-[340px]:w-[124px] min-[744px]:w-[145px] lg:w-[176px] xl:w-[200px] min-[1920px]:w-[240px] min-[2560px]:w-[280px]" 
}) => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate('/')}
            aria-label="Go to Homepage"
            className="flex items-center hover:scale-105 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 rounded-lg group"
        >
            <img 
                loading="lazy" 
                src={concord} 
                alt="Concord Logo" 
                className={`${imageWidthClass} h-auto object-contain cursor-pointer drop-shadow-sm transition-all duration-300`} 
            />
        </button>
    );
};

export default Logo;