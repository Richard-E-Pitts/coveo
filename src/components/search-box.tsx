import { SearchBox as HeadlessSearchBox } from '@coveo/headless';
import { FunctionComponent, useEffect, useState } from 'react';

interface SearchBoxProps
{
  controller: HeadlessSearchBox;
}

export const SearchBox: FunctionComponent<SearchBoxProps> = (props) =>
{
  const { controller } = props;
  const [focused, setFocused] = useState(false);
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) =>
        {
          if (e.key === 'Enter')
          {
            controller.submit();
          } else if (e.key === 'Escape')
          {
            controller.clear();
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      <button onClick={() => controller.submit()}>Search</button>




      <button onClick={() => controller.clear()}>Clear</button>

      {focused && state.suggestions.length > 0 && (
        <ul>
          {state.suggestions.map((suggestion) =>
          {
            return (
              <li
                style={suggestionStyle}
                key={suggestion.rawValue}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => controller.selectSuggestion(suggestion.rawValue)}
                dangerouslySetInnerHTML={{ __html: suggestion.highlightedValue }}
              ></li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
