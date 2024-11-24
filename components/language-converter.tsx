import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const LOCALES = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Arabic",
    value: "ar",
  },
];

interface LanguageConverterProps {
  isSidebar: boolean;
}

const LanguageConverter = ({ isSidebar }: LanguageConverterProps) => {
  return (
    <Select>
      <SelectTrigger
        className={cn(
          "max-w-[100px] mr-2",
          !isSidebar ? "text-white border-0" : ""
        )}
      >
        <SelectValue placeholder="English" />
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((locale) => (
          <SelectItem
            value={locale.value}
            key={locale.value}
            className="text-sm "
          >
            {locale.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageConverter;
