import { forwardRef, useCallback } from 'react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  recipientName: string;
  eventTitle: string;
  eventDate: string;
  panchayat: string;
  district: string;
  venue: string;
  category: string;
  signatoryName?: string;
  signatoryTitle?: string;
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ recipientName, eventTitle, eventDate, panchayat, district, venue, signatoryName, signatoryTitle }, ref) => {
    const formattedDate = new Date(eventDate).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return (
      <div
        ref={ref}
        style={{
          width: '1056px',
          height: '748px',
          position: 'relative',
          background: 'linear-gradient(135deg, #fdf8ef 0%, #fefcf6 30%, #fdf5e6 60%, #fef9f0 100%)',
          fontFamily: 'Georgia, "Times New Roman", serif',
          overflow: 'hidden',
        }}
      >
        {/* Outer gold border */}
        <div
          style={{
            position: 'absolute',
            inset: '12px',
            border: '3px solid #c9a84c',
            borderRadius: '4px',
          }}
        />
        {/* Inner gold border */}
        <div
          style={{
            position: 'absolute',
            inset: '20px',
            border: '1.5px solid #d4b65c',
            borderRadius: '2px',
          }}
        />

        {/* Top-left corner decoration */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0 }}
          width="200"
          height="200"
          viewBox="0 0 200 200"
        >
          <defs>
            <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4a52a" />
              <stop offset="30%" stopColor="#f0d77a" />
              <stop offset="60%" stopColor="#c89b2a" />
              <stop offset="100%" stopColor="#a67c00" />
            </linearGradient>
          </defs>
          <path d="M0,0 L180,0 C120,20 60,60 40,100 C20,140 10,160 0,180 Z" fill="url(#gold1)" opacity="0.4" />
          <path d="M0,0 L130,0 C90,15 45,45 30,75 C15,105 8,120 0,140 Z" fill="url(#gold1)" opacity="0.5" />
          <path d="M0,0 L80,0 C55,12 30,35 20,55 C10,75 5,85 0,100 Z" fill="url(#gold1)" opacity="0.7" />
        </svg>

        {/* Top-right corner decoration */}
        <svg
          style={{ position: 'absolute', top: 0, right: 0, transform: 'scaleX(-1)' }}
          width="180"
          height="180"
          viewBox="0 0 180 180"
        >
          <path d="M0,0 L160,0 C110,18 55,55 35,90 C18,125 9,145 0,165 Z" fill="url(#gold1)" opacity="0.25" />
          <path d="M0,0 L100,0 C70,14 38,40 25,65 C12,90 6,100 0,115 Z" fill="url(#gold1)" opacity="0.35" />
        </svg>

        {/* Bottom-right corner decoration */}
        <svg
          style={{ position: 'absolute', bottom: 0, right: 0, transform: 'rotate(180deg)' }}
          width="180"
          height="180"
          viewBox="0 0 180 180"
        >
          <path d="M0,0 L160,0 C110,18 55,55 35,90 C18,125 9,145 0,165 Z" fill="url(#gold1)" opacity="0.25" />
          <path d="M0,0 L100,0 C70,14 38,40 25,65 C12,90 6,100 0,115 Z" fill="url(#gold1)" opacity="0.35" />
        </svg>

        {/* Gold Seal */}
        <svg
          style={{ position: 'absolute', top: '42px', left: '42px' }}
          width="130"
          height="170"
          viewBox="0 0 130 170"
        >
          <defs>
            <linearGradient id="seal1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d77a" />
              <stop offset="25%" stopColor="#c89b2a" />
              <stop offset="50%" stopColor="#f0d77a" />
              <stop offset="75%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#d4a52a" />
            </linearGradient>
            <linearGradient id="ribbon1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c89b2a" />
              <stop offset="50%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#a67c00" />
            </linearGradient>
          </defs>
          {/* Ribbon tails */}
          <polygon points="40,100 25,165 45,140 65,165 50,100" fill="url(#ribbon1)" />
          <polygon points="60,100 50,165 70,140 90,165 80,100" fill="url(#ribbon1)" opacity="0.9" />
          {/* Seal starburst */}
          {Array.from({ length: 20 }, (_, i) => {
            const angle = (i * 18 * Math.PI) / 180;
            const r1 = i % 2 === 0 ? 48 : 40;
            const cx = 65;
            const cy = 58;
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={cx + r1 * Math.cos(angle)}
                y2={cy + r1 * Math.sin(angle)}
                stroke="#d4a52a"
                strokeWidth="3"
                opacity="0.4"
              />
            );
          })}
          {/* Outer seal circle */}
          <circle cx="65" cy="58" r="42" fill="url(#seal1)" stroke="#a67c00" strokeWidth="2" />
          <circle cx="65" cy="58" r="36" fill="none" stroke="#fef3c7" strokeWidth="1" opacity="0.6" />
          <circle cx="65" cy="58" r="32" fill="none" stroke="#a67c00" strokeWidth="0.5" opacity="0.4" />
          {/* Inner circle */}
          <circle cx="65" cy="58" r="26" fill="url(#seal1)" stroke="#fef3c7" strokeWidth="1" />
          {/* Star in center */}
          <polygon
            points="65,38 69,50 82,50 72,58 76,70 65,62 54,70 58,58 48,50 61,50"
            fill="#fef3c7"
            opacity="0.8"
          />
        </svg>

        {/* Main Content */}
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '190px',
            right: '50px',
            bottom: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              letterSpacing: '6px',
              color: '#8B7340',
              textTransform: 'uppercase',
              marginBottom: '8px',
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
          >
            Certificate of Appreciation
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '16px',
              color: '#7a6b4e',
              marginBottom: '24px',
              fontStyle: 'italic',
            }}
          >
            This certificate is proudly presented to
          </div>

          {/* Recipient Name */}
          <div
            style={{
              fontSize: '44px',
              color: '#3d3424',
              fontFamily: '"Brush Script MT", "Segoe Script", "Comic Sans MS", cursive',
              fontWeight: 'normal',
              lineHeight: '1.2',
              marginBottom: '4px',
              maxWidth: '600px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {recipientName}
          </div>

          {/* Decorative line under name */}
          <svg width="400" height="20" viewBox="0 0 400 20" style={{ marginBottom: '16px' }}>
            <line x1="20" y1="10" x2="180" y2="10" stroke="#c9a84c" strokeWidth="1" />
            <line x1="220" y1="10" x2="380" y2="10" stroke="#c9a84c" strokeWidth="1" />
            <polygon points="200,4 206,10 200,16 194,10" fill="#c9a84c" />
          </svg>

          {/* Recognition text */}
          <div
            style={{
              fontSize: '15px',
              color: '#5c5040',
              lineHeight: '1.7',
              maxWidth: '520px',
              marginBottom: '10px',
            }}
          >
            In recognition of your valuable participation and
            <br />
            contribution to <strong style={{ color: '#3d3424' }}>{eventTitle}</strong>
          </div>

          <div
            style={{
              fontSize: '13px',
              color: '#8a7d68',
              lineHeight: '1.6',
              maxWidth: '480px',
              marginBottom: '30px',
            }}
          >
            organized by {panchayat} Panchayat, {district} District
            <br />
            held at {venue} on {formattedDate}
          </div>

          {/* Signatures area */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '500px',
              marginTop: '10px',
            }}
          >
            {/* Left signature */}
            <div style={{ textAlign: 'center' }}>
              <svg width="120" height="35" viewBox="0 0 120 35">
                <path
                  d="M10,25 C20,10 30,20 40,15 S60,22 70,12 S90,20 105,18"
                  fill="none"
                  stroke="#3d3424"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
              </svg>
              <div style={{ borderTop: '1px solid #c9a84c', paddingTop: '6px', width: '150px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#5c5040', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  {signatoryName || 'Panchayat President'}
                </div>
                <div style={{ fontSize: '10px', color: '#8a7d68', marginTop: '2px' }}>
                  {signatoryTitle || `${panchayat} Panchayat`}
                </div>
              </div>
            </div>
            {/* Right signature */}
            <div style={{ textAlign: 'center' }}>
              <svg width="120" height="35" viewBox="0 0 120 35">
                <path
                  d="M15,20 C25,28 35,10 50,18 S70,8 80,22 S100,12 110,20"
                  fill="none"
                  stroke="#3d3424"
                  strokeWidth="1.5"
                  opacity="0.7"
                />
              </svg>
              <div style={{ borderTop: '1px solid #c9a84c', paddingTop: '6px', width: '150px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#5c5040', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Secretary
                </div>
                <div style={{ fontSize: '10px', color: '#8a7d68', marginTop: '2px' }}>
                  {panchayat} Panchayat
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thin gold line at bottom */}
        <svg
          style={{ position: 'absolute', bottom: '28px', left: '30px', right: '30px', width: 'calc(100% - 60px)' }}
          height="3"
        >
          <line x1="0" y1="1.5" x2="100%" y2="1.5" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';

// Hook for downloading certificates
export function useDownloadCertificate() {
  const download = useCallback(async (element: HTMLElement, filename: string) => {
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fdf8ef',
        logging: false,
        width: 1056,
        height: 748,
      });
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      return true;
    } catch (err) {
      console.error('Certificate download failed:', err);
      return false;
    }
  }, []);

  return { download };
}

export default CertificateTemplate;
