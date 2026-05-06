import { useNavigate } from "react-router-dom";
import concord from "../../assets/Concord.webp";

const Logo = ({ 
    imageWidthClass = "w-[110px] min-[340px]:w-[124px] min-[744px]:w-[145px] lg:w-[176px] xl:w-[200px] min-[1920px]:w-[240px] min-[2560px]:w-[280px]" 
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