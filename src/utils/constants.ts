import { TeamData, UpgradeDef } from '../types';

export const DEFAULT_MAX_RESOURCE = 30000; // tuned for ~3-5 minutes of 6 active teams
export const TEACHER_PASSWORD = '5246';

export const UPGRADES: UpgradeDef[] = [
  {
    id: 'tier-1',
    name: '1단계: 손과 도구로 뚝딱뚝딱',
    subtitle: '소박한 수작업 시대',
    cost: 0,
    pointsPerTap: 1,
    resourceCostPerTap: 1,
    passivePointsPerSec: 0,
    passiveResourcePerSec: 0,
    icon: 'Hammer',
    description: '클릭당 +1 발전도 획득',
    flavorText: '사람 손과 간단한 도구로 일해요. 자연을 거의 해치지 않아요.',
  },
  {
    id: 'tier-2',
    name: '2단계: 칙칙폭폭 석탄 증기 기계',
    subtitle: '첫 번째 산업 혁명',
    cost: 40,
    pointsPerTap: 3,
    resourceCostPerTap: 4, // 1.33x ratio
    passivePointsPerSec: 1,
    passiveResourcePerSec: 2,
    icon: 'Factory',
    description: '클릭당 +3 발전도! (초당 +1 자동)',
    flavorText: '석탄을 태워 기계를 힘차게 돌려요. 굴뚝에서 검은 연기가 피어올라요.',
  },
  {
    id: 'tier-3',
    name: '3단계: 연기 뿜는 거대 굴뚝 공장',
    subtitle: '대량 생산의 시대',
    cost: 200,
    pointsPerTap: 12,
    resourceCostPerTap: 20, // 1.66x ratio
    passivePointsPerSec: 5,
    passiveResourcePerSec: 10,
    icon: 'Fuel',
    description: '클릭당 +12 발전도 폭증! (초당 +5 자동)',
    flavorText: '석유와 철을 마구 써서 거대한 물건들을 쏟아내요. 도시가 뿌옇게 변해요.',
  },
  {
    id: 'tier-4',
    name: '4단계: 밤낮없는 자동 로봇 공장',
    subtitle: '첨단 전자와 기계 시대',
    cost: 800,
    pointsPerTap: 45,
    resourceCostPerTap: 90, // 2.0x ratio
    passivePointsPerSec: 25,
    passiveResourcePerSec: 50,
    icon: 'Cpu',
    description: '클릭당 +45 발전도 대폭 상승! (초당 +25 자동)',
    flavorText: '쉬지 않고 움직이는 로봇 팔들이 물건을 조립해요. 엄청난 전기를 써요.',
  },
  {
    id: 'tier-5',
    name: '5단계: 인공지능(AI) 스마트 도시',
    subtitle: '초고속 미래 성장',
    cost: 2500,
    pointsPerTap: 180,
    resourceCostPerTap: 450, // 2.5x ratio
    passivePointsPerSec: 100,
    passiveResourcePerSec: 250,
    icon: 'Bot',
    description: '클릭당 +180 발전도 초고속 질주! (초당 +100 자동)',
    flavorText: '인공지능이 도시 전체를 통제하며 지구의 원자재를 쉴 새 없이 빨아들여요.',
  },
  {
    id: 'tier-6',
    name: '6단계: 지구 속까지 뚫는 초대형 굴착기',
    subtitle: '마지막 한계 채굴',
    cost: 7000,
    pointsPerTap: 650,
    resourceCostPerTap: 2000, // 3.0x ratio
    passivePointsPerSec: 350,
    passiveResourcePerSec: 1000,
    icon: 'Zap',
    description: '클릭당 +650 최상위 발전도! (초당 +350 자동)',
    flavorText: '땅속 깊은 곳까지 사정없이 뚫어 지구의 마지막 남은 자원을 몽땅 긁어모아요!',
  },
];

export const INITIAL_TEAMS: Record<string, TeamData> = {
  'team-1': {
    id: 'team-1',
    name: '미국(1모둠)',
    color: '#2563EB', // Blue
    score: 0,
    tapCount: 0,
    currentUpgradeId: 'tier-1',
    upgradesPurchased: { 'tier-1': 1 },
    activeMembers: 0,
    lastTapTimestamp: 0,
    recentTapRate: 0,
    isReady: false,
  },
  'team-2': {
    id: 'team-2',
    name: '중국(2모둠)',
    color: '#DC2626', // Red
    score: 0,
    tapCount: 0,
    currentUpgradeId: 'tier-1',
    upgradesPurchased: { 'tier-1': 1 },
    activeMembers: 0,
    lastTapTimestamp: 0,
    recentTapRate: 0,
    isReady: false,
  },
  'team-3': {
    id: 'team-3',
    name: '인도(3모둠)',
    color: '#D97706', // Amber
    score: 0,
    tapCount: 0,
    currentUpgradeId: 'tier-1',
    upgradesPurchased: { 'tier-1': 1 },
    activeMembers: 0,
    lastTapTimestamp: 0,
    recentTapRate: 0,
    isReady: false,
  },
  'team-4': {
    id: 'team-4',
    name: '일본(4모둠)',
    color: '#059669', // Emerald
    score: 0,
    tapCount: 0,
    currentUpgradeId: 'tier-1',
    upgradesPurchased: { 'tier-1': 1 },
    activeMembers: 0,
    lastTapTimestamp: 0,
    recentTapRate: 0,
    isReady: false,
  },
  'team-5': {
    id: 'team-5',
    name: '프랑스(5모둠)',
    color: '#7C3AED', // Purple
    score: 0,
    tapCount: 0,
    currentUpgradeId: 'tier-1',
    upgradesPurchased: { 'tier-1': 1 },
    activeMembers: 0,
    lastTapTimestamp: 0,
    recentTapRate: 0,
    isReady: false,
  },
  'team-6': {
    id: 'team-6',
    name: '영국(6모둠)',
    color: '#0891B2', // Cyan
    score: 0,
    tapCount: 0,
    currentUpgradeId: 'tier-1',
    upgradesPurchased: { 'tier-1': 1 },
    activeMembers: 0,
    lastTapTimestamp: 0,
    recentTapRate: 0,
    isReady: false,
  },
};
