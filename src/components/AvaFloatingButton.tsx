import { useEffect } from 'react';

const AvaFloatingButton = () => {
  useEffect(() => {
    const avatar = document.getElementById('avatar-float');
    const panel = document.getElementById('chat-panel');
    const bubble = document.getElementById('ava-speech-bubble');

    const handleClick = () => {
      if (!panel || !bubble) return;
      const isOpen = panel.style.display === 'flex';
      panel.style.display = isOpen ? 'none' : 'flex';
      bubble.style.display = isOpen ? 'block' : 'none';
    };

    avatar?.addEventListener('click', handleClick);

    // Speech bubble cycle: show 5s, hide 15s (total 20s loop), starts after 2s
    let timeouts: number[] = [];
    const showBubble = () => {
      if (!bubble) return;
      if (panel?.style.display === 'flex') return;
      bubble.style.opacity = '1';
      timeouts.push(window.setTimeout(() => {
        bubble.style.opacity = '0';
      }, 5000));
    };

    const initial = window.setTimeout(showBubble, 2000);
    const interval = window.setInterval(showBubble, 20000);

    return () => {
      avatar?.removeEventListener('click', handleClick);
      clearTimeout(initial);
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes ava-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes ava-pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        #avatar-float {
          animation: ava-float 3s ease-in-out infinite;
        }
        #avatar-float::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: ava-pulse-ring 2s ease-out infinite;
          pointer-events: none;
        }
        #ava-speech-bubble {
          transition: opacity 0.4s ease;
        }
        #ava-speech-bubble::after {
          content: '';
          position: absolute;
          bottom: -6px;
          right: 24px;
          width: 12px;
          height: 12px;
          background: #ffffff;
          transform: rotate(45deg);
          box-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
        @media (max-width: 480px) {
          #chat-panel {
            width: calc(100vw - 20px) !important;
            right: 10px !important;
            height: 70vh !important;
          }
        }
      `}</style>

      <div
        id="chat-widget"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <div
          id="ava-speech-bubble"
          style={{
            position: 'absolute',
            bottom: '105px',
            right: '0',
            background: '#ffffff',
            color: '#0c1222',
            padding: '10px 14px',
            borderRadius: '14px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            whiteSpace: 'nowrap',
            opacity: 0,
            direction: 'rtl',
            fontFamily: 'Heebo, sans-serif',
          }}
        >
          היי! אני אווה 💬
        </div>

        <div
          id="avatar-float"
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <img
            src="https://img.freepik.com/free-photo/3d-illustration-cute-cartoon-girl-with-glasses_1142-40898.jpg"
            alt="Ava AI Assistant"
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #ffffff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              display: 'block',
            }}
          />
        </div>

        <div
          id="chat-panel"
          style={{
            display: 'none',
            position: 'fixed',
            bottom: '120px',
            right: '20px',
            width: '400px',
            height: '620px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            zIndex: 9999,
            background: '#ffffff',
          }}
        >
          <iframe
            src="https://dsbeauty01-web.github.io/assitant_love/"
            title="Ava AI Assistant"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allow="camera; microphone; autoplay"
          />
        </div>
      </div>
    </>
  );
};

export default AvaFloatingButton;
