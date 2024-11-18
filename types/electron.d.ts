// electron.d.ts
declare global {
    interface ElectronAPI {
        salvarRelatorio: (relatorio: any[]) => void;
    }

    interface Window {
        electronAPI: ElectronAPI;
    }
}

// Isso é necessário para tornar a definição global disponível.
export {};
