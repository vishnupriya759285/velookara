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
          background: '#fdf8ef',
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

        {/* Top-left corner decoration - CSS divs instead of cross-referenced SVG gradients */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '200px', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            width: '180px',
            height: '180px',
            background: 'linear-gradient(135deg, #d4a52a 0%, #f0d77a 30%, #c89b2a 60%, #a67c00 100%)',
            opacity: 0.35,
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            borderRadius: '0 0 80% 0',
          }} />
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '-30px',
            width: '130px',
            height: '130px',
            background: 'linear-gradient(135deg, #d4a52a 0%, #f0d77a 40%, #c89b2a 100%)',
            opacity: 0.5,
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            borderRadius: '0 0 70% 0',
          }} />
          <div style={{
            position: 'absolute',
            top: '-35px',
            left: '-35px',
            width: '90px',
            height: '90px',
            background: 'linear-gradient(135deg, #f0d77a 0%, #c89b2a 50%, #a67c00 100%)',
            opacity: 0.7,
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            borderRadius: '0 0 60% 0',
          }} />
        </div>

        {/* Top-right corner decoration */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '160px',
            height: '160px',
            background: 'linear-gradient(225deg, #d4a52a 0%, #f0d77a 30%, #c89b2a 60%, #a67c00 100%)',
            opacity: 0.25,
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            borderRadius: '0 0 0 80%',
          }} />
          <div style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(225deg, #d4a52a 0%, #f0d77a 50%, #c89b2a 100%)',
            opacity: 0.35,
            transform: 'rotate(45deg)',
            transformOrigin: 'center',
            borderRadius: '0 0 0 70%',
          }} />
        </div>

        {/* Bottom-right corner decoration */}
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '180px', height: '180px', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            right: '-20px',
            width: '160px',
            height: '160px',
            background: 'linear-gradient(315deg, #d4a52a 0%, #f0d77a 30%, #c89b2a 60%, #a67c00 100%)',
            opacity: 0.25,
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            borderRadius: '80% 0 0 0',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-30px',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(315deg, #d4a52a 0%, #f0d77a 50%, #c89b2a 100%)',
            opacity: 0.35,
            transform: 'rotate(-45deg)',
            transformOrigin: 'center',
            borderRadius: '70% 0 0 0',
          }} />
        </div>

        {/* Gold Seal - self-contained SVG with unique gradient IDs */}
        <svg
          style={{ position: 'absolute', top: '42px', left: '42px' }}
          width="130"
          height="170"
          viewBox="0 0 130 170"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="certSealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d77a" />
              <stop offset="25%" stopColor="#c89b2a" />
              <stop offset="50%" stopColor="#f0d77a" />
              <stop offset="75%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#d4a52a" />
            </linearGradient>
            <linearGradient id="certRibbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c89b2a" />
              <stop offset="50%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#a67c00" />
            </linearGradient>
          </defs>
          {/* Ribbon tails */}
          <polygon points="40,100 25,165 45,140 65,165 50,100" fill="url(#certRibbonGrad)" />
          <polygon points="60,100 50,165 70,140 90,165 80,100" fill="url(#certRibbonGrad)" opacity="0.9" />
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
          <circle cx="65" cy="58" r="42" fill="url(#certSealGrad)" stroke="#a67c00" strokeWidth="2" />
          <circle cx="65" cy="58" r="36" fill="none" stroke="#fef3c7" strokeWidth="1" opacity="0.6" />
          <circle cx="65" cy="58" r="32" fill="none" stroke="#a67c00" strokeWidth="0.5" opacity="0.4" />
          {/* Inner circle */}
          <circle cx="65" cy="58" r="26" fill="url(#certSealGrad)" stroke="#fef3c7" strokeWidth="1" />
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
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 'bold',
              fontStyle: 'italic',
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

          {/* Decorative line under name - CSS divs instead of SVG */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', width: '400px' }}>
            <div style={{ flex: 1, height: '1px', background: '#c9a84c' }} />
            <div style={{ width: '12px', height: '12px', background: '#c9a84c', transform: 'rotate(45deg)' }} />
            <div style={{ flex: 1, height: '1px', background: '#c9a84c' }} />
          </div>

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
              <div style={{ width: '120px', height: '30px', margin: '0 auto' }}>
                <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10,20 C20,8 30,18 40,12 S60,20 70,10 S90,18 105,15"
                    fill="none"
                    stroke="#3d3424"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                </svg>
              </div>
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
              <div style={{ width: '120px', height: '30px', margin: '0 auto' }}>
                <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15,18 C25,25 35,8 50,15 S70,6 80,20 S100,10 110,18"
                    fill="none"
                    stroke="#3d3424"
                    strokeWidth="1.5"
                    opacity="0.7"
                  />
                </svg>
              </div>
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
        <div style={{
          position: 'absolute',
          bottom: '28px',
          left: '30px',
          right: '30px',
          height: '1px',
          background: '#c9a84c',
          opacity: 0.5,
        }} />
      </div>
    );
  }
);

CertificateTemplate.displayName = 'CertificateTemplate';

// Hook for downloading certificates
export function useDownloadCertificate() {
  const download = useCallback(async (element: HTMLElement, filename: string) => {
    try {
      // Clone the element to a visible position for html2canvas
      // (offscreen elements at left:-9999px can cause rendering issues)
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.position = 'fixed';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.zIndex = '-9999';
      clone.style.opacity = '1';
      clone.style.pointerEvents = 'none';
      document.body.appendChild(clone);

      // Give the browser a frame to lay out the clone
      await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#fdf8ef',
        logging: false,
        width: 1056,
        height: 748,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        windowHeight: 800,
      });

      // Clean up clone
      document.body.removeChild(clone);

      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (err) {
      console.error('Certificate download failed:', err);
      return false;
    }
  }, []);

  return { download };
}

export default CertificateTemplate;
