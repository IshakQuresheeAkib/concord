import './styles.css'

const ErrorElement = () => {
    return (
        <div className='min-h-screen flex items-center mt-6'>
            <main>
               <div className="main-wrapper">
                    <figure className="scarecrow-img">
                        <img src="https://raw.githubusercontent.com/nat-oku/devchallenges/main/Scarecrow.png" alt="scarecrow"/>
                    </figure>
                    <div className="error-text">
                        <h2>404 ERROR!</h2>
                        <p>The page you are looking for might be removed or is temporarily unavailable.</p>
                        <span className="input-group-btn">
                        <button className="error-btn" type="button">Back to homepage</button>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ErrorElement;