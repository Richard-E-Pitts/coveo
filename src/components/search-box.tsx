import {SearchBox as HeadlessSearchBox} from '@coveo/headless';
import {FunctionComponent, useEffect, useState} from 'react';

interface SearchBoxProps {
  controller: HeadlessSearchBox;
}

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) => {
  const {controller} = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => setState(controller.state)), [
    controller,
  ]);

  const suggestionStyle = {
    cursor: 'pointer',
  };
  
  return (
     <div className="search-box">
       <input
         value={state.value}
         onChange={(e) => controller.updateText(e.target.value)}
         onKeyDown={(e) => e.key === 'Enter' && controller.submit()}
       />
       {state.suggestions.length > 0 && (
         <ul>
           {state.suggestions.map((suggestion) => {
             const value = suggestion.rawValue;
             return (
               <li
                 style={suggestionStyle}
                 key={value}
                 onClick={() => controller.selectSuggestion(value)}
               >
                  {value}
               </li>
             );
           })}
         </ul>
       )}
     </div>
   );
          }
