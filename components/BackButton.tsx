import { useRouter } from 'next/dist/client/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
function BackButton() {
    const router = useRouter();

    return (
        <span className='cursor-pointer' onClick={() => router.back()}>
            <AiOutlineArrowLeft className='mr-1' />
            Back
        </span>
    )
}

export default BackButton;