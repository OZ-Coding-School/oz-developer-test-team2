# 개발자 성격 테스트 데이터 구조

## 📁 파일 구조

```
/src/app/data/
├── index.ts                    # 중앙 export 파일
├── types.ts                    # TypeScript 타입 정의
├── questions.json              # 질문 리스트 데이터
├── developerResults.json       # 개발자 타입별 결과 데이터
└── developerTypes.ts           # 결과 데이터 로더 (하위 호환성 유지)
```

---

## 📝 데이터 타입

### DeveloperType
8가지 개발자 타입을 정의하는 유니온 타입입니다.

```typescript
type DeveloperType = 
  | 'frontend'    // 프론트엔드 벌
  | 'backend'     // 백엔드 코끼리
  | 'fullstack'   // 풀스택 코알라
  | 'data'        // 데이터 펭귄
  | 'mobile'      // 모바일 병아리
  | 'devops'      // 데브옵스 물개
  | 'gamedev'     // 게임 개발 새
  | 'ai';         // AI 개발 나무늘보
```

### Question
테스트 질문의 구조입니다.

```typescript
interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

interface QuestionOption {
  text: string;
  type: DeveloperType;
}
```

### DeveloperResult
각 개발자 타입의 결과 정보 구조입니다.

```typescript
interface DeveloperResult {
  type: DeveloperType;
  emoji: string;
  name: string;
  title: string;
  description: string;
  characteristics: string[];
  hashtags: string[];
}
```

---

## 📄 JSON 데이터 구조

### questions.json
5개의 질문이 담긴 배열입니다. 각 질문은 2개의 선택지를 가지며, 각 선택지는 특정 개발자 타입과 연결됩니다.

```json
[
  {
    "id": 1,
    "text": "새로운 프로젝트를 시작할 때 가장 먼저 하는 일은?",
    "options": [
      {
        "text": "사용자가 볼 화면부터 디자인한다",
        "type": "frontend"
      },
      {
        "text": "데이터베이스 구조를 먼저 설계한다",
        "type": "backend"
      }
    ]
  }
  // ... 4개의 질문 더
]
```

### developerResults.json
8가지 개발자 타입의 결과 정보를 담은 객체입니다.

```json
{
  "frontend": {
    "type": "frontend",
    "emoji": "🐹✨",
    "name": "프론트엔드 벌",
    "title": "예쁜 걸 사랑하는 디자이너 벌",
    "description": "사용자가 보는 화면을...",
    "characteristics": [
      "디테일에 강한 관찰력을 가지고 있다",
      "UI/UX에 대한 감각이 뛰어나다",
      // ...
    ],
    "hashtags": ["#React", "#CSS", "#디자인", "#UI", "#사용자경험"]
  }
  // ... 7개의 타입 더
}
```

---

## 🔧 사용법

### 타입과 데이터 import

```typescript
// 타입만 import
import type { DeveloperType, Question, DeveloperResult } from '@/app/data/types';

// 또는 중앙 export에서 import
import type { DeveloperType, Question, DeveloperResult } from '@/app/data';

// 데이터 import
import { developerResults } from '@/app/data/developerTypes';
// 또는
import { developerResults } from '@/app/data';

// JSON 직접 import
import questionsData from '@/app/data/questions.json';
import developerResultsData from '@/app/data/developerResults.json';
```

### 컴포넌트에서 사용 예시

```typescript
import type { Question, DeveloperType } from '@/app/data/types';
import questionsData from '@/app/data/questions.json';

const questions: Question[] = questionsData as Question[];

function QuestionScreen({ questionNumber }: { questionNumber: number }) {
  const question = questions[questionNumber];
  
  return (
    <div>
      <h2>{question.text}</h2>
      {question.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option.type)}>
          {option.text}
        </button>
      ))}
    </div>
  );
}
```

```typescript
import type { DeveloperType } from '@/app/data/types';
import { developerResults } from '@/app/data';

function ResultScreen({ resultType }: { resultType: DeveloperType }) {
  const result = developerResults[resultType];
  
  return (
    <div>
      <h1>{result.name}</h1>
      <h2>{result.title}</h2>
      <p>{result.description}</p>
      <ul>
        {result.characteristics.map((char, i) => (
          <li key={i}>{char}</li>
        ))}
      </ul>
      <div>
        {result.hashtags.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
      </div>
    </div>
  );
}
```

---

## 🎯 데이터 수정 가이드

### 질문 추가/수정
`questions.json` 파일을 수정합니다.

1. 새 질문 추가 시 `id`는 순차적으로 증가
2. 각 질문은 2개의 `options` 배열을 가져야 함
3. 각 옵션의 `type`은 반드시 `DeveloperType` 중 하나여야 함

### 결과 타입 추가/수정
`developerResults.json` 파일을 수정합니다.

1. 새 개발자 타입 추가 시:
   - `types.ts`에 `DeveloperType`에 새 타입 추가
   - `developerResults.json`에 해당 타입의 데이터 추가
   - 아이콘 매핑 (`utils/iconMapper.tsx`) 업데이트

2. 기존 타입 수정 시:
   - `developerResults.json`에서 해당 키의 데이터만 수정
   - 반드시 모든 필수 필드를 포함해야 함

---

## ✅ 데이터 검증

TypeScript 타입 시스템이 자동으로 데이터를 검증합니다:

- 질문의 옵션 타입이 `DeveloperType`인지 확인
- 결과 객체가 필수 필드를 모두 포함하는지 확인
- 배열과 객체 구조가 올바른지 확인

---

## 🔄 마이그레이션 참고

기존 컴포넌트에서 `App.tsx`의 타입을 사용하고 있다면:

**Before:**
```typescript
import type { DeveloperType } from '../App';
```

**After:**
```typescript
import type { DeveloperType } from '../data/types';
// 또는
import type { DeveloperType } from '../data';
```

이 변경은 하위 호환성을 유지하며, 기존 코드도 정상 작동합니다.