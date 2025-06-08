interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoId: string;
}

export default function VideoModal({ isOpen, onClose, videoId }: VideoModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 w-full max-w-4xl relative">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl"
                    aria-label="Cerrar"
                >
                    ×
                </button>
                <div className="relative pt-[56.25%]">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                        title="Video del curso"
                        className="absolute inset-0 w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
} 