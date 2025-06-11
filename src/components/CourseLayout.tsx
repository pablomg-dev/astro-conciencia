import { useState } from 'react';
import PasswordModal from './PasswordModal';
import VideoModal from './VideoModal';

interface CourseLayoutProps {
    title: string;
    password: string;
    videoId: string;
}

export default function CourseLayout({ title, password, videoId }: CourseLayoutProps) {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const handlePasswordSuccess = () => {
        setIsPasswordModalOpen(false);
        setIsVideoModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center text-[#ec6f60] mb-6">{title}</h1>
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-center">
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="bg-[#f0123f] text-white px-8 py-3 rounded-lg hover:bg-[#ec6f60] transition-colors cursor-pointer"
                    >
                        Acceder al Curso
                    </button>
                </div>
            </div>

            <PasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSuccess={handlePasswordSuccess}
                coursePassword={password}
            />

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoId={videoId}
            />
        </div>
    );
} 