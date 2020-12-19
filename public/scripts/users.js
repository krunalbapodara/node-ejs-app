$(document).ready( function () {
    $('#userTable').addClass( 'nowrap' ).DataTable({
        responsive: true,
        columnDefs: [
            { targets: [-1], className: 'dt-body-right dt-head-right' }
        ]
    });

    $('#userModalButton').click(function() {
        $('#userModal').modal('show');
    });
});
