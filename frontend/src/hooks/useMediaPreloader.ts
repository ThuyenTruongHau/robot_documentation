import { useState, useEffect } from 'react';
import mediaPreloader from '../services/mediaPreloader';

interface UseMediaPreloaderOptions {
  preloadOnMount?: boolean;
  priority?: 'high' | 'low';
}

/**
 * Hook to preload and cache media files
 */
export const useMediaPreloader = (
  url: string,
  type: 'video' | 'model',
  options: UseMediaPreloaderOptions = {}
) => {
  const { preloadOnMount = true } = options;
  const [cachedUrl, setCachedUrl] = useState<string>(url);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!preloadOnMount) return;

    const preload = async () => {
      // Check if already cached
      if (mediaPreloader.isCached(url)) {
        const cached = mediaPreloader.getCachedUrl(url);
        if (cached) {
          setCachedUrl(cached);
          setIsLoaded(true);
          return;
        }
      }

      setIsLoading(true);
      try {
        const preloadedUrl = type === 'video'
          ? await mediaPreloader.preloadVideo(url)
          : await mediaPreloader.preloadModel(url);
        
        setCachedUrl(preloadedUrl);
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error(`Error preloading ${type}:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    preload();
  }, [url, type, preloadOnMount]);

  const reload = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const preloadedUrl = type === 'video'
        ? await mediaPreloader.preloadVideo(url)
        : await mediaPreloader.preloadModel(url);
      
      setCachedUrl(preloadedUrl);
      setIsLoaded(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    url: cachedUrl,
    isLoading,
    isLoaded,
    error,
    reload
  };
};

/**
 * Hook to preload multiple media files
 */
export const useMultipleMediaPreloader = (
  media: Array<{ url: string; type: 'video' | 'model' }>,
  preloadOnMount = true
) => {
  const [cachedUrls, setCachedUrls] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Serialize media array to prevent unnecessary re-renders
  const mediaKey = JSON.stringify(media.map(m => ({ url: m.url, type: m.type })));

  useEffect(() => {
    if (!preloadOnMount || media.length === 0) return;

    // Check if all media are already cached
    const allCached = media.every(m => mediaPreloader.isCached(m.url));
    if (allCached) {
      const results = new Map<string, string>();
      media.forEach(m => {
        const cached = mediaPreloader.getCachedUrl(m.url);
        if (cached) {
          results.set(m.url, cached);
        }
      });
      setCachedUrls(results);
      setIsLoaded(true);
      return;
    }

    const preload = async () => {
      setIsLoading(true);
      setProgress(0);

      try {
        const results = await mediaPreloader.preloadMultiple(media);
        setCachedUrls(results);
        setProgress(100);
        setIsLoaded(true);
      } catch (err) {
        console.error('Error preloading multiple media:', err);
      } finally {
        setIsLoading(false);
      }
    };

    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaKey, preloadOnMount]);

  const getCachedUrl = (originalUrl: string): string => {
    return cachedUrls.get(originalUrl) || originalUrl;
  };

  return {
    getCachedUrl,
    isLoading,
    isLoaded,
    progress,
    cachedUrls
  };
};

