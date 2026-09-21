import React from 'react';
import { GameState, TeamData } from '../types';
import { UPGRADES } from '../utils/constants';
import { Trophy, Zap, AlertTriangle, Flame, ShieldAlert } from 'lucide-react';

interface WorldCountriesVisualProps {
  gameState: GameState;
  sortedTeams: TeamData[];
}

// Country metadata with flags and landmarks
const COUNTRY_CONFIG: Record<string, { flag: string; landmark: string; engName: string }> = {
  'team-1': { flag: '🇺🇸', landmark: '자유의 여신상 & 메가폴리스', engName: 'USA' },
  'team-2': { flag: '🇨🇳', landmark: '만리장성 & 초거대 산업지구', engName: 'China' },
  'team-3': { flag: '🇮🇳', landmark: '타지마할 & 첨단 IT 밸리', engName: 'India' },
  'team-4': { flag: '🇯🇵', landmark: '후지산 & 하이테크 테크노폴리스', engName: 'Japan' },
  'team-5': { flag: '🇫🇷', landmark: '에펠탑 & 신재생·원자력 단지', engName: 'France' },
  'team-6': { flag: '🇬🇧', landmark: '빅벤 & 산업혁명 발상지', engName: 'UK' },
};

// Stage visual representation component
const CountryStageScene: React.FC<{
  tierIndex: number; // 0 to 5
  isBlackout: boolean;
  color: string;
}> = ({ tierIndex, isBlackout, color }) => {
  if (isBlackout) {
    return (
      <div className="relative w-full h-32 sm:h-36 bg-zinc-950 rounded-xl overflow-hidden flex flex-col items-center justify-center border border-red-900/60 p-2 text-center">
        <div className="absolute inset-0 bg-red-950/20 animate-pulse pointer-events-none" />
        <ShieldAlert className="w-8 h-8 text-red-500 mb-1 animate-bounce" />
        <span className="text-xs font-black text-red-400 tracking-wider">⚡ 전력 마비 / 공장 셧다운</span>
        <span className="text-[10px] text-zinc-500 mt-0.5">자원 고갈로 모든 기계 정지</span>
      </div>
    );
  }

  // 1단계: 손과 도구 (자연 친화 수작업)
  if (tierIndex === 0) {
    return (
      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-b from-sky-400 to-emerald-600 border border-emerald-500/40 flex flex-col justify-end p-2 shadow-inner">
        {/* Sky & Clouds */}
        <div className="absolute top-2 left-3 text-xs opacity-80">☁️</div>
        <div className="absolute top-4 right-6 text-sm opacity-90">☀️</div>
        <div className="absolute top-2 right-20 text-xs opacity-70">☁️</div>
        {/* Hills and landscape */}
        <svg className="w-full h-20 absolute bottom-0 left-0" viewBox="0 0 200 80" preserveAspectRatio="none">
          <path d="M0,80 Q50,40 100,60 T200,50 L200,80 Z" fill="#15803d" />
          <path d="M0,80 Q70,30 140,55 T200,45 L200,80 Z" fill="#16a34a" opacity="0.9" />
        </svg>
        {/* Village houses & trees */}
        <div className="relative z-10 flex items-end justify-around pb-1 text-lg">
          <span title="나무">🌳</span>
          <span title="작은 오두막집" className="text-2xl">🏡</span>
          <span title="풍차">🌾</span>
          <span title="수작업">🪵</span>
          <span title="나무">🌳</span>
        </div>
        <div className="relative z-10 text-center bg-emerald-950/60 backdrop-blur-xs py-0.5 rounded text-[10px] font-bold text-emerald-300">
          🌱 맑은 하늘 & 자연 친화 수작업
        </div>
      </div>
    );
  }

  // 2단계: 석탄 증기 기계 (1차 산업 혁명)
  if (tierIndex === 1) {
    return (
      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-b from-slate-500 via-stone-600 to-stone-800 border border-amber-600/40 flex flex-col justify-end p-2">
        {/* Puffy Steam & Coal Smoke */}
        <div className="absolute top-1 left-8 text-sm animate-pulse opacity-80">💨</div>
        <div className="absolute top-3 left-16 text-base animate-bounce opacity-70">💨</div>
        <div className="absolute top-2 right-12 text-sm opacity-60">☁️</div>
        {/* Brick Factory silhouette */}
        <div className="relative z-10 flex items-end justify-around pb-1">
          <div className="flex flex-col items-center">
            <span className="text-xs">💨</span>
            <div className="w-3 h-10 bg-amber-900 border-l border-r border-amber-700 rounded-t" />
            <div className="w-10 h-7 bg-stone-700 border border-stone-600 flex items-center justify-center text-[10px]">🏭</div>
          </div>
          <span className="text-2xl" title="증기 기차">🚂</span>
          <div className="flex flex-col items-center">
            <span className="text-[10px]">💨</span>
            <div className="w-2.5 h-8 bg-amber-950 rounded-t" />
            <div className="w-8 h-6 bg-stone-800 flex items-center justify-center text-[9px]">⚙️</div>
          </div>
        </div>
        <div className="relative z-10 text-center bg-stone-950/70 py-0.5 rounded text-[10px] font-bold text-amber-300">
          🚂 붉은 벽돌 굴뚝과 석탄 연기
        </div>
      </div>
    );
  }

  // 3단계: 연기 뿜는 거대 굴뚝 공장 (대량 생산 시대)
  if (tierIndex === 2) {
    return (
      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-b from-zinc-700 via-neutral-800 to-zinc-950 border border-orange-600/50 flex flex-col justify-end p-2">
        {/* Thick Black Smog */}
        <div className="absolute top-1 left-4 text-base opacity-90 animate-pulse">☁️</div>
        <div className="absolute top-2 left-20 text-lg opacity-80 text-zinc-400">🌫️</div>
        <div className="absolute top-1 right-8 text-base opacity-90">🏭</div>
        {/* Industrial pipes and heavy chimneys */}
        <div className="relative z-10 flex items-end justify-around pb-1">
          <div className="flex flex-col items-center">
            <span className="text-xs">🌫️</span>
            <div className="w-4 h-12 bg-zinc-800 border-x border-orange-500/60 rounded-t flex flex-col justify-around py-0.5">
              <div className="w-full h-0.5 bg-orange-500/80" />
              <div className="w-full h-0.5 bg-orange-500/80" />
            </div>
            <div className="w-12 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center">🏗️</div>
          </div>
          <span className="text-2xl" title="정유 탱크">🛢️</span>
          <div className="flex flex-col items-center">
            <span className="text-xs">🌫️</span>
            <div className="w-3 h-10 bg-zinc-800 rounded-t" />
            <div className="w-10 h-7 bg-zinc-900 border border-zinc-700 flex items-center justify-center">🏭</div>
          </div>
        </div>
        <div className="relative z-10 text-center bg-zinc-950/80 py-0.5 rounded text-[10px] font-bold text-orange-400">
          🌫️ 회색빛 스모그와 거대 굴뚝 단지
        </div>
      </div>
    );
  }

  // 4단계: 밤낮없는 자동 로봇 공장 (첨단 전자·정밀 기계)
  if (tierIndex === 3) {
    return (
      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-zinc-950 border border-cyan-500/50 flex flex-col justify-end p-2">
        {/* High-tech glow and neon wires */}
        <div className="absolute top-1 right-4 text-xs font-mono text-cyan-400 opacity-80">⚡ 24H AUTO</div>
        <div className="absolute top-2 left-6 text-sm animate-ping">✨</div>
        {/* Robotic arms and automated lines */}
        <div className="relative z-10 flex items-end justify-around pb-1">
          <span className="text-2xl animate-pulse" title="로봇 팔">🦾</span>
          <div className="flex flex-col items-center">
            <div className="text-xs text-cyan-300 font-mono">🤖</div>
            <div className="w-14 h-8 bg-slate-800 border border-cyan-500/60 rounded flex items-center justify-center text-xs text-cyan-400">
              <span className="animate-pulse">⚙️⚙️⚙️</span>
            </div>
          </div>
          <span className="text-2xl" title="자동화 라인">🦾</span>
          <span className="text-xl" title="초고속 물류">📦</span>
        </div>
        <div className="relative z-10 text-center bg-blue-950/80 py-0.5 rounded text-[10px] font-bold text-cyan-300">
          🤖 24시간 쉬지 않는 자동 로봇 공장
        </div>
      </div>
    );
  }

  // 5단계: 인공지능(AI) 스마트 도시 (초고속 미래 성장)
  if (tierIndex === 4) {
    return (
      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-zinc-950 border border-purple-500/60 flex flex-col justify-end p-2">
        {/* Cyber Grid & Flying vehicles */}
        <div className="absolute top-1 left-4 text-xs text-purple-300 font-mono">🌐 AI GRID</div>
        <div className="absolute top-2 right-6 text-sm animate-pulse">🛸</div>
        <div className="absolute top-4 left-24 text-xs text-indigo-400">🛰️</div>
        {/* Skyscrapers & neon lasers */}
        <div className="relative z-10 flex items-end justify-around pb-1">
          <span className="text-2xl" title="미래 빌딩">🏙️</span>
          <div className="flex flex-col items-center">
            <span className="text-xs text-pink-400 animate-bounce">⚡</span>
            <div className="w-12 h-14 bg-purple-900/80 border-t-2 border-purple-400 rounded-t flex flex-col justify-around items-center">
              <div className="w-8 h-0.5 bg-cyan-400" />
              <div className="w-8 h-0.5 bg-pink-400" />
              <div className="w-8 h-0.5 bg-cyan-400" />
            </div>
          </div>
          <span className="text-3xl" title="초고층 마천루">🌃</span>
          <span className="text-xl" title="드론">🛸</span>
        </div>
        <div className="relative z-10 text-center bg-purple-950/80 py-0.5 rounded text-[10px] font-bold text-purple-300">
          🏙️ 인공지능(AI) 초거대 스마트 도시
        </div>
      </div>
    );
  }

  // 6단계: 지구 속까지 뚫는 초대형 굴착기 (마지막 극한 채굴)
  return (
    <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-b from-red-950 via-amber-950 to-black border-2 border-red-500 flex flex-col justify-end p-2 animate-pulse">
      {/* Lava & magma sparks */}
      <div className="absolute top-1 left-3 text-xs text-red-400 font-black animate-bounce flex items-center gap-1">
        <Flame className="w-3.5 h-3.5 text-red-500" /> ⚠️ 극한 채굴 중!
      </div>
      <div className="absolute top-2 right-4 text-base animate-ping">💥</div>
      <div className="absolute top-3 right-16 text-sm">🌋</div>
      {/* Mega core drill penetrating earth */}
      <div className="relative z-10 flex items-end justify-around pb-1">
        <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }} title="초거대 드릴">
          ⚙️
        </span>
        <div className="flex flex-col items-center">
          <div className="text-sm text-amber-400 animate-bounce">🔥</div>
          <div className="w-14 h-12 bg-red-900 border-2 border-amber-500 rounded-t flex flex-col items-center justify-center">
            <span className="text-xl">🌋</span>
          </div>
        </div>
        <span className="text-3xl" title="심부 시추 코어">
          ⚡
        </span>
        <span className="text-2xl animate-bounce">💥</span>
      </div>
      <div className="relative z-10 text-center bg-red-950/90 py-0.5 rounded text-[10px] font-black text-red-300 border border-red-500/50">
        🌋 행성 중심부까지 뚫는 초대형 굴착기
      </div>
    </div>
  );
};

