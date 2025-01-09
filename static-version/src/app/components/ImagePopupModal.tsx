import Image from 'next/image';

interface ImagePopupModalProps {
    closeModal: () => void;
    selectedImage: string;
    isClosing: boolean;
}

const ImagePopupModal = ({closeModal, selectedImage, isClosing}: ImagePopupModalProps) => {
    return (
        <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className={`transition-transform transform ${isClosing
                                ? "scale-100 opacity-100 animate-[popup-out_0.3s_ease-in_forwards]"
                                : "scale-0 opacity-0 animate-[popup-in_0.3s_ease-out_forwards]"
                            }`}
                    >
                        <Image
                            src={selectedImage}
                            alt="Selected Certification"
                            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
                        />
                    </div>
                </div>
    );
}

export default ImagePopupModal;
