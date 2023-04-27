export interface SegmentedControlOption {
  label: string;
  value: string;
  onClick: () => void;
}

export interface SegmentedControlOptions {
  buttons: SegmentedControlOption[];
  active: string;
}
const SegmentedControl = ({
  options,
}: {
  options: SegmentedControlOptions;
}) => (
  <div className="flex h-10 w-min rounded-lg border border-gray-500 px-0.5 py-0.5">
    {options.buttons.map((item, index) => (
      <div
        className={`flex h-full cursor-pointer items-center justify-center rounded-md px-4
				 ${options.active === item.value ? 'bg-gray-600' : ''}`}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        onClick={item.onClick}
      >
        <p className="font-medium">{item.label}</p>
      </div>
    ))}
  </div>
);

export default SegmentedControl;
