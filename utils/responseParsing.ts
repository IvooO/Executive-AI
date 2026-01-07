
import { UIAction } from '../types';

export const parseAIResponse = (text: string): { content: string; uiActions?: UIAction[] } => {
  let content = text;
  const uiActions: UIAction[] = [];
  let actionCounter = 0;

  // Helper to generate IDs
  const getID = (label?: string) => {
      actionCounter++;
      return label ? `${label.replace(/\s+/g, '_')}_${actionCounter}` : `action_${actionCounter}`;
  }

  // 1. Extract SLIDERS: [SLIDER: Label | Min | Max]
  // We use a loop to find all occurrences
  const sliderRegex = /\[SLIDER:\s*(.*?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\]/gi;
  let sliderMatch;
  while ((sliderMatch = sliderRegex.exec(text)) !== null) {
      uiActions.push({
          id: getID(sliderMatch[1]),
          type: 'SLIDER',
          label: sliderMatch[1].trim(),
          min: parseInt(sliderMatch[2]),
          max: parseInt(sliderMatch[3])
      });
  }
  content = content.replace(sliderRegex, '').trim();

  // 2. Extract CHOICE: [CHOICE: Option1 | Option2]
  // Note: Sometimes prompts have "Label: [CHOICE...]"
  // The regex finds the bracketed part.
  const choiceRegex = /\[CHOICE:\s*(.*?)\]/gi;
  let choiceMatch;
  while ((choiceMatch = choiceRegex.exec(text)) !== null) {
      const options = choiceMatch[1].split('|').map(s => s.trim());
      // Try to find a label preceding the choice in the text? 
      // Simplified: We assume context is in the text. We'll use the first option as part of ID if no label logic.
      uiActions.push({
          id: getID(options[0]),
          type: 'CHOICE',
          options
      });
  }
  content = content.replace(choiceRegex, '').trim();

  // 3. Extract SELECT: [SELECT: Label | Option1 | Option2]
  const selectRegex = /\[SELECT:\s*(.*?)\]/gi;
  let selectMatch;
  while ((selectMatch = selectRegex.exec(text)) !== null) {
      const parts = selectMatch[1].split('|').map(s => s.trim());
      uiActions.push({
          id: getID(parts[0]),
          type: 'SELECT',
          label: parts[0],
          options: parts.slice(1)
      });
  }
  content = content.replace(selectRegex, '').trim();

  return { content, uiActions: uiActions.length > 0 ? uiActions : undefined };
};
