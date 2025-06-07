export default function Label({ title, ariaLabel = '', className = '', icon}) {
  return (
    <div className="flex gap-3 justify-start items-center">
      {icon}
      <label className={`font-semibold ${className}`} aria-label={ariaLabel}>{title}</label>
    </div>
  )
}

