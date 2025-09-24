import  { useState, useEffect } from 'react';

type Props = {
  value: string | number;
  originalValue?: string | number;
  onChange: (value: string) => void;
};

export default function EditableCell({ value, originalValue, onChange }: Props) {
  const [local, setLocal] = useState(String(value ?? ''));

  useEffect(() => setLocal(String(value ?? '')), [value]);

  const changed = String(originalValue ?? '') !== String(local);

  return (
    <input
      className={`w-full p-1 text-sm rounded border ${changed ? 'bg-yellow-100' : 'bg-white'}`}
      value={local}
      onChange={(e) => {
        setLocal(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
}
