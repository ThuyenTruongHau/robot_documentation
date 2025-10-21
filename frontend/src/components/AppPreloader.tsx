import React, { useEffect, useState } from 'react';
import mediaPreloader from '../services/mediaPreloader';

/**
 * List of media files to preload on app initialization
 */
const PRELOAD_MEDIA = [
  // Videos
  { url: '/video_agv.mp4', type: 'video' as const },
  
  // 3D Models
  { url: '/products_image/simulation_laser_cutting_robot_systems.glb', type: 'model' as const },
  { url: '/products_image/pcb_led_machine_part_1.glb', type: 'model' as const },
  { url: '/products_image/logistic_robot_test__2.glb', type: 'model' as const },
  { url: '/products_image/industrial_-_3d_agv__trolley_-_omrom.glb', type: 'model' as const },
  { url: '/products_image/assembly_solar.glb', type: 'model' as const },
];

interface AppPreloaderProps {
  children: React.ReactNode;
  showProgress?: boolean;
}

/**
 * Component that preloads media files in the background
 * Can optionally show a loading progress indicator
 */
const AppPreloader: React.FC<AppPreloaderProps> = ({ children, showProgress = false }) => {
  const [progress, setProgress] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);
  const [showContent, setShowContent] = useState(!showProgress);

  useEffect(() => {
    const preloadMedia = async () => {
      try {
        console.log('[AppPreloader] Starting preload of', PRELOAD_MEDIA.length, 'files');
        const startTime = performance.now();
        
        let loaded = 0;
        const total = PRELOAD_MEDIA.length;

        // Preload media files one by one to track progress
        for (const media of PRELOAD_MEDIA) {
          try {
            const fileStartTime = performance.now();
            
            // Check if already cached to avoid re-downloading
            if (mediaPreloader.isCached(media.url)) {
              console.log('[AppPreloader] Already cached:', media.url);
            } else {
              console.log('[AppPreloader] Downloading:', media.url);
              if (media.type === 'video') {
                await mediaPreloader.preloadVideo(media.url);
              } else {
                await mediaPreloader.preloadModel(media.url);
              }
              const fileEndTime = performance.now();
              console.log('[AppPreloader] Downloaded', media.url, 'in', Math.round(fileEndTime - fileStartTime), 'ms');
            }
          } catch (error) {
            console.error(`[AppPreloader] Failed to preload ${media.url}:`, error);
            // Continue with other files even if one fails
          }

          loaded++;
          setProgress(Math.round((loaded / total) * 100));
        }

        const endTime = performance.now();
        console.log('[AppPreloader] Preloading complete in', Math.round(endTime - startTime), 'ms');
        console.log('[AppPreloader] Cache stats:', mediaPreloader.getCacheStats());

        // Small delay before showing content for smooth transition
        setTimeout(() => {
          setIsPreloading(false);
          setShowContent(true);
        }, 300);
      } catch (error) {
        console.error('[AppPreloader] Error during media preloading:', error);
        setIsPreloading(false);
        setShowContent(true);
      }
    };

    // Start preloading after a small delay to not block initial render
    const timer = setTimeout(() => {
      preloadMedia();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // If not showing progress, render children immediately while preloading in background
  if (!showProgress) {
    return <>{children}</>;
  }

  // Show loading screen with progress
  if (isPreloading && !showContent) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          {/* Logo or Brand */}
          <div className="mb-8">
            <img 
              src="/logo_noback.png" 
              alt="Loading..." 
              className="w-32 h-32 mx-auto object-contain animate-pulse"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#36A9A9] to-[#2d8a8a] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text */}
          <p className="text-gray-600 text-sm">
            Loading resources... {progress}%
          </p>

          {/* Loading Animation */}
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-[#36A9A9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-[#36A9A9] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-[#36A9A9] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AppPreloader;