export const WorldCountriesVisual: React.FC<WorldCountriesVisualProps> = ({
  gameState,
  sortedTeams,
}) => {
  const isBlackout = gameState.status === 'blackout';

  return (
    <div className="w-full flex flex-col space-y-3">
      {/* Header bar of Centerpiece */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🌍</span>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>지구촌 6대 국가 실시간 발전 현장</span>
              <span className="text-[11px] font-medium text-zinc-400 hidden sm:inline">
                (학생들의 생산과 업그레이드에 따라 실시간으로 변화합니다)
              </span>
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-zinc-400">
            총 발전도: <strong className="text-indigo-400 font-mono">{Math.round(Object.values(gameState.teams).reduce((s, t) => s + t.score, 0)).toLocaleString()} pts</strong>
          </span>
        </div>
      </div>

      {/* 6 Countries Dynamic Diorama Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {Object.keys(gameState.teams).map((tid) => {
          const team = gameState.teams[tid];
          const rank = sortedTeams.findIndex((t) => t.id === tid) + 1;
          const currentUpgrade = UPGRADES.find((u) => u.id === team.currentUpgradeId) || UPGRADES[0];
          const tierIndex = UPGRADES.findIndex((u) => u.id === team.currentUpgradeId);
          const meta = COUNTRY_CONFIG[tid] || { flag: '🌐', landmark: '산업 지구', engName: 'Nation' };
          const isFirstPlace = rank === 1 && team.score > 0;

          return (
            <div
              key={tid}
              className={`rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col p-3 ${
                isFirstPlace
                  ? 'bg-zinc-900/90 border-amber-500/80 shadow-lg shadow-amber-950/40 ring-1 ring-amber-500/40'
                  : 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700'
              } ${isBlackout ? 'grayscale-70' : ''}`}
            >
              {/* Card Top: Country Name & Flag & Rank */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl select-none" role="img" aria-label={team.name}>
                    {meta.flag}
                  </span>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h4 className="text-sm font-bold text-white tracking-tight">{team.name}</h4>
                      {isFirstPlace && (
                        <span className="text-[10px] font-extrabold bg-amber-500 text-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                          <Trophy className="w-2.5 h-2.5 fill-black" /> 1위
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-400 block">{meta.landmark}</span>
                  </div>
                </div>

                {/* Score & Rank Badge */}
                <div className="text-right">
                  <div className="text-base font-black font-mono" style={{ color: team.color }}>
                    {Math.round(team.score).toLocaleString()}
                    <span className="text-[10px] font-normal text-zinc-400 ml-0.5">pts</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold">{rank}위</span>
                </div>
              </div>

              {/* Central Diorama Scene for this Country */}
              <div className="my-1.5">
                <CountryStageScene
                  tierIndex={tierIndex >= 0 ? tierIndex : 0}
                  isBlackout={isBlackout}
                  color={team.color}
                />
              </div>

              {/* Card Bottom: Current Upgrade Pill & Click Power */}
              <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 truncate">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: team.color }}
                  />
                  <span className="text-[11px] font-bold text-zinc-200 truncate">
                    {currentUpgrade.name}
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-[11px] font-mono shrink-0 pl-1">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-amber-300 font-bold">+{currentUpgrade.pointsPerTap}</span>
                  <span className="text-zinc-500 text-[9px]">/클릭</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
