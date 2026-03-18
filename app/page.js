"use client";
 
import { useState } from 'react';

// 사전 합의된 더미 데이터 (데이터베이스 스키마 프로토타입)
const DUMMY_ARCHIVES = [
  {
    id: "photo_001",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop", 
    title: "1980년대 구갈동 마을 잔치",
    year: "1985",
    location: "기흥구 구갈동",
    donor: "김용인",
    tags: ["마을잔치"]
  },
  {
    id: "photo_002",
    imageUrl: "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=600&auto=format&fit=crop", 
    title: "김씨 가문 전통 혼례식",
    year: "1978",
    location: "처인구 김량장동",
    donor: "이시민",
    tags: ["전통혼례", "가족"]
  },
  {
    id: "photo_003",
    imageUrl: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=600&auto=format&fit=crop", 
    title: "용인초등학교 제 50회 졸업식",
    year: "1992",
    location: "처인구",
    donor: "박기록",
    tags: ["학교", "졸업식"]
  }
];
// End of DUMMY_ARCHIVES data structure

export default function Home() {
  // 상태 관리: 현재 선택된 카테고리 (초기값: '전체')
  const [selectedTag, setSelectedTag] = useState('전체');

  // 추출 로직: 더미 데이터에서 존재하는 모든 태그를 중복 없이 추출하여 필터 버튼 구성
  const allTags = ['전체', ...new Set(DUMMY_ARCHIVES.flatMap(item => item.tags))];

  // 필터 로직: 선택된 태그에 맞춰 사진 배열을 걸러냄
  const filteredArchives = selectedTag === '전체' 
    ? DUMMY_ARCHIVES 
    : DUMMY_ARCHIVES.filter(item => item.tags.includes(selectedTag));

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* 1. Header Area */}
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">용인 옛 사진전 : 옷장 속 사진첩</h1>
        <p className="text-lg text-gray-600">시민의 기억이 모여 지역의 역사가 됩니다.</p>
      </header>

      {/* 2. Filter Area */}
      <section className="max-w-6xl mx-auto mb-10 flex flex-wrap gap-3 justify-center">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${selectedTag === tag 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
          >
            {tag}
          </button>
        ))}
      </section>

      {/* 3. Gallery Grid Area (HTML/CSS 레벨의 방어적 레이아웃 적용) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredArchives.map((archive) => (
          <article key={archive.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
            {/* 이미지 영역 (비율 고정) */}
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
              <img 
                src={archive.imageUrl} 
                alt={archive.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 메타데이터 텍스트 영역 */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{archive.title}</h2>
              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p><span className="font-semibold">촬영:</span> {archive.year}년 / {archive.location}</p>
                <p><span className="font-semibold">기증:</span> {archive.donor}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {archive.tags.map(t => (
                  <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
// End of Home
