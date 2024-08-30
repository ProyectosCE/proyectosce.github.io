import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin,ToolbarProps} from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Configura el worker de pdf.js
const workerUrl = `https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`;

const PDFViewer = ({ fileUrl }) => {

    const renderToolbar = (Toolbar) => (
        <Toolbar>
            {(slots) => {
                const {
                    CurrentPageInput,
                    Download,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                } = slots;
                return (
                    <div
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <div style={{ padding: '0px 2px' }}>
                            <ZoomOut />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <Zoom />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <ZoomIn />
                        </div>
                        <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                            <GoToPreviousPage />
                        </div>
                        <div style={{ padding: '0px 2px', display: 'flex', alignItems: 'center' }}>
                        <CurrentPageInput
                            style={{
                                width: '40px', // Ancho fijo para mayor claridad
                                textAlign: 'center', // Centrado del texto
                                border: '1px solid #ccc', // Borde para mejor visualización
                                borderRadius: '4px', // Bordes redondeados
                                padding: '4px 8px' // Espaciado interno
                            }}
                        /> 
                        / <NumberOfPages />
                    </div>
                        <div style={{ padding: '0px 2px' }}>
                            <GoToNextPage />
                        </div>
                        <div style={{ padding: '0px 2px' }}>
                            <Download />
                        </div>
                    </div>
                );
            }}
        </Toolbar>
    );
    
    // Configura el plugin de diseño por defecto
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [], renderToolbar,
    });


    return (
        <div style={{ width: '100%', height: '100vh', border: 'none', overflow: 'hidden' }}>
            {/* Configura el Worker de PDF.js */}
            <Worker workerUrl={workerUrl}>
                {/* Muestra el visor con el plugin de tema oscuro y diseño personalizado */}
                <Viewer
                    fileUrl={fileUrl}
                    plugins={[defaultLayoutPluginInstance]} // Incluye el plugin de tema
                />
            </Worker>
        </div>
    );
};

export default PDFViewer;

