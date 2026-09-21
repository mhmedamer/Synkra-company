/**------------------------------------------------------------------------
 *                           Import files and libraries
 *------------------------------------------------------------------------**/
import { useState } from 'react';
import DownDir from './QuestionsAssets/down-dir.svg?react';
import DropDown from './QuestionsAssets/Dropdown.svg?react';

export default function QuestionCard(info) {
  let [showAns, setShowAns] = useState(false);
  function toggleBtn() {
    setShowAns(!showAns);
  }
  return (
    <div>
      <div className="question-card">
        <p
          className="card-question"
          style={{
            background: showAns
              ? 'var(--avatar-gray-bg)'
              : ' var( --color-text-cta)',
          }}
        >
          {info.question}
          <button
            onClick={toggleBtn}
            style={{
              background: showAns
                ? 'var(--avatar-gray-bg)'
                : ' var( --color-text-cta)',
            }}
          >
            {showAns ? (
              <DropDown className="dropdown-icon" />
            ) : (
              <DownDir className="dropdown-icon" />
            )}
          </button>
        </p>
        <p
          className="card-answer"
          style={{ display: showAns ? ' block' : 'none' }}
        >
          {info.answer.split(' ').map((element, index) => (
            <span
              key={index}
              style={{
                fontStyle: element === 'Synkra' ? 'italic' : 'normal',
                fontWeight: element === 'Synkra' ? '700' : '400',
                fontSize: element === 'Synkra' ? '25px' : '22px',
              }}
            >
              {element}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
