import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ChevronDown, Check } from 'lucide-react';

// --- Animations ---

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// --- Styled Components ---

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button`
  width: 100%;
  padding: 0.8rem 2.5rem 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid ${({ $open }) => ($open ? '#1e3a8a' : '#d1d5db')};
  box-shadow: ${({ $open }) => ($open ? '0 0 0 3px rgba(30,58,138,.1)' : 'none')};
  font-size: 0.95rem;
  color: #111827;
  background: white;
  text-align: left;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;

  &:hover { border-color: #93a3bf; }
`;

const Arrow = styled(ChevronDown)`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.25s ease;
  color: #6b7280;
  pointer-events: none;
`;

const List = styled.ul`
  position: absolute;
  z-index: 50;
  width: 100%;
  margin: 6px 0 0;
  padding: 4px 0;
  list-style: none;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  animation: ${slideDown} 0.15s ease;
  max-height: 260px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  font-size: 0.92rem;
  color: ${({ $active }) => ($active ? '#1e3a8a' : '#374151')};
  background: ${({ $active }) => ($active ? '#eff3ff' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: background 0.12s;

  &:hover { background: ${({ $active }) => ($active ? '#e0e7ff' : '#f3f4f6')}; }
`;

/**
 * @param {{ options: {value:string, label:string}[], value: string, onChange: (v:string)=>void, placeholder?: string }} props
 *
 * options  — [{ value, label }] 배열
 * value    — 현재 선택된 value
 * onChange — 선택 시 호출되는 콜백
 */
const Dropdown = ({ options, value, onChange, placeholder = '선택하세요' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // 키보드 접근성: Escape로 닫기
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setOpen(false);
  };

  const selected = options.find((o) => o.value === value);

  return (
    <Wrapper ref={ref} onKeyDown={handleKeyDown}>
      <Trigger type="button" $open={open} onClick={() => setOpen((p) => !p)}>
        {selected?.label ?? placeholder}
      </Trigger>
      <Arrow size={18} $open={open} />

      {open && (
        <List role="listbox">
          {options.map((o) => (
            <Item
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              $active={o.value === value}
              onClick={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
              {o.value === value && <Check size={16} />}
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
};

export default Dropdown;
