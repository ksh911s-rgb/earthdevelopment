import React, { useEffect, useState, useRef } from 'react';
import { GameState } from '../types';
import { EarthVisual } from './EarthVisual';
import { WorldCountriesVisual } from './WorldCountriesVisual';
import { soundEngine } from '../utils/audio';
import { adminResetGame } from '../utils/socket';
import { UPGRADES } from '../utils/constants';
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  AlertOctagon,
  Flame,
  Activity,
  Trophy,
  Zap,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Clock,
  Users,
} from 'lucide-react';

interface CentralTvScreenProps {
  gameState: GameState;
  onOpenTeacherControl: () => void;
  onOpenDebriefing: () => void;
}

export const CentralTvScreen: React.FC<CentralTvScreenProps> = ({
  gameState,
  onOpenTeacherControl,
  onOpenDebriefing,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevStatusRef = useRef(gameState.status);

  // Audio stage sync
  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    if (gameState.status === 'playing') {
      if (gameState.resourcePercent >= 50) {
        soundEngine.updateStageAudio(1);
      } else if (gameState.resourcePercent >= 20) {
        soundEngine.updateStageAudio(2);
      } else if (gameState.resourcePercent > 0) {
        soundEngine.updateStageAudio(3);
      }
    } else if (gameState.status === 'blackout') {
      if (prevStatusRef.current !== 'blackout') {
        soundEngine.playBlackout();
      }
    } else {
      soundEngine.stopContinuousSounds();
    }
    prevStatusRef.current = gameState.status;
  }, [gameState.status, gameState.resourcePercent]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Rank sorting
  const sortedTeams = Object.values(gameState.teams).sort((a, b) => b.score - a.score);
  const topScore = Math.max(1, sortedTeams[0]?.score || 1);

  // Ready State Check
  const teamList = Object.values(gameState.teams);
  const totalTeamsCount = teamList.length;
  const readyTeamsCount = teamList.filter((t) => t.isReady).length;
  const allReady = readyTeamsCount === totalTeamsCount && totalTeamsCount > 0;

  // Determine stage visual classes
  const isDanger = gameState.resourcePercent < 20 && gameState.status === 'playing';
  const isWarning = gameState.resourcePercent >= 20 && gameState.resourcePercent < 50 && gameState.status === 'playing';

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-screen bg-zinc-950 text-white flex flex-col justify-between overflow-hidden select-none transition-colors duration-1000 ${
        isDanger ? 'bg-red-950/40' : isWarning ? 'bg-amber-950/20' : 'bg-zinc-950'
      }`}
    >
      {/* Red Alarm flashing border in Danger Phase */}
      {isDanger && (
        <div className="absolute inset-0 pointer-events-none border-8 border-red-600/70 animate-pulse z-20" />
      )}

      {/* Top Header Bar & Compact Global Resource Widget (Top-Left) */}
      <header className="relative z-10 px-4 sm:px-6 py-3 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Top-Left: Compact Global Earth Resource Monitor */}
          <div className="flex items-center space-x-3.5 bg-zinc-900/90 border border-zinc-800/90 rounded-2xl px-3.5 py-2 shadow-lg">
            {/* Mini Earth Visual */}
            <div className="relative shrink-0">
              <EarthVisual resourcePercent={gameState.resourcePercent} status={gameState.status} size="sm" />
            </div>

            {/* Resource Percentage & Numbers */}
            <div className="flex flex-col min-w-[200px] sm:min-w-[250px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  지구 총 잔여 자원량
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isDanger
                      ? 'bg-red-600 text-white animate-pulse'
                      : isWarning
                      ? 'bg-amber-600 text-white'
                      : 'bg-emerald-600/90 text-white'
                  }`}
                >
                  초당 -{gameState.consumptionRate.toLocaleString()} 소모
                </span>
              </div>

              <div className="flex items-baseline space-x-2 my-0.5">
                <span
                  className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${
                    isDanger ? 'text-red-400 animate-pulse' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                >
                  {gameState.resourcePercent}%
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  <strong className="text-white font-bold">
                    {Math.round(gameState.currentResource).toLocaleString()}
                  </strong>{' '}
                  / {gameState.maxResource.toLocaleString()}
                </span>
              </div>

              {/* Compact Bar */}
              <div className="relative w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-out ${
                    isDanger
                      ? 'bg-gradient-to-r from-red-600 to-rose-500'
                      : isWarning
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-400'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-400'
                  }`}
                  style={{ width: `${Math.max(0, Math.min(100, gameState.resourcePercent))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Top-Right: Game Status, Timer, Controls */}
          <div className="flex items-center justify-between md:justify-end space-x-2.5 sm:space-x-3">
            {/* Status Pill */}
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                gameState.status === 'playing'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                  : gameState.status === 'paused'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : gameState.status === 'blackout'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
              }`}
            >
              {gameState.status === 'playing'
                ? '● 실시간 생산 진행 중'
                : gameState.status === 'paused'
                ? '⏸️ 일시 정지'
                : gameState.status === 'blackout'
                ? '💀 자원 고갈 마비'
                : '⏳ 대기 중 (시작 전)'}
            </span>

            {/* Elapsed Timer */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono">
              <span className="text-zinc-400">경과:</span>
              <span className="font-bold text-amber-400">
                {Math.floor(gameState.elapsedSeconds / 60)}분{' '}
                {(gameState.elapsedSeconds % 60).toString().padStart(2, '0')}초
              </span>
            </div>

            {/* Total Clicks Pill */}
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-zinc-400">전체 클릭:</span>
              <span className="font-bold text-white">{gameState.totalClicks.toLocaleString()}</span>
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
              title={isMuted ? '음소거 해제' : '음소거'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
              title="전체 화면 토글"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>

            {/* Teacher Console Button */}
            <button
              onClick={onOpenTeacherControl}
              className="flex items-center space-x-1.5 px-3 sm:px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs sm:text-sm text-white transition shadow-lg shadow-indigo-900/40"
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline">선생님 관리창</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Screen Layout (Center Stage: 6 Countries Visual Showcase) */}
      <main className="relative flex-1 flex flex-col justify-center px-4 sm:px-6 py-4 max-w-7xl mx-auto w-full z-10">
        {/* Team Ready Check Panel (Only shown in waiting state before game start) */}
        {gameState.status === 'waiting' && (
          <div className="mb-4 bg-zinc-900/90 border border-zinc-700/80 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-zinc-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-2">
                    <span>모둠별 게임 준비 현황 (Ready Check)</span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    각 모둠 태블릿에서 모둠을 선택하고 입장하면 실시간으로 준비 완료로 표시됩니다.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black tracking-wide border flex items-center gap-1.5 ${
                    allReady
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60 animate-pulse'
                      : readyTeamsCount > 0
                      ? 'bg-amber-950/70 text-amber-300 border-amber-500/50'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                  }`}
                >
                  {allReady ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>🎉 6개 모둠 전원 준비 완료!</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>준비 완료: {readyTeamsCount} / {totalTeamsCount} 모둠</span>
                    </>
                  )}
                </span>

                <button
                  onClick={onOpenTeacherControl}
                  className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow"
                >
                  선생님 관리창
                </button>
              </div>
            </div>

            {/* 6-Team Ready Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {Object.keys(gameState.teams).map((tid) => {
                const team = gameState.teams[tid];
                const flagMap: Record<string, string> = {
                  'team-1': '🇺🇸',
                  'team-2': '🇨🇳',
                  'team-3': '🇮🇳',
                  'team-4': '🇯🇵',
                  'team-5': '🇫🇷',
                  'team-6': '🇬🇧',
                };
                const flag = flagMap[tid] || '🌍';
                const isReady = !!team.isReady;

                return (
                  <div
                    key={tid}
                    className={`p-3 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      isReady
                        ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/30'
                        : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xl">{flag}</span>
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: team.color }}
                        />
                      </div>
                      <div className="font-black text-xs text-white truncate mb-0.5">
                        {team.name}
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-zinc-800/60">
                      {isReady ? (
                        <div className="flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                          <span>준비 완료!</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1 text-zinc-500 font-medium text-[11px]">
                          <Clock className="w-3 h-3 shrink-0 animate-pulse text-amber-500/70" />
                          <span className="text-zinc-400">대기 중</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Warning banner on stage 2 or 3 */}
        {isDanger && gameState.status === 'playing' && (
          <div className="mb-3 px-4 py-2 rounded-xl bg-red-950/80 border border-red-500/80 flex items-center justify-center space-x-2 animate-bounce">
            <Flame className="w-4 h-4 text-red-400" />
            <span className="text-xs sm:text-sm font-black text-red-300">
              [긴급 경보] 지구 총 잔여 자원이 20% 미만입니다! 전 세계 기계가 곧 멈출 수 있습니다!
            </span>
          </div>
        )}

        {/* 6 Countries Real-time Development Showcase */}
        <WorldCountriesVisual gameState={gameState} sortedTeams={sortedTeams} />
      </main>

      {/* Bottom Live 6-Team Ranking Race Board */}
      <footer className="relative z-10 px-6 py-4 bg-zinc-950/90 border-t border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>모둠별 실시간 발전도 랭킹 레이스 (1~6모둠)</span>
            </span>
            <span className="text-xs text-zinc-500">
              * 점수가 가장 높은 모둠이 1등을 차지합니다
            </span>
          </div>

          {/* 6-Team Horizontal Comparison Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.keys(gameState.teams).map((tid) => {
              const team = gameState.teams[tid];
              // find team rank
              const rank = sortedTeams.findIndex((t) => t.id === tid) + 1;
              const currentUpgrade = UPGRADES.find((u) => u.id === team.currentUpgradeId);
              const scorePercent = Math.min(100, Math.round((team.score / topScore) * 100));

              return (
                <div
                  key={tid}
                  className={`p-3 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    rank === 1
                      ? 'bg-zinc-900 border-amber-500/60 shadow-lg shadow-amber-950/30'
                      : 'bg-zinc-900/60 border-zinc-800'
                  }`}
                >
                  {/* Top Bar Indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: team.color }}
                  />

                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-1.5">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                          rank === 1
                            ? 'bg-amber-500 text-black'
                            : rank === 2
                            ? 'bg-zinc-300 text-black'
                            : rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {rank}
                      </span>
                      <span className="font-bold text-xs truncate max-w-[100px]">{team.name}</span>
                    </div>
                    {gameState.status === 'waiting' ? (
                      team.isReady ? (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>준비됨</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-zinc-500">
                          대기 중
                        </span>
                      )
                    ) : (
                      <span className="text-[10px] font-semibold text-zinc-400">
                        {team.tapCount.toLocaleString()} 클릭
                      </span>
                    )}
                  </div>

                  {/* Score */}
                  <div className="text-lg font-black font-mono text-white mb-1">
                    {Math.round(team.score).toLocaleString()}
                    <span className="text-[10px] font-normal text-zinc-400 ml-0.5">pts</span>
                  </div>

                  {/* Relative Score Bar */}
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-1.5">
                    <div
                      className="h-full rounded-full transition-all duration-200"
                      style={{ width: `${scorePercent}%`, backgroundColor: team.color }}
                    />
                  </div>

                  {/* Current Upgrade Badge */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-400">
                    <span className="truncate">{currentUpgrade?.name}</span>
                    <span className="text-amber-400/90 font-mono font-bold">
                      +{currentUpgrade?.pointsPerTap}/클릭
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </footer>

      {/* Dramatic Blackout Overlay (PRD Section 4: Sudden Freeze, Explosion, "삐---", CRT Crash) */}
      {gameState.status === 'blackout' && (
        <div className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-6 text-center select-none overflow-y-auto">
          {/* CRT Glitch Scanlines & Border */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
          <div className="absolute inset-0 pointer-events-none border-8 border-red-700/60 animate-pulse" />

          <div className="relative z-20 max-w-2xl w-full border border-red-600/60 bg-red-950/30 p-6 sm:p-8 rounded-3xl shadow-[0_0_80px_rgba(239,68,68,0.4)] backdrop-blur-xl pointer-events-auto">
            <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto mb-6 text-red-500 animate-pulse">
              <AlertOctagon className="w-10 h-10" />
            </div>

            <div className="text-xs font-mono font-black text-red-400 uppercase tracking-widest mb-2">
              🚨 CRITICAL PLANETARY SYSTEM OVERLOAD 🚨
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-red-500 tracking-tight mb-4 font-mono">
              SYSTEM ERROR: 자원 0% 고갈
            </h2>

            <p className="text-lg sm:text-xl font-bold text-white mb-2">
              모든 에너지 공급 및 전 세계 공장 가동이 전면 중단되었습니다.
            </p>

            <p className="text-sm text-zinc-400 mb-8 max-w-md mx-auto">
              더 이상 생산할 자원이 지구상에 남아있지 않습니다. 학생 태블릿 기기도 모두 강제 마비되었습니다.
            </p>

            {/* Post-collapse Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onOpenDebriefing}
                className="cursor-pointer px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 font-black text-sm sm:text-base text-white transition shadow-xl shadow-indigo-950/50 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>수업 디브리핑 (성찰 토의) 열기</span>
              </button>

              <button
                type="button"
                onClick={() => adminResetGame()}
                className="cursor-pointer px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 font-black text-sm sm:text-base text-white transition shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>게임 재설정 (다시하기)</span>
              </button>

              <button
                type="button"
                onClick={onOpenTeacherControl}
                className="cursor-pointer px-5 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 border border-zinc-600 font-bold text-sm sm:text-base text-zinc-200 transition flex items-center justify-center gap-2"
              >
                <Sliders className="w-5 h-5" />
                <span>선생님 관리창</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
