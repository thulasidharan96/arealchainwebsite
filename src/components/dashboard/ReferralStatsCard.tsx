import React, { useState, useEffect } from "react";
import { Card } from "@/src/components/ui/card";
import { getReferralStats } from "@/src/services/referralService";
import { Users, Gift, TrendingUp, Copy } from "lucide-react";
import { useToast } from "@/src/hooks/use-toast";

interface ReferralStats {
  totalReferrals: number;
  totalEarnings: number;
  totalCouponsGiven: number;
  lastReferralDate: string;
  referralCode: string;
  // Optional fields that might not be present
  activeReferrals?: number;
  pendingRewards?: number;
  influencerCode?: string;
  level?: number;
  commissionRate?: number;
  kycStatus?: number;
}

const ReferralStatsCard: React.FC = () => {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await getReferralStats();
      
             if (response.success && response.data?.data) {
         // The actual data is nested one level deeper
         const actualData = response.data.data.data;
         
         if (!actualData) {
           setError("Invalid data structure received from server");
           return;
         }
         
         // Extract the user data and stats
         const userData = actualData.user;
         
         // Add null checks for the data
         if (!userData) {
           setError("Invalid data structure received from server");
           return;
         }
         
         // Get stats from user.referralStats
         const referralStatsData = userData.referralStats;
         
         if (!referralStatsData) {
           setError("Referral stats not found in user data");
           return;
         }
         
                   const referralStats: ReferralStats = {
            totalReferrals: referralStatsData.totalReferrals || 0,
            totalEarnings: referralStatsData.totalEarnings || 0,
            totalCouponsGiven: referralStatsData.totalCouponsGiven || 0,
            lastReferralDate: referralStatsData.lastReferralDate || "",
            referralCode: userData.referralCode || "",
            // Set defaults for optional fields
            activeReferrals: referralStatsData.totalReferrals || 0, // Using total as active for now
            pendingRewards: 0, // Not provided in API response
            level: 1, // Default level
            commissionRate: 0.05, // Default 5% commission
            kycStatus: userData.status?.kyc?.status || 0,
          };
         
                   setStats(referralStats);
        } else {
          setError(response.message || "Failed to fetch referral stats");
        }
    } catch (err) {
      console.error("Error fetching referral stats:", err);
      setError("Failed to load referral statistics");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl">
        <div className="text-center">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={fetchReferralStats}
            className="mt-2 text-[#F4B448] hover:text-[#F4B448]/80 text-sm underline"
          >
            Try Again
          </button>
        </div>
      </Card>
    );
  }

     if (!stats) {
     return null;
   }

   // Check if KYC is completed (status 1 means completed)
   const isKycCompleted = stats.kycStatus === 1;

   return (
     <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 shadow-2xl">
       <div className="mb-6">
         <h3 className="text-xl font-bold text-white mb-2">Referral Program</h3>
         <p className="text-gray-400 text-sm">
           Share your referral code and earn rewards
         </p>
       </div>

       {!isKycCompleted && (
         <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
           <p className="text-yellow-400 text-sm">
             Complete your KYC verification to view referral statistics and earn rewards.
           </p>
         </div>
       )}

                    {isKycCompleted && (
         <>
           {/* Stats Grid */}
           <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="bg-gray-700/40 p-4 rounded-lg border border-gray-600">
               <div className="flex items-center space-x-2 mb-2">
                 <Users className="text-[#F4B448] h-5 w-5" />
                 <span className="text-gray-400 text-sm">Total Referrals</span>
               </div>
               <p className="text-2xl font-bold text-white">{stats.totalReferrals || 0}</p>
             </div>

             <div className="bg-gray-700/40 p-4 rounded-lg border border-gray-600">
               <div className="flex items-center space-x-2 mb-2">
                 <TrendingUp className="text-green-400 h-5 w-5" />
                 <span className="text-gray-400 text-sm">Active Referrals</span>
               </div>
               <p className="text-2xl font-bold text-white">{stats.activeReferrals || 0}</p>
             </div>
           </div>

           {/* Referral Codes */}
           <div className="space-y-4">
             <div>
               <label className="text-gray-400 text-sm mb-2 block">Your Referral Code</label>
               <div className="flex items-center space-x-2">
                 <input
                   type="text"
                   value={stats.referralCode || "No code available"}
                   readOnly
                   className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg text-sm"
                 />
                 <button
                   onClick={() => copyToClipboard(stats.referralCode || "", "Referral code")}
                   className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black px-3 py-2 rounded-lg transition-colors"
                   disabled={!stats.referralCode}
                 >
                   <Copy className="h-4 w-4" />
                 </button>
               </div>
             </div>

             {stats.influencerCode && (
               <div>
                 <label className="text-gray-400 text-sm mb-2 block">Influencer Code</label>
                 <div className="flex items-center space-x-2">
                   <input
                     type="text"
                     value={stats.influencerCode}
                     readOnly
                     className="flex-1 bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg text-sm"
                   />
                   <button
                     onClick={() => copyToClipboard(stats.influencerCode || "", "Influencer code")}
                     className="bg-[#F4B448] hover:bg-[#F4B448]/90 text-black px-3 py-2 rounded-lg transition-colors"
                   >
                     <Copy className="h-4 w-4" />
                   </button>
                 </div>
               </div>
             )}
           </div>

           {/* Additional Info */}
           {stats.lastReferralDate && (
             <div className="mt-4 p-3 bg-[#F4B448]/10 border border-[#F4B448]/30 rounded-lg">
               <p className="text-gray-400 text-xs">
                 Last Referral: {new Date(stats.lastReferralDate).toLocaleDateString()}
               </p>
             </div>
           )}
         </>
       )}
    </Card>
  );
};

export default ReferralStatsCard;
