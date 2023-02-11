import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
function BackButton() {
    const navigate = useNavigate();

    return (
        <span className='cursor-pointer' onClick={() => navigate(-1)}>
            <AiOutlineArrowLeft className='mr-1' />
            Back
        </span>
    )
}

export default BackButton;