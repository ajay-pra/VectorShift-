// draggableNode.js
import './style/draggableNode.css'
import inputIcon from './images/input.svg';
import outputIcon from './images/output.svg';
import llmIcon from './images/llm.svg';
import textIcon from './images/text.svg';
import apiRequest from './images/apiRequest.svg';
import APIResponse from './images/apiResponse.svg';
import dbIcon from './images/db.svg';
import filterIcon from './images/filter.svg';
import emailIcon from './images/email.svg';

const getIconUrl = (type) => {
  if (type === 'customInput') return inputIcon;
  if (type === 'customOutput') return outputIcon;
  if (type === 'llm') return llmIcon;
  if (type === 'text') return textIcon;
  if (type === 'APIResponse') return APIResponse;
  if (type === 'APIRequest') return apiRequest;
  if (type === 'FilterNode') return filterIcon;
  if (type === 'DBNode') return dbIcon;
  if (type === 'EmailNode') return emailIcon;
};

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        id={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          
        }}
        className="DraggableNode" 
        draggable
      > <img
        src={getIconUrl(type)}
        alt={label}
        style={{ width: '24px', height: '24px' }}
      />
          <span>{label}</span>
      </div>
    );
  };
  