import { ReactNode } from 'react';

interface SceneContainerProps {
  children: ReactNode;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  backgroundImage?: string;
}

const SceneContainer = ({ children, onNavigateLeft, onNavigateRight, backgroundImage }: SceneContainerProps) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Background */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Navigation areas */}
      <div className="absolute inset-0 flex">
        {onNavigateLeft && (
          <div 
            onClick={onNavigateLeft}
            className="w-1/4 h-full cursor-pointer hover:bg-primary/5 transition-colors flex items-center justify-start pl-8"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </div>
        )}
        <div className="flex-1" />
        {onNavigateRight && (
          <div 
            onClick={onNavigateRight}
            className="w-1/4 h-full cursor-pointer hover:bg-primary/5 transition-colors flex items-center justify-end pr-8"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default SceneContainer;
