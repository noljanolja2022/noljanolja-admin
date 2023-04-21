import { useNavigate } from 'react-router-dom';
function BackButton() {
    const navigate = useNavigate();

    return (
        <span onClick={() => navigate(-1)}>
            {/* <AiOutlineArrowLeft /> */}
            Back
        </span>
    )
}

export default BackButton;