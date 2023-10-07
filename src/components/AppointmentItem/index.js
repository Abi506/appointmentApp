// Write your code here
import './index.css'

const AppointmentItems = props => {
  const {appointments, starIconClicked} = props
  const {title, date, appointmentId, isStarred} = appointments

  const starClicked = () => {
    starIconClicked(appointmentId)
  }
  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment">
      <div>
        <h1 className="appointment-title">{title}</h1>
        <p className="appointment-date">{date}</p>
      </div>
      <div>
        <button
          data-testid="star"
          type="button"
          className="star-button"
          onClick={starClicked}
        >
          <img src={imageUrl} alt="star" className="star-image" />
        </button>
      </div>
    </li>
  )
}
export default AppointmentItems
