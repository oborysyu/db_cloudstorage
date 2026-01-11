import { useEffect, useRef, useState } from 'react';

interface Props<T> {
    value: T | null;
    items: T[];
    renderValue: (item: T) => React.ReactNode;
    renderItem: (item: T) => React.ReactNode;
    onChange: (item: T) => void;
    children?: React.ReactNode;
}

export const BaseDropdown = <T,>({
    value,
    items,
    renderValue,
    renderItem,
    onChange,
    children
}: Props<T>) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, []);

    return (
        <div ref={ref} className="dropdown">
            <button
                type="button"
                className={`dropdown-trigger ${open ? 'open' : ''}`}
                onClick={() => setOpen(o => !o)}
            >
                <div className="dropdown-value">
                    {value ? renderValue(value) : <span className="dropdown-placeholder">Select…</span>}
                </div>

                {children && <div className="dropdown-chevron">{children}</div>}
            </button>

            {open && (
                <div className="dropdown-panel">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="dropdown-option"
                            onClick={() => {
                                onChange(item);
                                setOpen(false);
                            }}
                        >
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
