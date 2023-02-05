import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/dist/client/router';

function BackButton() {
    const router = useRouter();

    return (
        <span className='cursor-pointer' onClick={() => router.back()}>
            <ArrowBackIcon className='mr-1'/>
            Back
        </span>
    )
}

export default BackButton;