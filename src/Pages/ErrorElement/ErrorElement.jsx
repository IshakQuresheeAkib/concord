import { useNavigate } from 'react-router-dom';
import './styles.css'
import PrimaryBtn from '../../Components/Button/PrimaryBtn';
import { HomeFilled } from '@ant-design/icons';
import Heading from '../../Components/Heading/Heading';

const ErrorElement = () => {

    const navigate = useNavigate();

    return (
        <div className='min-h-screen flex items-center mt-6'>
            <main>
               <div className="main-wrapper">
                    <figure className="scarecrow-img">
                        <img src="https://raw.githubusercontent.com/nat-oku/devchallenges/main/Scarecrow.png" alt="scarecrow"/>
                    </figure>
                    <div className="error-text flex flex-col items-center text-center">
                        <Heading>404 ERROR!</Heading>
                        <p>The page you are looking for might be removed or is temporarily unavailable.</p>
                        <span className="input-group-btn mt-7 mb-10" onClick={()=>navigate('/')}>
                            <PrimaryBtn data='Back to Homepage' icon={<HomeFilled />}></PrimaryBtn>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ErrorElement;