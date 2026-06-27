import './FacultyGrid.css'

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function FacultyGrid({ faculty = [] }) {
  return (
    <div className="faculty-grid">
      {faculty.map((person, index) => (
        <article className={`faculty-card bento-card ${index === 0 ? 'is-featured' : ''}`} key={person.name}>
          {person.image ? (
            <img className="faculty-avatar" src={person.image} alt={person.name} />
          ) : (
            <span className="faculty-avatar faculty-initials">{getInitials(person.name)}</span>
          )}
          <div>
            <h3>{person.name}</h3>
            <p>{person.bio}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export default FacultyGrid
