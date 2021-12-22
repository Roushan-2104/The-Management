import User from '../assets/user.svg'
import Online from './Online'

export default function Modal() {
    return (
        <div>
            <button className="btn btn-primary-outline text-center" style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#Users">
                <img src={User} alt='users' />
                <p>Users</p>
            </button>
            <div
        className="modal fade" 
        id="Users"
        tabIndex="-1"
        aria-labelledby="modal-title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-scrollable">
          <div className="modal-content">
            <div className="text-end">
              <button
                type="button"
                className="btn-close m-3"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <Online/>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}
