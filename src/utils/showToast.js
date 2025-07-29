import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function CustomToast({ message, title, type = 'success', duration, id }) {
  const [progress, setProgress] = useState(100);

  const isSuccess = type === 'success';
  const colors = {
    success: {
      bg: '#ecfdf5',
      border: '#a7f3d0',
      text: '#065f46',
      icon: <FontAwesomeIcon icon={faCircleCheck} color="#10b981" />,
    },
    error: {
      bg: '#fef2f2',
      border: '#fecaca',
      text: '#991b1b',
      icon: <FontAwesomeIcon icon={faCircleXmark} color="#ef4444" />,
    },
  };

  useEffect(() => {
    const interval = 30;
    const decrement = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration]);

  const style = colors[type];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      background: style.bg,
      border: `1px solid ${style.border}`,
      color: style.text,
      borderRadius: '10px',
      minWidth: '300px',
      fontSize: '14px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 16px' }}>
        <div style={{ marginRight: '10px', marginTop: '2px' }}>
          {style.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{title}</div>
          <div>{message}</div>
        </div>
        
      </div>

      
      <div style={{
        height: '4px',
        background: '#e5e7eb',
        width: '100%',
      }}>
        <div
          style={{
            height: '100%',
            background: isSuccess ? '#10b981' : '#ef4444',
            width: `${progress}%`,
            transition: 'width 0.03s linear',
          }}
        />
      </div>
    </div>
  );
}



export default function showToast(type = 'success', title, message) {
    const duration = 3000;
  
    toast.custom((t) => (
      <CustomToast
        type={type}
        title={title}
        message={message}
        duration={duration}
        id={t.id}
      />
    ), { duration });
  }
