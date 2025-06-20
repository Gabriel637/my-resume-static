import { useI18n, type SupportedLanguage } from "../contexts/i18nContext";

const ToggleLanguageButton = () => {
  const { language, setLanguage } = useI18n();

  return (
    <select
      defaultValue={language}
      onChange={(e) => setLanguage(e.currentTarget.value as SupportedLanguage)} className="select"
    >
      <option value="en">EN</option>
      <option value="pt">PT</option>
      <option value="es">ES</option>
    </select>
  )
}

export default ToggleLanguageButton;