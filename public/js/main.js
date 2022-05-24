// handle picker date
$('input[name="daysLeave"]').daterangepicker();

//  handle submit form select month 'reference view'
if ($('.form-select-month')) {
    $('.select-month').on('change', function () {
        $('.form-select-month').submit();
    });
}