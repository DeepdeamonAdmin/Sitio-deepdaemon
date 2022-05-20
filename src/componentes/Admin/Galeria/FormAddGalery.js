import React from 'react'

export const FormAddGalery = () => {
	return (
		<form>
			<div className="form-row">
				<div className="col-md-4 mb-3">
					<label >First name</label>
					<input type="text" className="form-control" placeholder="First name" />
				</div>
				<div className="col-md-4 mb-3">
					<label >Last name</label>
					<input type="text" className="form-control" placeholder="Last name" />
				</div>
				<div className="col-md-4 mb-3">
					<label >Username</label>
					<div className="input-group">
						<div className="input-group-prepend">
							<span className="input-group-text" >@</span>
						</div>
						<input type="text" className="form-control" placeholder="Username" />
					</div>
				</div>
			</div>
		</form>
	)
}
