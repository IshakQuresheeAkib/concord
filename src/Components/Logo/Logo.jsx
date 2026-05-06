import { useNavigate } from "react-router-dom";
import concord from "../../assets/logo.webp";

const Logo = ({ 
    imageWidthClass = "w-[180px] xs:w-[220px] sm:w-[240px]" 
}) => {
    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate('/')}
            aria-label="Go to Homepage"
            className="flex items-center group mb-3"
        >
            <img 
                loading="lazy" 
                src={concord}
                alt="Concord Logo" 
                className={`${imageWidthClass} h-auto object-contain cursor-pointer`} 
            />
        </button>
    );
};

export default Logo;