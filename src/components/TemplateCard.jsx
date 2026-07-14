export default function TemplateCard({ template, onSelect, index }) {
  return (
    <div className="meme-item">
      <p className={`meme-item-title ${index === 0 ? 'meme-item-title--first' : ''}`}>
        {template.name}
      </p>
      <img
        src={template.url}
        alt={template.name}
        className="meme-item-img"
        loading="lazy"
      />
      <button
        className="meme-item-btn"
        onClick={() => onSelect(template)}
      >
        Add Caption
      </button>
    </div>
  )
}