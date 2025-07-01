import { useState } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  ExternalLink,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

type Tweet = {
  id: string;
  text: string;
  created_at: string;
  media?: string[];
};

interface TwitterFeedProps {
  className?: string;
}

interface TwitterApiResponse {
  data?: any[];
  includes?: {
    media?: any[];
  };
  error?: string;
}

// Time slots for fetching (in hours)
const TIME_SLOTS = {
  MORNING: 6, // 6 AM
  AFTERNOON: 12, // 12 PM
  EVENING: 18, // 6 PM
  NIGHT: 22, // 10 PM
} as const;

// Get current time slot
const getCurrentTimeSlot = (): string => {
  const hour = new Date().getHours();

  if (hour >= TIME_SLOTS.MORNING && hour < TIME_SLOTS.AFTERNOON) {
    return "MORNING";
  } else if (hour >= TIME_SLOTS.AFTERNOON && hour < TIME_SLOTS.EVENING) {
    return "AFTERNOON";
  } else if (hour >= TIME_SLOTS.EVENING && hour < TIME_SLOTS.NIGHT) {
    return "EVENING";
  } else {
    return "NIGHT";
  }
};

// Check if we should fetch new data
const shouldFetchNewData = (): boolean => {
  try {
    const cachedData = localStorage.getItem("twitter_cache");
    if (!cachedData) return true;

    const cache = JSON.parse(cachedData);
    const currentSlot = getCurrentTimeSlot();
    const today = new Date().toDateString();

    // Check if cache is from today and same time slot
    return !(cache.date === today && cache.timeSlot === currentSlot);
  } catch {
    return true;
  }
};

// Get cached tweets
const getCachedTweets = (): Tweet[] => {
  try {
    const cachedData = localStorage.getItem("twitter_cache");
    if (!cachedData) return [];

    const cache = JSON.parse(cachedData);
    return cache.tweets || [];
  } catch {
    return [];
  }
};

// Save tweets to cache
const saveTweetsToCache = (tweets: Tweet[]): void => {
  try {
    const cacheData = {
      tweets,
      timeSlot: getCurrentTimeSlot(),
      date: new Date().toDateString(),
      timestamp: Date.now(),
    };
    localStorage.setItem("twitter_cache", JSON.stringify(cacheData));
  } catch (error) {
    console.warn("Failed to save tweets to cache:", error);
  }
};

// API function for fetching tweets
const fetchTweets = async (): Promise<Tweet[]> => {
  // Check if we should fetch new data
  if (!shouldFetchNewData()) {
    console.log("Using cached tweets for current time slot");
    return getCachedTweets();
  }

  console.log(`Fetching new tweets for ${getCurrentTimeSlot()} slot`);

  const response = await fetch("/api/twitter");

  if (!response.ok) {
    // If API fails, try to return cached data
    const cachedTweets = getCachedTweets();
    if (cachedTweets.length > 0) {
      console.log("API failed, returning cached tweets");
      return cachedTweets;
    }
    throw new Error(`Failed to fetch tweets: ${response.status}`);
  }

  const data: TwitterApiResponse = await response.json();

  if (data.error) {
    // If API error, try to return cached data
    const cachedTweets = getCachedTweets();
    if (cachedTweets.length > 0) {
      console.log("API error, returning cached tweets");
      return cachedTweets;
    }
    throw new Error(data.error);
  }

  if (!data.data || !Array.isArray(data.data)) {
    return getCachedTweets();
  }

  const mediaMap: Record<string, string> = {};
  data.includes?.media?.forEach((m: any) => {
    mediaMap[m.media_key] = m.url || m.preview_image_url;
  });

  const tweetsData = data.data.map((tweet: any) => ({
    id: tweet.id,
    text: tweet.text,
    created_at: tweet.created_at,
    media:
      tweet.attachments?.media_keys
        ?.map((key: string) => mediaMap[key])
        ?.filter(Boolean) || [],
  }));

  // Save to cache
  saveTweetsToCache(tweetsData);

  return tweetsData;
};

