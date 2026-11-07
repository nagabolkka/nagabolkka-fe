import startRoom from "../assets/images/regions/1-start-room.png";
import startRoomRain from "../assets/images/regions/1-start-room-rain.png";
import windForest from "../assets/images/regions/2-wind-forest.png";
import windForestRain from "../assets/images/regions/2-wind-forest-rain.png";
import discoveryVillage from "../assets/images/regions/3-discovery-village.png";
import discoveryVillageRain from "../assets/images/regions/3-discovery-village-rain.png";
import meetingGarden from "../assets/images/regions/4-meeting-garden.png";
import meetingGardenRain from "../assets/images/regions/4-meeting-garden-rain.png";
import newWorld from "../assets/images/regions/5-new-world.png";
import newWorldRain from "../assets/images/regions/5-new-world-rain.png";

export const REGIONS = [
  { stageNo: 1, name: "시작의 방", realLabel: "집 안", pieceFamily: "빛의 조각", color: "#E8C06A",
    imageUrl: startRoom, rainyImageUrl: startRoomRain },
  { stageNo: 2, name: "바람의 숲", realLabel: "문 앞", pieceFamily: "바람의 조각", color: "#9DD49A",
    imageUrl: windForest, rainyImageUrl: windForestRain },
  { stageNo: 3, name: "발견의 마을", realLabel: "동네", pieceFamily: "발견의 조각", color: "#7FCDE6",
    imageUrl: discoveryVillage, rainyImageUrl: discoveryVillageRain },
  { stageNo: 4, name: "만남의 정원", realLabel: "사람 곁", pieceFamily: "마음의 조각", color: "#F2A7C3",
    imageUrl: meetingGarden, rainyImageUrl: meetingGardenRain },
  { stageNo: 5, name: "새로운 세상", realLabel: "사회 연결", pieceFamily: "희망의 조각", color: "#BFB2F2",
    imageUrl: newWorld, rainyImageUrl: newWorldRain },
];

export const getRegion = (stageNo) =>
  REGIONS.find((region) => region.stageNo === stageNo) ?? REGIONS[0];

export const getPathRegions = (currentStageNo, restoration) =>
  REGIONS.map((region) => {
    const { stageNo } = region;
    const isCurrent = stageNo === currentStageNo;

    if (stageNo < currentStageNo) return { ...region, status: "COMPLETED", isCurrent };
    if (isCurrent)
      return { ...region, status: restoration === 100 ? "COMPLETED" : "ACTIVE", isCurrent };
    return { ...region, status: "LOCKED", isCurrent };
  });