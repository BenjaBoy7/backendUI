import React from 'react'

function Edit() {
    return (
        <div>
            <div class="container-fluid">
                <div class="row page-titles">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item active"><a href="javascript:void(0)">Form</a></li>
                            <li class="breadcrumb-item"><a href="javascript:void(0)">Element</a></li>
                        </ol>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Edit Property Type</h4>
                                </div>
                                <div class="card-body">
                                    <div class="basic-form">
                                        <form>
                                            <div class="mb-3">
                                                <input type="text" class="form-control input-default " placeholder="input-default" />
                                            </div>
                                            <div class="mb-3">
                                                <input type="text" class="form-control input-rounded" placeholder="input-rounded" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Edit
