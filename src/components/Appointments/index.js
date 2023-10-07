// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItems from '../AppointmentItem'
import './index.css'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: initialAppointmentList,
    starredClicked: false,
    withoutfilterList: initialAppointmentList,
  }

  formSubmission = event => {
    const {title, date, appointmentList} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    event.preventDefault()
    const newAppointment = {
      appointmentId: uuidv4(),
      title,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      withoutfilterList: [...prevState.withoutFilteredList, newAppointment],
      title: '',
      date: '',
    }))
  }

  titleEvent = event => {
    this.setState({title: event.target.value})
  }

  dateEvent = event => {
    this.setState({date: event.target.value})
  }

  starIconClicked = appointmentId => {
    const {appointmentList} = this.state

    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (eachItem.appointmentId === appointmentId) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  filterButtonClicked = () => {
    const {appointmentList, starredClicked, withoutfilterList} = this.state
    if (starredClicked === false) {
      const filteredData = appointmentList.filter(
        each => each.isStarred === true,
      )
      this.setState({withoutfilterList: appointmentList})
      this.setState({appointmentList: filteredData, starredClicked: true})
    } else {
      this.setState({appointmentList: withoutfilterList, starredClicked: false})
    }
  }

  render() {
    const {title, date, appointmentList} = this.state

    return (
      <div className="bg-container">
        <div className="appointment-card-container">
          <div className="appointment-section-container">
            <form onSubmit={this.formSubmission} className="form-container">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="common">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="common-inputs"
                onChange={this.titleEvent}
                value={title}
              />
              <label htmlFor="date" className="common">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="common-inputs"
                value={date}
                onChange={this.dateEvent}
              />
              <div className="button-container">
                <button type="submit" className="button-styles">
                  Add
                </button>
              </div>
              <hr className="separator" />
            </form>
            <div className="bg-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="bg-image"
              />
              <hr className="separator-2" />
            </div>
          </div>
          <div className="appointment-container">
            <div className="appointment-header">
              <h1 className="heading">Appointment</h1>
              <div className="starred-button-container">
                <button
                  className="starred-button-styles"
                  type="button"
                  onClick={this.filterButtonClicked}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul className="appointment-list">
              {appointmentList.map(eachAppointment => (
                <AppointmentItems
                  appointments={eachAppointment}
                  key={eachAppointment.appointmentId}
                  starIconClicked={this.starIconClicked}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
