import {useState} from 'react'
import { useSelector } from 'react-redux'
import ShareLinkModal from './ShareLinkModal';

const ShareLinkButton = () => {
    const { currentUser } = useSelector((state) => state.user)
  const [shareLink, setShareLink] = useState(null);

    return (
        <>
            <button
                onClick={() => setShareLink(currentUser)}
                className='flex items-center px-4 py-2 bg-green text-white rounded-xl transition-all duration-200 font-semibold'>Share Link</button>


            {shareLink && (
                <ShareLinkModal
                    isOpen={!!shareLink}
                    onClose={() => setShareLink(null)}
                    userLink={shareLink}
                />
            )}
        </>
    )
}

export default ShareLinkButton