const TwitterFeed: React.FC<TwitterFeedProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: tweets = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<Tweet[], Error>({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
    staleTime: 15 * 60 * 1000, // 15 minutes to match server cache
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      // Don't retry on rate limit errors
      if (error.message.includes("Too Many Requests")) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Error State Component
  const ErrorState = () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-red-400">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">Failed to load tweets</span>
      </div>
      <Button
        onClick={() => refetch()}
        variant="outline"
        size="sm"
        className="w-full bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
        disabled={isFetching}
      >
        {isFetching ? (
          <>
            <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
            Retrying...
          </>
        ) : (
          <>
            <RefreshCw className="w-3 h-3 mr-2" />
            Try Again
          </>
        )}
      </Button>
    </div>
  );

  // Loading State Component
  const LoadingState = () => (
    <div className="space-y-3">
      <div className="h-4 bg-gray-700/50 rounded animate-pulse"></div>
      <div className="h-4 bg-gray-700/50 rounded animate-pulse w-3/4"></div>
      <div className="flex items-center justify-between">
        <div className="h-3 bg-gray-700/50 rounded animate-pulse w-16"></div>
        <div className="h-3 bg-gray-700/50 rounded animate-pulse w-20"></div>
      </div>
    </div>
  );

  // Widget Preview Component
  const TwitterWidget = () => (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
                <Twitter className="w-5 h-5 text-white" />
                {isFetching && (
                  <div className="absolute inset-0 bg-[#1DA1F2] rounded-full animate-pulse"></div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Latest Tweets
                </h3>
                <Badge className="bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30 text-xs">
                  {isError ? "Error" : `${tweets.length} posts`}
                </Badge>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#F4B448] transition-colors" />
          </div>

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState />
          ) : tweets.length > 0 ? (
            <div className="space-y-3">
              <p className="text-gray-300 text-sm leading-relaxed">
                {truncateText(tweets[0].text, 120)}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {formatDate(tweets[0].created_at)}
                </span>
                <span className="text-xs text-[#F4B448] font-medium group-hover:text-[#F4B448]/80">
                  View all tweets →
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-500 text-sm">No tweets available</p>
              <Button
                onClick={() => refetch()}
                variant="outline"
                size="sm"
                className="w-full bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                disabled={isFetching}
              >
                {isFetching ? (
                  <>
                    <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3 h-3 mr-2" />
                    Refresh
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  // Full Dialog Component
  const TwitterDialog = () => (
    <DialogContent className="max-w-4xl max-h-[80vh] bg-transparent border-gray-800">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
              <Twitter className="w-4 h-4 text-white" />
            </div>
            <span>Our Latest Tweets</span>
            <Badge className="bg-[#F4B448]/20 text-[#F4B448] border-[#F4B448]/30">
              {isError ? "Error" : `${tweets.length} posts`}
            </Badge>
          </div>
          {/* <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            disabled={isFetching}
          >
            {isFetching ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button> */}
        </DialogTitle>
      </DialogHeader>

      <div className="overflow-y-auto max-h-[60vh] pr-2 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700/50 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-700/50 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-700/50 rounded animate-pulse w-3/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg mb-2">Failed to load tweets</p>
            <p className="text-gray-500 text-sm mb-4">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black"
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </>
              )}
            </Button>
          </div>
        ) : tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <motion.div
              key={tweet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Tweet Text */}
                <p className="text-white text-base leading-relaxed whitespace-pre-line">
                  {tweet.text}
                </p>

                {/* Tweet Media */}
                {Array.isArray(tweet.media) && tweet.media.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tweet.media.map((img, mediaIndex) => (
                      <div
                        key={mediaIndex}
                        className="relative overflow-hidden rounded-lg border border-gray-600"
                      >
                        <img
                          src={img}
                          alt="Tweet media"
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            // Handle broken images
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Tweet Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(tweet.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <a
                    href={`https://twitter.com/ArealNow/status/${tweet.id}`} // Corrected URL structure for tweets
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F4B448] hover:text-[#F4B448]/80 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <span>View on Twitter</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <Twitter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tweets available</p>
            <p className="text-gray-600 text-sm mb-4">
              Check back later for updates
            </p>
            <Button
              onClick={() => refetch()}
              className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black"
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <TwitterWidget />
        </div>
      </DialogTrigger>
      <TwitterDialog />
    </Dialog>
  );
};

export default TwitterFeed;
