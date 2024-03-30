import * as OutlineIcons from "@heroicons/react/outline";
import * as SolidIcons from "@heroicons/react/solid";

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface Props {
  icon: IconName;
  className?: string;
  outline?: boolean;
}
const HeroIcon = (props: Props): JSX.Element => {
  const { icon, className = "w-6 h-6 text-gray-600", outline = false } = props;

  const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon];

  return <Icon className={className} />;
};

export default HeroIcon;
