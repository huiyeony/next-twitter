export const getMockPosts = () => {
  const mockPosts = [
    {
      id: "1",
      title: "봄에 교토에서 추천하는 관광 명소",
      content:
        "교토는 봄이 되면 벚꽃이 만발하여 많은 관광객들로 붐빕니다. 특히 철학의 길과 마루야마 공원은 벚꽃의 명소로 유명합니다. 또, 봄의 쿄토에서는...",
      username: "user1",
      createdAt: "2025-04-01T09:15:00",
      category: "travel",
      imageUrl: "/images/kyoto-spring.jpg",
      likes: 128,
      comments: 24,
      isLiked: false,
      tags: ["교토", "봄", "관광", "벚꽃"],
    },
    {
      id: "2",
      title: "수제 된장 만드는 법 가이드",
      content:
        "일본의 전통 조미료인 된장은 가정에서도 쉽게 만들 수 있습니다. 재료는 콩, 쌀누룩, 소금뿐입니다. 먼저 콩을 하룻밤 물에 담그고...",
      username: "user2",
      createdAt: "2025-04-03T14:30:00",
      category: "food",
      imageUrl: "/images/homemade-miso.jpg",
      likes: 95,
      comments: 18,
      isLiked: true,
      tags: ["요리", "된장", "레시피", "전통"],
    },
    {
      id: "3",
      title: "일본 현대 미술의 최신 트렌드",
      content:
        "도쿄를 중심으로 일본의 현대 미술 장면은 활황을 보이고 있습니다. 젊은 아티스트들은 전통과 혁신을 융합한 작품을 차례로 발표하고...",
      username: "user3",
      createdAt: "2025-04-05T18:45:00",
      category: "culture",
      imageUrl: "/images/japan-art.jpg",
      likes: 76,
      comments: 14,
      isLiked: false,
      tags: ["아트", "미술관", "전시회", "도쿄"],
    },
    {
      id: "4",
      title: "새로운 AI 기술이 일본의 의료를 바꾼다",
      content:
        "인공지능(AI) 기술의 진보로 일본의 의료 분야에서도 큰 변혁이 일어나고 있습니다. 특히 화상 진단 분야에서는, AI가 의사의 진단을 서포트...",
      username: "user4",
      createdAt: "2025-04-07T11:20:00",
      category: "news",
      likes: 112,
      comments: 31,
      isLiked: true,
      tags: ["AI", "기술", "의료", "혁신"],
    },
    {
      id: "5",
      title: "일본의 사계절을 느끼는 정원디자인",
      content:
        "일본 정원은 사계절의 변화를 능숙하게 도입해, 방문하는 사람에게 계절감을 즐겁게 할 궁리가 되어 있습니다. 봄에는 벚꽃과 躑躅, 여름에는 푸른 단풍, 가을에는 단풍, 겨울에는 설경과...",
      username: "user5",
      createdAt: "2025-04-10T15:10:00",
      category: "culture",
      imageUrl: "/images/japanese-garden.jpg",
      likes: 84,
      comments: 9,
      isLiked: false,
      tags: ["庭園", "四季", "デザイン", "自然"],
    },
  ];
  return mockPosts;
};
