$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search)
    var TenantID = '';
    if (searchParams.has('Tenantfilter')) {
        TenantID = searchParams.get('Tenantfilter')
    }

    var todayDate = new Date().toISOString().slice(0, 10);
    $('.datatable-1').dataTable(
        {
            "scrollX": true,
            language: {
                paginate: {
                    next: '<i class="fas fa-arrow-right"></i>',
                    previous: '<i class="fas fa-arrow-left"></i>'
                }
            },
            "columnDefs": [
                { "className": "dt-center", "targets": [-1] },

            ],
            "deferRender": true,
            "pageLength": 50,
            responsive: true,
            "ajax": {

                "url": "/api/DomainAnalyser_List",
                "dataSrc": ""
            },
            dom: 'fBlrtip',
            buttons: [
                { extend: 'copyHtml5', className: 'btn btn-primary btn-sm' },
                { extend: 'excelHtml5', className: 'btn btn-primary btn-sm', title: 'Domain Analyser - ' + todayDate, exportOptions: { orthogonal: "export" } },
                { extend: 'csvHtml5', className: 'btn btn-primary btn-sm', title: 'Domain Analyser - ' + todayDate, exportOptions: { orthogonal: "export" } },
                { extend: 'pdfHtml5', className: 'btn btn-primary btn-sm', pageSize: 'A2', orientation: 'landscape', title: 'Domain Analyser - ' + todayDate, exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], orthogonal: "export" } },
                {
                    text: 'Force Refresh All Data',
                    className: 'btn btn-primary btn-sm',
                    action: function (e, dt, button, config) {
                        $('#APIContent').html('<center><label class="form-check-label" >Are you sure you want to force the Domain Analysis to run? This will slow down normal usage considerably. Please note: this runs at midnight automatically every day. <br /><br /></label><br><nothing class="APIConfirmed"><a href="/api/DomainAnalyser_OrchestrationStarter"><button id="Confirmed" class="btn btn-primary APIConfirmed">Yes</button></a></nothing><nothing class="APIDenied">  <button data-bs-dismiss="modal" class="btn btn-primary APIDenied">No</button></center>');

                        document.getElementById("PopModal").click();
                    }
                }
            ],
            "columns": [
                { "data": "Tenant" },
                { "data": "Domain" },
                { "data": "Score" },
                { "data": "MailProvider" },
                {
                    "data": "SPFPassTest",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === true) {
                                return 'PASS: SPF Present'
                            } else if (data === false) {
                                return 'FAIL: SPF Missing or Misconfigured'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === true) {
                            return '<h5><span class="badge bg-success">SPF Pass</span></h5>';
                        }
                        if (data === false) {
                            return '<h5><span class="badge bg-danger">SPF Fail</span></h5>';                            
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                {
                    "data": "MXPassTest",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === true) {
                                return 'PASS: MX Match Present'
                            } else if (data === false) {
                                return 'FAIL: MX Not Matching MS Recommendations'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === true) {
                            return '<h5><span class="badge bg-success">MX Pass</span></h5>';
                        }
                        if (data === false) {
                            return '<h5><span class="badge bg-danger">MX Fail</span></h5>';
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                {
                    "data": "DMARCPresent",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === true) {
                                return 'PASS: DMARC Record Present'
                            } else if (data === false) {
                                return 'FAIL: DMARC Not Present'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === true) {
                            return '<h5><span class="badge bg-success">DMARC Present</span></h5>';
                        }
                        if (data === false) {
                            return '<h5><span class="badge bg-danger">DMARC Missing</span></h5>';
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                {
                    "data": "DMARCActionPolicy",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === "Reject") {
                                return 'PASS: DMARC Set to Reject'
                            } else if (data === "Quarantine") {
                                return 'WARN: DMARC Quarantining Only'
                            } else if (data === "None") {
                                return 'FAIL: DMARC Reporting Only'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === "Reject") {
                            return '<h5><span class="badge bg-success">Reject</span></h5>'
                        } else if (data === "Quarantine") {
                            return '<h5><span class="badge bg-warning">Quarantine Only</span></h5>'
                        } else if (data === "None") {
                            return '<h5><span class="badge bg-danger">Report Only</span></h5>'
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                {
                    "data": "DMARCPercentagePass",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === true) {
                                return 'PASS: DMARC All Mail Fully Reported'
                            } else if (data === false) {
                                return 'FAIL: DMARC All Mail Not Considered'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === true) {
                            return '<h5><span class="badge bg-success">All Mail Analysed</span></h5>';
                        }
                        if (data === false) {
                            return '<h5><span class="badge bg-danger">Partial or None Analysed</span></h5>';
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                {
                    "data": "DNSSECPresent",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === true) {
                                return 'PASS: DNSSEC Present'
                            } else if (data === false) {
                                return 'FAIL: DNSSEC Not Enabled or Configured'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === true) {
                            return '<h5><span class="badge bg-success">DNSSEC Enabled</span></h5>';
                        }
                        if (data === false) {
                            return '<h5><span class="badge bg-danger">DNSSEC Disabled</span></h5>';
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                {
                    "data": "DKIMEnabled",
                    "render": function (data, type, row) {
                        if (type === "export" || type === "sort" || type === "filter") {
                            if (data === true) {
                                return 'PASS: DKIM Enabled'
                            } else if (data === false) {
                                return 'FAIL: DKIM not Present'
                            } else {
                                return 'No Data'
                            }
                        }
                        if (data === true) {
                            return '<h5><span class="badge bg-success">DKIM Enabled</span></h5>';
                        }
                        if (data === false) {
                            return '<h5><span class="badge bg-danger">DKIM Disabled</span></h5>';
                        } else {
                            return '<h5><span class="badge bg-secondary">No Data</span></h5>'
                        }
                    }
                },
                { "data": "ScoreExplanation" },
                { "data": "IsDefault" },
                { "data": "IsVerified" },
                { "data": "DMARCFullPolicy" },
                { "data": "SupportedServices" },
                { "data": "AuthenticationType" },
                { "data": "ExpectedMXRecord" },
                { "data": "ActualMXRecord" },
                { "data": "ExpectedSPFRecord" },
                { "data": "ActualSPFRecord" }
            ],
            'columnDefs': [
                {
                    "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], // your case first column
                    "className": "text-center align-middle"
                }
            ],
            "order": [[0, "asc"]],
        }
    );


    $('.dataTables_paginate').addClass("btn-group datatable-pagination");
    $('.dataTables_paginate > a').wrapInner('<span />');
});
