import React from 'react'

const Prueba = () => {
    return (
        <form>
            <div className="row">
                <div className="col">
                <label >First name</label>
                <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="col">
                <label >Last name</label>
                <input type="text" className="form-control" placeholder="Last name" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                <label >Username</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text" >@</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Username" />
                </div>
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-6 mb-3">
                <label>City</label>
                <input type="text" className="form-control"  placeholder="City"  />
                </div>
                <div className="col-md-3 mb-3">
                <label>State</label>
                <input type="text" className="form-control"  placeholder="State" />
                </div>
                <div className="col-md-3 mb-3">
                <label>Zip</label>
                <input type="text" className="form-control"  placeholder="Zip"   />
                </div>
            </div>
            <div className="form-group">
                <div className="form-check">
                <input className="form-check-input" type="checkbox"  />
                <label className="form-check-label" >
                    Agree to terms and conditions
                </label>
                </div>
            </div>
        </form>
    )
}

export default Prueba
