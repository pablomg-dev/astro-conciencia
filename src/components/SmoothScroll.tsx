import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const targetPosition = targetElement.offsetTop - 20; // Solo 20px de margen
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    // Manejar enlaces que van a la página principal con anclajes
    const handleHomeAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="/#"]') as HTMLAnchorElement;
      
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        
        if (href && href.startsWith('/#')) {
          const targetId = href.substring(2);
          
          // Si estamos en la página principal, hacer scroll suave
          if (window.location.pathname === '/') {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              const targetPosition = targetElement.offsetTop - 20; // Solo 20px de margen
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          } else {
            // Si estamos en otra página, navegar a la página principal con el anclaje
            window.location.href = href;
          }
        }
      }
    };

    // Agregar los event listeners al documento
    document.addEventListener('click', handleAnchorClick);
    document.addEventListener('click', handleHomeAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('click', handleHomeAnchorClick);
    };
  }, []);

  return null; // Este componente no renderiza nada
} 