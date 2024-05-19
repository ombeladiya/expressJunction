import React, { useEffect, useRef, useState } from 'react'
import QRCodeStyling from "qr-code-styling";

function QR({ initialValue }) {
    const [qrData, setQRData] = useState(initialValue);
    const qrCodeRef = useRef(null);
    const generateQRCode = () => {
        if (qrData) {
            const qrCode = new QRCodeStyling({
                width: 180,
                height: 180,
                data: qrData,
                dotsOptions: {
                    color: '#000', // Dot color
                    type: 'square' // Dot type (rounded, square, or circle)
                },
                cornersSquareOptions: {
                    type: 'square'
                },
                cornersDotOptions: {
                    type: 'square'
                },
                qrOptions: {
                    typeNumber: 4,
                }
            });

            qrCode.append(document.getElementById('qr-code'));
        }
    };
    useEffect(() => {
        setQRData(initialValue || '');
    }, [initialValue]);

    useEffect(() => {
        generateQRCode();
    }, [qrData]);
    return (
        <div>
            <div className="flex flex-col items-center mt-10">
                <div id="qr-code" ref={qrCodeRef} className="m-2"></div>
            </div>
        </div>
    )
}

export default QR
