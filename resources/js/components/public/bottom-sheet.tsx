import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type BottomSheetProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
};

export default function BottomSheet({ open, onClose, title, children, footer }: BottomSheetProps) {
    const sheetRef = useRef<HTMLDivElement>(null);
    const previousFocus = useRef<Element | null>(null);

    useEffect(() => {
        if (open) {
            previousFocus.current = document.activeElement;
            document.body.style.overflow = 'hidden';
            const handleEsc = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            document.addEventListener('keydown', handleEsc);
            setTimeout(() => {
                const focusable = sheetRef.current?.querySelector<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
                focusable?.focus();
            }, 100);
            return () => {
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEsc);
                if (previousFocus.current instanceof HTMLElement) previousFocus.current.focus();
            };
        }
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        ref={sheetRef}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="relative w-full max-w-lg rounded-t-2xl bg-background border-t border-border shadow-2xl max-h-[90svh] flex flex-col"
                    >
                        <div className="flex items-center justify-center pt-3 pb-1">
                            <div className="h-1.5 w-12 rounded-full bg-muted-foreground/30" />
                        </div>
                        {title && (
                            <div className="px-4 py-3 border-b border-border">
                                <h3 className="font-display text-lg font-medium text-foreground">{title}</h3>
                            </div>
                        )}
                        <div className="overflow-y-auto px-4 py-4 space-y-4 flex-1">{children}</div>
                        {footer && (
                            <div className="border-t border-border px-4 py-3 bg-muted/50">{footer}</div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
