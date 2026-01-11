import { Button } from '../../shared/ui/Button';
import type { StorageProvider } from './providers/types';

interface Props {
    providers: StorageProvider[];
    selectedProviderId: StorageProvider['id'] | null;
    onSelect: (id: StorageProvider['id']) => void;
}

export const ProviderSelectScreen = ({
    providers,
    selectedProviderId,
    onSelect
}: Props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '150px' }}>
            <div className="db-grid two-columns">
                {providers.map(p => {
                    const Icon = p.icon;
                    return (
                        <div
                            key={p.id}
                            className={`db-provider-card ${selectedProviderId === p.id ? 'active' : ''
                                }`}
                            onClick={() => onSelect(p.id)}
                        >
                            {Icon && <Icon size={20} />}
                            <span>{p.label}</span>
                        </div>
                    );
                })}
            </div>
            <div className="db-actions" style={{ gridColumn: '1 / -1' }}>
                <Button variant="secondary" onClick={() => { }}>
                    Cancel
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => { }}
                    disabled={true}
                >
                    'Save'
                </Button>
            </div>
        </div>
    );
};
