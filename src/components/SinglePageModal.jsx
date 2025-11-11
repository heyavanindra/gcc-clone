"use client";
import { motion } from 'framer-motion';

function SinglePageModal({ isOpen, onClose, content }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

            {/* Drawer */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.3 }}
                className="fixed right-0 top-0 h-full w-8/12 md:w-4/12 bg-white shadow-xl z-50 p-6 overflow-y-scroll scrollbar-hide"
            >
                <button className="absolute top-2 right-2 text-gray-600" onClick={onClose}>✕</button>
                <h2 className="text-2xl font-bold mb-4">{content.title}</h2>

                {/* Render specific content for 'Description' */}
                {content.title === 'Description' && content.body && (
                    <div className='flex flex-col justify-center gap-4'>
                        <p className='text-lg'>{content.body.info}</p>
                        <div>
                          <p className='font-semibold text-xl'>Features:</p>
                          <p className='text-lg'>{content.body.features}</p>
                        </div>
                        
                        <div>
                        <p className='font-semibold text-xl'>Sizing:</p>
                        <p className='text-lg'>{content.body.sizing}</p>
                        </div>
                    </div>
                )}

                {/* Render the general content */}
                {content.title !== 'Description' && <p className='text-lg'>{content.body}</p>}
            </motion.div>
        </div>
    );
}

export default SinglePageModal;
