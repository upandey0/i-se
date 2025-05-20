import React, { useState } from 'react';

type RangeSliderProps = {
  min: number;
  max: number;
  step: number;
  value: { min: number; max: number };
  onChange: (value: { min: number; max: number }) => void;
  formatValue?: (value: number) => string;
};

export const RangeSlider: React.FC<RangeSliderProps> = ({ 
  min, 
  max, 
  step, 
  value, 
  onChange, 
  formatValue = (val) => val.toString() 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const [inputValues, setInputValues] = useState({
    min: value.min.toString(),
    max: value.max.toString()
  });

  React.useEffect(() => {
    setInputValues({
      min: value.min.toString(),
      max: value.max.toString()
    });
  }, [value.min, value.max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const fieldName = e.target.name;
    
    setInputValues({
      ...inputValues,
      [fieldName]: newValue
    });
  };
  
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    const fieldName = e.target.name as 'min' | 'max';
    
    if (isNaN(newValue)) {
      setInputValues({
        ...inputValues,
        [fieldName]: value[fieldName].toString()
      });
      return;
    }
    
    if (fieldName === 'min') {
      const validMin = Math.min(newValue, value.max);
      onChange({ min: validMin, max: value.max });
    } else {
      const validMax = Math.max(Math.min(newValue, max), value.min);
      onChange({ min: value.min, max: validMax });
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };
  
  const handleRangeChange = (e: { target: { value: string; name: any; }; }) => {
    const newValue = parseInt(e.target.value, 10);
    const fieldName = e.target.name;
    
    if (fieldName === 'min') {
      onChange({ min: Math.min(newValue, value.max), max: value.max });
    } else {
      onChange({ min: value.min, max: Math.max(newValue, value.min) });
    }
  };
  
  const minPercent = ((value.min - min) / (max - min)) * 100;
  const maxPercent = ((value.max - min) / (max - min)) * 100;
  
  return (
    <div className="space-y-4">
      {/* Input fields for precise control */}
      <div className="flex justify-between">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400">Min</label>
          <input
            type="text"
            name="min"
            value={inputValues.min}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleKeyPress}
            className="w-24 p-1 mt-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400">Max</label>
          <input
            type="text"
            name="max"
            value={inputValues.max}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleKeyPress}
            className="w-24 p-1 mt-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
          />
        </div>
      </div>
      
      {/* Custom dual range slider */}
      <div className="relative h-6">
        {/* Min range input */}
        <input
          type="range"
          name="min"
          min={min}
          max={max}
          step={step}
          value={value.min}
          onChange={handleRangeChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute z-10 w-full appearance-none bg-transparent cursor-pointer pointer-events-none opacity-0"
          style={{ height: '24px' }}
        />
        
        {/* Max range input */}
        <input
          type="range"
          name="max"
          min={min}
          max={max}
          step={step}
          value={value.max}
          onChange={handleRangeChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="absolute z-20 w-full appearance-none bg-transparent cursor-pointer pointer-events-none opacity-0"
          style={{ height: '24px' }}
        />
        
        {/* Range track background */}
        <div className="absolute top-2.5 z-0 w-full h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-200">
          {/* Active range area */}
          <div
            className="absolute h-full bg-blue-500 dark:bg-blue-600 rounded-full transition-all duration-200"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          ></div>
          
          {/* Min thumb */}
          <div
            className={`absolute w-5 h-5 bg-white dark:bg-gray-200 border border-gray-300 dark:border-gray-500 rounded-full shadow -mt-1.5 -ml-2.5 transition-all duration-100 ${isDragging ? 'scale-110' : ''}`}
            style={{ left: `${minPercent}%` }}
          ></div>
          
          {/* Max thumb */}
          <div
            className={`absolute w-5 h-5 bg-white dark:bg-gray-200 border border-gray-300 dark:border-gray-500 rounded-full shadow -mt-1.5 -ml-2.5 transition-all duration-100 ${isDragging ? 'scale-110' : ''}`}
            style={{ left: `${maxPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};