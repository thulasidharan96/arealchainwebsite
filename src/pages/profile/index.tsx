import React from "react";
import LayoutMain from "@/src/components/dashboard/layoutMain";
import { useUserStore } from "@/src/store/useUserStore";
import { useKycStatusLabel } from "@/src/hooks/useKycStatus";
import ReferralStatsCard from "@/src/components/dashboard/ReferralStatsCard";
import Image from "next/image";
import {
  User,
  Shield,
  Settings,
  Gift,
  TrendingUp,
  Copy,
  Share2,
} from "lucide-react";

const Profile = () => {
  const { userDetail, kycStatus } = useUserStore();
  const kycLabel = useKycStatusLabel(kycStatus);

  if (!userDetail || kycStatus === undefined) {
    return (
      <LayoutMain>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F4B448] mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold mb-2 text-white">Loading...</h1>
            <p className="text-gray-400">
              Please wait while we fetch your data.
            </p>
          </div>
        </div>
      </LayoutMain>
    );
  }

  return (
    <LayoutMain>
      <div className="max-w-4xl mx-auto p-4">
        {/* Profile Header - Mobile First */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F4B448] to-[#4ECDC4] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-black" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-white mb-1">
                  {userDetail?.username || "User"}
                </h1>
                <p className="text-gray-400 text-sm mb-2">
                  {userDetail?.email}
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">
                    Active Account
                  </span>
                </div>
              </div>
            </div>

            {/* Info Cards - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                <p className="text-gray-400 text-xs">Member Since</p>
                <p className="text-white font-bold text-sm">
                  {new Date(userDetail?.createdAt || "").toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                <p className="text-gray-400 text-xs">Level</p>
                <p className="text-[#F4B448] font-bold text-sm">
                  Level {userDetail?.level || 1}
                </p>
              </div>
              <div className="bg-gray-700/50 rounded-lg px-3 py-2">
                <p className="text-gray-400 text-xs">Country</p>
                <p className="text-blue-400 font-bold text-sm">
                  {userDetail?.country || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Single Column on Mobile, Two Columns on Desktop */}
        <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {/* Account Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-400" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Account Information
                </h2>
              </div>

              <div className="space-y-3">
                {/* <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">User ID</span>
                  <span className="text-white font-medium text-sm">{userDetail?.userUid}</span>
                </div> */}

                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">Email</span>
                  <span className="text-white font-medium text-sm">
                    {userDetail?.email}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">Username</span>
                  <span className="text-white font-medium text-sm">
                    {userDetail?.username}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">Country</span>
                  <span className="text-white font-medium text-sm">
                    {userDetail?.country || "Not specified"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">Account Level</span>
                  <span className="text-[#F4B448] font-bold text-sm">
                    Level {userDetail?.level || 1}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">Member Since</span>
                  <span className="text-white font-medium text-sm">
                    {new Date(userDetail?.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* KYC Status */}
            {/* <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-400" />
                </div>
                <h2 className="text-lg font-bold text-white">KYC Status</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span
                    className={`font-bold text-sm ${
                      kycStatus === 1
                        ? "text-green-400"
                        : kycStatus === 2
                        ? "text-red-400"
                        : kycStatus === 0
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                  >
                    {kycLabel}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-400 text-sm">Last Updated</span>
                  <span className="text-white font-medium text-sm">
                    {userDetail?.updatedAt
                      ? new Date(userDetail.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Referral Section */}
          <div className="space-y-6">
            {/* <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Gift className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-lg font-bold text-white">
                  Referral Program
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  Share your referral code with friends and earn rewards for
                  every successful referral. The more you refer, the more you
                  earn!
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700/40 p-3 rounded-lg border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="text-[#F4B448] h-4 w-4" />
                      <span className="text-gray-400 text-xs">
                        Commission Rate
                      </span>
                    </div>
                    <p className="text-lg font-bold text-[#F4B448]">5%</p>
                    <p className="text-gray-500 text-xs">Per referral</p>
                  </div>

                  <div className="bg-gray-700/40 p-3 rounded-lg border border-gray-600">
                    <div className="flex items-center space-x-2 mb-2">
                      <Share2 className="text-green-400 h-4 w-4" />
                      <span className="text-gray-400 text-xs">Rewards</span>
                    </div>
                    <p className="text-lg font-bold text-green-400">Instant</p>
                    <p className="text-gray-500 text-xs">No waiting</p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Referral Stats Card */}
            <ReferralStatsCard />
          </div>
        </div>

        {/* Quick Actions - Mobile Only */}
        {/* <div className="mt-6 lg:hidden">
          <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#F4B448]/20 rounded-full flex items-center justify-center">
                <Settings className="w-4 h-4 text-[#F4B448]" />
              </div>
              <h2 className="text-lg font-bold text-white">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy Referral Link</span>
              </button>
              
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Share on Social</span>
              </button>
              
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                <Gift className="w-4 h-4" />
                <span>View Rewards</span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </LayoutMain>
  );
};

export default Profile;
